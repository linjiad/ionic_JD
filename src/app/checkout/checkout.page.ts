import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController} from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { CommonService } from '../services/common.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  public returnUrl = ''; // 上一个页面的路径
  public userinfo: any = {}; // 用户信息，如果存在就显示让他登录，如果有就不显示

  public list: any[] = []; // 刚才选中的商品列表

  public config: any = {}; // 请求服务的配置

  constructor(public activatedRoute: ActivatedRoute,
              public navController: NavController,
              public storage: StorageService,
              public common: CommonService) {

    this.config = this.common.config;
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data: any) => {
      console.log(data);
      data.returnUrl ? this.returnUrl = data.returnUrl : this.returnUrl = '/tabs/tab3';
    });
  }
  // 每次切换到这个页面都会加载
  ionViewDidEnter() {
    // 获取用户信息
    const userinfo = this.storage.get('userinfo');
    if (userinfo && userinfo.username) {
      this.userinfo = userinfo;
    } else {
      this.userinfo = '';
    }
    // 获取去结算的商品
    this.list = this.storage.get('checkoutData');
    console.log(this.list);
  }

  goBack() {
    this.navController.navigateBack(this.returnUrl);
  }

}
