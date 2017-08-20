import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ODataServiceFactory, ODataService } from 'angular2-odata';
import { HttpModule } from '@angular/http';
import { Category } from '../model/NorthwindModel/Category';
import { ODataDatabaseService } from '../odata-database-service/odata-database.service';
import { OdataFilterableDataSource } from '../odata-filterable-data-source/odata-filterable-data-source';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [ODataDatabaseService]
})
export class CategoriesComponent implements OnInit {
  private odata: ODataService<Category>;
  private showSpinner = true;
  private dataSource: OdataFilterableDataSource<Category> | null;
  private displayedColumns = ['CategoryID', 'CategoryName', 'Description'];
  @ViewChild('filter') filter: ElementRef;

  constructor(private databaseService: ODataDatabaseService<Category>) {
  }

  ngOnInit() {
    this.dataSource = new OdataFilterableDataSource(this.databaseService, (category) => category.CategoryName + category.Description);
    Observable
      .fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .subscribe(() => {
        console.log('filtered?');
        if (this.dataSource) {
          this.dataSource.filter = this.filter.nativeElement.value;
        }
      });

    this.databaseService
      .dataChange
      .debounceTime(1000)
      .subscribe(() => {
        this.showSpinner = false;
      });

    this.databaseService.loadEntity('Categories');
  }

}
