import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ODataServiceFactory, ODataService } from 'angular2-odata';
import { HttpModule } from '@angular/http';
import { Category } from '../model/NorthwindModel/Category';
import { Product } from '../model/NorthwindModel/Product';
import { ODataDatabaseService } from '../odata-database-service/odata-database.service';
import { OdataFilterableDataSource } from '../odata-filterable-data-source/odata-filterable-data-source';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ODataDatabaseService]
})
export class ProductsComponent implements OnInit {
  private odata: ODataService<Product>;
  private showSpinner = true;
  private dataSource: OdataFilterableDataSource<Product> | null;
  private displayedColumns = ['id', 'name', 'price'];
  @ViewChild('filter') filter: ElementRef;
  constructor(private databaseService: ODataDatabaseService<Product>) {
  }

  ngOnInit() {
    this.dataSource = new OdataFilterableDataSource(this.databaseService, (product) => product.ProductName + product.UnitPrice);
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

    this.databaseService.loadEntity('Products');

  }
}