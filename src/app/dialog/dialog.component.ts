import { Component, Inject, Input } from '@angular/core';
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
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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

  actionBtn: string = "Save"

  @Input() title:string = ""


  constructor(
    private formBuilder:FormBuilder, 
    private api:ApiService, 
    private dialogRef:MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}
  
  ngOnInit():void  {
    this.productForm = this.formBuilder.group({
      productName: ["", Validators.required],
      category:['', Validators.required],
      condition:['', Validators.required],
      price: ['', Validators.required],
      comment:['', Validators.required],
      date:['', Validators.required]
    })

      console.log(this.productForm)

    if(this.editData) {
      this.actionBtn = "Update"
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['condition'].setValue(this.editData.condition);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
    }

  }

  addProduct() {
    if (!this.editData) {
      // Yangi mahsulot qo'shish
      if (this.productForm.valid) {
        this.api.putProduct(this.productForm.value, Number(this.editData.id)  ).subscribe({
          next: () => {
            alert("Product was added successfully");
            this.productForm.reset(); // Formani tozalash
            this.dialogRef.close("save"); // Dialogni yopish
          },
          error: () => {
            alert("Something went wrong while adding");
          }
        });
      }
    } else {
      // Mahsulotni yangilash
      this.updateProduct();
    }
  }
  
  updateProduct() {
    // Mahsulotni yangilash
    this.api.putProduct(this.productForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert("Product updated successfully");
        this.dialogRef.close("update"); // Yangilashdan keyin dialogni yopish
      },
      error: () => {
        alert("Something went wrong while updating");
      }
    });
  }

}
