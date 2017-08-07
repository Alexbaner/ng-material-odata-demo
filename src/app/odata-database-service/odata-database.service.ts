import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

import { ODataServiceFactory, ODataService } from 'angular2-odata';

@Injectable()
export class ODataDatabaseService<T> {
  dataChange: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  get data(): T[] { return this.dataChange.value; }

  constructor(private odataFactory: ODataServiceFactory) { }

  public load(entity: string) {
    this.odataFactory
      .CreateService<T>(entity)
      .Query()
      .Exec()
      .subscribe(data => {
        this.dataChange.next(data);
      });
  }

}