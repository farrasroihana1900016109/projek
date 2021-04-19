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
    books:any=[];
    constructor(
      public dialog:MatDialog,
      public api:ApiService
    ) {
  
     }
  
    ngOnInit(): void {
      this.title='Product';
      this.book={
        title:'angular pertama',
        author:'Farras',
        publisher:'ada aja',
        year:2020,
        isbn:'244242',
        price:3000000
      };
      this.getBooks();
    }
  
    loading:boolean | undefined;
    getBooks()
    {
      this.loading=true;
      this.api.get('bookswithauth').subscribe(result=>{
        this.books=result;
        this.loading=false;
      },error=>{
        this.loading=false;
      })
    }
  
  
      ProductDetail(data: any,idx: number)
      {
        let dialog= this.dialog.open(ProductDetailComponent, {
            width: '400px',
            data: data,
        });
          dialog.afterClosed().subscribe(result=> {
           if(result)
           {
            if(idx==-1)this.books.push(result);
            else this.books[idx]=data;
           }
          });
        }
  
  
        loadingDelete:any={};
        DeleteProduct(id: any,idx: any)
        {
          var conf=confirm('Delete item?');
          if(conf)
          this.loadingDelete[idx]=true;
          {
            this.api.delete('books/'+id).subscribe(result=>{
              this.books.splice(idx,1);
              this.loadingDelete[idx]=false;
            },error=>{
              this.loadingDelete[idx]=false;
              alert('Tidak dapat menghapus data');
            });
          }
        }
      }