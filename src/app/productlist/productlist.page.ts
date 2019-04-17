import { Component, OnInit, NgZone, ViewChild} from '@angular/core';

import { NavController, IonContent, IonInfiniteScroll} from '@ionic/angular';
import { CommonService } from '../services/common.service';

// 获取get传值
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.page.html',
  styleUrls: ['./productlist.page.scss'],
})
export class ProductlistPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  @ViewChild('myInfiniteScroll') infiniteScroll: IonInfiniteScroll;
  public productList: any[] = [];  // 商品列表数据
  public cid: Number;   // 分类id
  public config: any = {};  // 配置
  public page: any = 1;  // 分页
  public subHeaderList: any[] = [];  // 二级导航列表
  public subHeaderSelected: any = 1;   // 选中的id
  public sort: any = '';     // 排序的参数
  public hasmore: any = false; // 显示底线

  constructor(public navController: NavController,
              public common: CommonService,
              public activatedRoute: ActivatedRoute,
              private ngZone: NgZone) {
      this.config = this.common.config;
      this.subHeaderList = [
          {
              id: 1,
              title: '综合',
              fileds: 'all',
              sort: -1       // 排序     升序：price_1后台会拆分成{price:1}        降序：price_-1   {price:-1}
          },
          {
              id: 2,
              title: '销量',
              fileds: 'salecount',
              sort: -1
          },
          {
              id: 3,
              title: '价格',
              fileds: 'price',
              sort: -1
          }

      ];
   }
  ngOnInit() {
      // 获取get传值
      this.activatedRoute.queryParams.subscribe((data: any) => {
        this.cid = data.cid;
        this.getProductList(null);
    });
  }
  getProductList(event: any) {
    const api = '/api/plist?cid=' + this.cid + '&page=' + this.page;
    if (this.sort) {
      api = '/api/plist?cid=' + this.cid + '&page=' + this.page + '&sort=' + this.sort;
    }
    this.common.ajaxget(api).then((response: any) => {
        this.ngZone.run(() => {
            this.productList = this.productList.concat(response.result);
            this.page++;
            event ? event.target.complete() : '';

            // 判断是否有数据
            if (response.result.length < 10) {
                event ? event.target.disabled = true : '';
                this.hasmore = true; // 让底部的提示显示
            }
        });
    });
  }
  goBack() {
    this.navController.back();
  }
// 属性筛选

    subHeaderChange(id) {
        this.infiniteScroll.disabled = false; // 开启允许下拉
        this.hasmore = false; // 隐藏底线
        this.subHeaderSelected = id;   // 颜色选中
        this.sort = this.subHeaderList[id - 1].fileds + '_' + this.subHeaderList[id - 1].sort;  // 拼接全局的排序字段
        this.page = 1;   // 重置分页数据
        this.productList = [];   // 重置商品数据
        this.subHeaderList[id - 1].sort = this.subHeaderList[id - 1].sort * -1; // 改变排序状态 (1就变成-1，-1就变成1)
        this.content.scrollToTop(0); // 回到顶部
        this.getProductList(null); // 请求数据

    }
}
