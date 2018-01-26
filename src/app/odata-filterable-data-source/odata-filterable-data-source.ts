import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { ODataDatabaseService } from '../odata-database-service/odata-database.service';
import { DataSource } from '@angular/cdk/collections';

export class OdataFilterableDataSource<T> extends DataSource<T> {
    _filterChange = new BehaviorSubject('');
    get filter(): string { return this._filterChange.value; }
    set filter(filter: string) { this._filterChange.next(filter); }

    constructor(private database: ODataDatabaseService<T>, private mapElement: (item: T) => string) {
        super();
    }

    connect(): Observable<T[]> {
        const displayDataChanges = [
            this.database.dataChange,
            this._filterChange,
        ];

        return Observable.merge(...displayDataChanges).map(() => {
            return this.database.data.slice().filter((item: T) => {
                let searchStr = this.mapElement(item).toLowerCase();
                return searchStr.indexOf(this.filter.toLowerCase()) != -1;
            });
        });
    }

    disconnect() { }
}
