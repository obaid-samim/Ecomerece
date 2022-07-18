import { Component, OnInit } from '@angular/core';
import { CartapiService } from 'src/app/services/cartapi.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products:any =[];
  allProducts:any =0;

  constructor(private cartApi:CartapiService) { }
//Any you are providing no information about what is stored in a - it can be anything! And therefore the transpiler will allow you to do whatever you want with something defined as any .
  ngOnInit(): void {
    this.cartApi.getProductData().subscribe(res=>{
      this.products = res;
      this.allProducts = this.cartApi.getTotalAmount();
    })
  }
removeProduct(item:any){
  this.cartApi.removeCardData(item);
}
removeAllProduct(){
  this.cartApi.removeAllCart();
}

}
