import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

//services in Angular let you define code or functionalities that are then accessible and reusable in many other components in your Angular project. 
  //Services help you with the abstraction of logic and data that is hosted independently but can be shared across other components.
  //Observables provide support for passing messages between parts of your application. 
//They are used frequently in Angular and are a technique for event handling, asynchronous programming, and handling multiple values.
//An observable data service is an Angular injectable service that can be used to provide data to multiple parts of the application. 

@Injectable({
  providedIn: 'root'
})


export class CartapiService {
  cartDataList:any =[];
  productList = new BehaviorSubject<any>([]);
  
  constructor(private http:HttpClient) { }
  getProductData(){
    return this.productList.asObservable();
  }

  setProduct(product:any){
    this.cartDataList.push(...product);
    this.productList.next(product)
  }
  //. The "this" keyword always points to the object that is calling a particular method.
  //It refers to the function that it's in.
  addToCart(product:any){
    this.cartDataList.push(product)
    this.productList.next(this.cartDataList)
    this.getTotalAmount();
    console.log(this.cartDataList);
  }
  getTotalAmount(){
    let  grandTotal = 0;
    this.cartDataList.map((a:any)=>{
      grandTotal += a.total;
    })
  }
  removeCardData(product:any){
    this.cartDataList.map((a:any, index:any)=>{
      if(product.id === a.id){
        this.cartDataList.splice(index,1)
      }
    })
    this.productList.next(this.cartDataList)
  }
  removeAllCart(){
    this.cartDataList =[]
    this.productList.next(this.cartDataList)
  }
}
