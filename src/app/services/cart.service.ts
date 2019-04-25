import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
    // 判断购物车是否有当前数据
    hasData(cartList, currentProduct) {
        if (cartList && cartList.length > 0) {
            for (let i = 0; i < cartList.length; i++) {
              // 判断id和所选的属性（红色，黄色）是否相同
                if (cartList[i].product_id === currentProduct.product_id && cartList[i].product_attrs === currentProduct.product_attrs) {
                    return true;
                }
            }
            return false;
        }
        return false;
    }
    // 获取购物车总数量
    getCartNum(cartList) {
        let sum = 0; // 积累每个商品的数量相加
        if (cartList && cartList.length > 0) {
            for (let i = 0; i < cartList.length; i++) {
                sum += cartList[i].product_count;
            }
            return sum;
        }
        return sum;
    }
    // 计算总价
    getAllPrice(cartList) {
        let allPrice = 0;
        if (cartList && cartList.length > 0) {
            for (let i = 0; i < cartList.length; i++) {
                // 被选中的才计算总价
                if (cartList[i].checked) {
                    allPrice += cartList[i].product_count * cartList[i].product_price;
                }
            }
        }
        return allPrice;
    }
    // 获取选中商品的数量
    getCheckedNum(cartList) {
        let num = 0;
        for (let i = 0; i < cartList.length; i++) {
            if (cartList[i].checked) {
                num++;
            }
        }
        return num;
    }
}
