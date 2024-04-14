import { Injectable } from '@angular/core';
import {BehaviorSubject, from, merge, Observable, ReplaySubject, scan, startWith, Subject, tap} from "rxjs";

export interface IClient {
  id: string;
  name: string;
  rate: string;
  expirationDate: string;
  description?: string;
  hasTrialLesson: boolean;
  phone: string;
}

export interface IOperation {
  operationId: 'DELETE' | 'ADD'
  data: IClient
}

const STORAGE_ID = 'fit-clients';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private readonly _storageClients$: Observable<IClient>
  private readonly _operations$: Subject<IOperation>
  private readonly _clients$: Observable<IClient[]>

  constructor() {
    this._storageClients$ = from(JSON.parse(localStorage.getItem(STORAGE_ID) ?? "[]")) as Observable<IClient>
    this._operations$ = new ReplaySubject<IOperation>();

    this._storageClients$.subscribe(c => {
      this._operations$.next({operationId: 'ADD', data: c})
    })

    this._clients$ = this._operations$
      .pipe(
        scan((acc, value) => {
          if (value.operationId) {
            switch (value.operationId) {
              case "ADD":
                const beforeAdd = [...acc, value.data as IClient];
                this.saveClientsToStorage(beforeAdd)
                return beforeAdd
              case "DELETE":
                const beforeDelete = acc.filter(v => v.id !== value.data.id) ?? []
                this.saveClientsToStorage(beforeDelete)
                return beforeDelete
              default:
                return acc
            }
          }
          return acc
        }, [] as IClient[])
      )
  }

  private saveClientsToStorage(data: IClient[]) {
    localStorage.setItem(STORAGE_ID, JSON.stringify(data))
  }

  removeClient(id: string) {
    this._operations$.next(
      {operationId: 'DELETE', data: {id} as IClient}
    )
  }

  addClient(data: IClient) {
    this._operations$.next(
      {operationId: 'ADD', data}
    )
  }

  getClients(): Observable<IClient[]> {
    return this._clients$
  }
}
