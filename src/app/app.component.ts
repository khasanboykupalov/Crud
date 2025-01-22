import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTable, MatTableModule} from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import {DialogComponent } from './dialog/dialog.component';
import { ApiService } from './serices/api.service';
import { HttpClient } from '@angular/common/http';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
    HttpClientModule,
    MatTableModule, MatPaginator, MatPaginatorModule, MatSort, MatSortModule, MatInputModule, MatFormFieldModule, MatTable  ],
   providers:[ApiService,  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  constructor(private dialog: MatDialog, private api:ApiService) {}

  displayedColumns: string[] = ['productName', 'category', 'price', 'condition', 'date', 'comment', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getAllProduct()
  }

  title = 'CRUD';

  openDialog() {
   this.dialog.open(DialogComponent, {
    width:"40%"
   });
  
  }

  getAllProduct() {
    this.api.getProduct().subscribe({
      next:(res) => {
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      },
      error:() => {
        alert("Something went wrong")
      }
    })
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct () {
    this.dialog.open
  }
  
}
