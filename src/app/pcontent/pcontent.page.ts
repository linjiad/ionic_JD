import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
// 获取get传值
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-pcontent',
  templateUrl: './pcontent.page.html',
  styleUrls: ['./pcontent.page.scss'],
})
export class PcontentPage implements OnInit {
  public tab: any = 'list'; // 选择哪个tab
  public list: any = {}; // 商品信息
  public config: any = {}; // 全局配置
  constructor(public common: CommonService, public activatedRoute: ActivatedRoute) { }

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
            console.log(response);
            this.list = response.result;
        });
    }

}
