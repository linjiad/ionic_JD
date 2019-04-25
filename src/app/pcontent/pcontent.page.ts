import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
// 获取get传值
import { ActivatedRoute } from '@angular/router';
import {StorageService} from '../services/storage.service';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-pcontent',
  templateUrl: './pcontent.page.html',
  styleUrls: ['./pcontent.page.scss'],
})
export class PcontentPage implements OnInit {
  public tab: any = 'list'; // 选择哪个tab
  public list: any = {}; // 商品信息
  public config: any = {}; // 全局配置
  public num: any = 1; // 选择商品数量
  public cartNum: any = 0; // 购物车上的数量
  constructor(public common: CommonService,
              public activatedRoute: ActivatedRoute,
              public storage: StorageService,
              public cartService: CartService) { }

  ngOnInit() {
    // 获取common
      this.config = this.common.config;
    // 获取传过来的商品id
      this.activatedRoute.queryParams.subscribe((data: any) => {
          this.getProductData(data.id);
      });
  }
  segmentChanged(ev: any) {
    console.log('Segment changed', ev.detail.value);
  }
  // 通过商品id获取商品信息
    getProductData(id) {
        const api = '/api/pcontent?id=' + id;
        this.common.ajaxget(api).then((response: any) => {
            this.list = response.result;
        });
    }
    // 选择样式
    changeAttr(e) {
        if (e.srcElement.nodeName === 'SPAN') { // 判断如果点击的是span标签
            const el = e.srcElement;   // 获取当前点击的span DOM节点
            const parent = el.parentNode; // 获取当前节点的父亲节点
            const attrChildren = parent.children; // 通父亲节点找到孩子节点
            for (let i = 0; i < attrChildren.length; i++) {// 让所有的子节点去掉 active  class
                attrChildren[i].className = '';
            }
            el.className = 'active';    // 给当前dom节点加一个active的 class
        }
    }
    // 增加数量
    incNum() {
        this.num += 1;
    }
    // 减少数量
    decNum() {
        if (this.num > 1) { // 如果小于1就不让减了
            this.num -= 1;
        }
    }
    // 加入购物车
    addCart() {
        const product_title = this.list['title']; // 商品的标题
        const product_id = this.list['_id']; // 商品的id
        const product_pic = this.list['pic']; // 商品的图片
        const product_price = this.list['price']; // 商品的价格
        const product_count = this.num;  /*商品数量*/
        let product_attrs: any = ''; // 选中商品的属性
        const spanActive = document.querySelectorAll('#myAttr .active'); // 获取class为active的span，这个就是被选中的商品属性
        // 因为可能两排属性需要选择，所以用循环
        for (let i = 0; i < spanActive.length; i++) {
            if (i === 0) {
                product_attrs += spanActive[i].innerHTML;

            } else {
                product_attrs += '　' + spanActive[i].innerHTML;

            }
        }
        const productJson = { // 选择的商品（把选择了什么属性和名称id等属性放进去）
            product_title,
            product_id,
            product_pic,
            product_price,
            product_count,
            product_attrs,
            // 购物车页面用，默认为true，即选中
            checked: true
        };
        console.log(productJson);
        /*
         购物车数据格式：
        [
            {
              id:1,
              title:'xxx',
              price:'xxx',
              ...
              num:4
            },
             {
              id:2,
              title:'xxx',
              price:'xxx',
              ...
              num:3
            }
        ]
        1、获取localStorage的cartList数据
        2、判断cartList是否有数据
            有数据：
                1、判断购物车有没有当前数据：
                        有当前数据：
                            1、让购物车中的当前数据数量 等于以前的数量+现在的数量
                            2、重新写入
                        没有当前数据：
                            1、把购物车cartList的数据和当前数据拼接，拼接后重新写入。
            没有数据：
                1、把当前商品数据以及属性数据放在数组中然后写入localStorage
        */
        const cartList = this.storage.get('cartList');
        if (cartList && cartList.length > 0) {
            // 判断购物车有没有当前数据
            if (this.cartService.hasData(cartList, productJson)) {
                for (let i = 0; i < cartList.length; i++) {
                    if (cartList[i].product_id === productJson.product_id) {
                        cartList[i].product_count += productJson.product_count;
                    }
                }
            } else {
                cartList.push(productJson);
            }
            this.storage.set('cartList', cartList);
        } else {
            const tempArr: any[] = [];
            tempArr.push(productJson);
            this.storage.set('cartList', tempArr);
        }
        // 修改底部购物车数量（原有购物车数量加上当前商品的数量）
        this.cartNum += productJson.product_count;
    }

}
