import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class FiltroService {
  public seekFilter: BehaviorSubject<any> = new BehaviorSubject({});

  public readonly data = this.seekFilter.asObservable();

  constructor() {}

  public filtrar(data: any) {
    this.seekFilter.next(data);
  }
}
