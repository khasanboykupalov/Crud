import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule} from '@angular/forms';
import { NgFor } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../serices/api.service'; // ishlashi uchun providers ga qoshishi kerak
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { PassThrough } from 'stream';


@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [ MatDialogModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule, NgFor,  FormsModule, MatButtonModule, ReactiveFormsModule,HttpClientModule,],
  providers:[MatNativeDateModule, ApiService], // there
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  conditionProduct:string[] = ["New", "Second Hand", "B/U" ]
  productForm!:FormGroup

  constructor(private formBuilder:FormBuilder, private api:ApiService, private dialogFef:MatDialogRef<DialogComponent> ) {}
  
  ngOnInit():void  {
    this.productForm = this.formBuilder.group({
      productName: ["", Validators.required],
      category:['', Validators.required],
      condition:['', Validators.required],
      price: ['', Validators.required],
      comment:['', Validators.required],
      date:['', Validators.required]
    })
    
  }

  addProduct() {
    if(this.productForm.valid) {
      this.api.postProduct(this.productForm.value).subscribe({
        next:() => {
          alert("Produc was added succesfully")
          this.productForm.reset
          this.dialogFef.close("save")
        },
        error:() => {
          alert("Something error")
        }
      })
    }
  }
}
