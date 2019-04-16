import { Component, OnInit, NgZone} from '@angular/core';

import { NavController} from '@ionic/angular';
import { CommonService } from '../services/common.service';

// 获取get传值
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.page.html',
  styleUrls: ['./productlist.page.scss'],
})
export class ProductlistPage implements OnInit {


  public productList: any[] = [];  // 商品列表数据
  public cid: Number;   // 分类id
  public config: any = {};  // 配置
  public page: any = 1;  // 分页

  constructor(public navController: NavController,
              public common: CommonService,
              public activatedRoute: ActivatedRoute,
              private ngZone: NgZone) {
      this.config = this.common.config;

   }
  ngOnInit() {
      // 获取get传值
      this.activatedRoute.queryParams.subscribe((data: any) => {
        this.cid = data.cid;
        this.getProductList(null);
    });
  }
  getProductList(event) {
    const api = '/api/plist?cid=' + this.cid + '&page=' + this.page;
    this.common.ajaxget(api).then((response: any) => {
        this.ngZone.run(() => {
            this.productList = this.productList.concat(response.result);
            this.page++;
            event ? event.target.complete() : '';

            // 判断是否有数据
            if (response.result.length < 10) {
                event ? event.target.disabled = true : '';
            }
        });
    });
  }
  goBack() {
    this.navController.back();
  }

}
