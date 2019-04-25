import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { CommonService } from '../services/common.service';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage {

    public list: any = [];
    public config: any = {};
    public allPrice: any = 0;
    public isCheckedAll = true; // 全选按钮是否被选中
    constructor(public storage: StorageService, public common: CommonService, public cartService: CartService) {
        this.config = this.common.config;
    }
    // 监听checkbox
    checkboxChange() {
        // 每次点击列表的checkbox都会看是否全选
        this.isCheckAllFn();
        // 获取选中商品的总价
        this.allPrice = this.cartService.getAllPrice(this.list);
    }
    // 这个即使切换TAB页也会执行(OnInit只执行一次)
    ionViewDidEnter(): void {
        // 每次切换页面都会判断是否全选
        this.isCheckAllFn();
        // 在构造函数之后调用，初始化输入属性，以及对ngonchanges的第一个调用。
        this.getCartsData();
    }
    // 获取本地存储的数据
    // 给cartList添加属性checkde
    getCartsData() {
        const cartList = this.storage.get('cartList');
        if (cartList) {
            this.list = cartList;
        } else {
            this.list = [];
        }
        // 获取选中商品的总价
        this.allPrice = this.cartService.getAllPrice(this.list);
    }
    // 减少数量
    decCount(item: any) {
        if (item.product_count > 1) {
            item.product_count--;
        }
        // 获取选中商品的总价
        this.allPrice = this.cartService.getAllPrice(this.list);
    }
    // 增加数量
    incCount(item: any) {
        item.product_count++;
        // 获取选中商品的总价
        this.allPrice = this.cartService.getAllPrice(this.list);
    }
    // 判断是否全选
    isCheckAllFn() {
        // 判断选中商品数量和列表数量是否相同
        if (this.cartService.getCheckedNum(this.list) === this.list.length) {
            this.isCheckedAll = true;
        } else {
            this.isCheckedAll = false;
        }
    }
    // 全选反选
    checkAll() {
        // 如果全选时，不让全选
        if (this.isCheckedAll) {
            for (let i = 0; i < this.list.length; i++) {
                this.list[i].checked = false;
            }
            this.isCheckedAll = false;
        } else {
            // 如果全部选让全选
            for (let i = 0; i < this.list.length; i++) {

                this.list[i].checked = true;
            }
            this.isCheckedAll = true;
        }
    }
    // 页面将要离开的时候保存购物车数据
    ionViewWillLeave() {
        this.storage.set('cartList', this.list);
    }

}
