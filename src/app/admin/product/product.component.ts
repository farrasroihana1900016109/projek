import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  title:any;
  book:any={};
  //1. membuat koleksi books
  books:any=[];
  constructor(   
    public dialog: MatDialog,
    public api:ApiService
  ) 
  {
    this.title='Produk';
    //3. Memanggil fungsi getBooks()
    this.getBooks();
  }
  ngOnInit(): void {
    
  }
  //2. Membuat fungsi
  getBooks()
  {
    //4. memperbarui koleksi books
    this.books=[
      {
        title:'Angular untuk Pemula',
        author:'Farid Suryanto',
        publisher:'Sunhouse Digital',
        year:2020,
        isbn:'8298377474',
        price:70000
      },
      {
        title:'Membuat Aplikasi Maps menggunakan Angular',
        author:'Farid Suryanto',
        publisher:'Sunhouse Digital',
        year:2020,
        isbn:'82983323455',
        price:75000
      }
    ];
  } 
  productDetail(data: any,idx: number)
 {
   let dialog=this.dialog.open(ProductDetailComponent, {
     width:'400px',
     data:data
   });
   dialog.afterClosed().subscribe(res=>{
     if(res)
     {
        //jika idx=-1 (penambahan data baru) maka tambahkan data
       if(idx==-1)this.books.push(res);      
        //jika tidak maka perbarui data  
       else this.books[idx]=res; 
     }
   })
 } 
 DeleteProduct(idx: any)
 {
   var conf=confirm('Delete item?');
   if(conf)
   this.books.splice(idx,1);
 }
}
