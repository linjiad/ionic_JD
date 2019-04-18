import { Component, ViewChild } from '@angular/core';
import { NavController, Platform} from '@ionic/angular';
import { CommonService } from '../services/common.service';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    @ViewChild('slide1') slide;
  public listSlides: any[] = []; // 轮播图数组
  public hostListWidth: any = '400rem'; // 横向滑动宽度
  public hotList: any[] = []; // 猜你喜欢
  public pList: any[] = []; // 商品列表数组
  public config: any = {}; // 获取全局配置
  public slideOpts = {
      effect: 'flip', // 轮播效果
      speed: 400,
      loop: true, // 循环轮播
      autoplay: { // 自动轮播
          delay: 2000 // 延迟2秒
      }
  };
  constructor(public navController: NavController,
              public common: CommonService,
            private appMinimize: AppMinimize,
            private platform: Platform,
             private barcodeScanner:BarcodeScanner) {
      this.config = common.config;
      // 点击按钮返回
      this.platform.backButton.subscribe(() => {
          this.appMinimize.minimize();
      });
  }
  // 初始化
  ngOnInit() {
  this.getFocusData();
  this.getHotData();
  this.getProductList();
  }
    ionSlideTouchEnd() {
      this.slide.startAutoplay(); // 解决手动轮播后不自动轮播
    }

    goSearch() {
      this.navController.navigateForward('search');
    }
    // 获取轮播图数据
    getFocusData() {
      const api = '/api/focus';
      this.common.ajaxget(api).then((response: any) => {
          this.listSlides = response.result;
      });
    }
    // 猜你喜欢
    getHotData() {
        const api = '/api/plist?is_hot=1';
        this.common.ajaxget(api).then((response: any) => {
            this.hotList = response.result;
            // 计算hostListWidth的宽度
            this.hostListWidth = this.hotList.length * 9 + 'rem';
        });
    }
    // 获取商品列表
    getProductList() {
        // 商品列表
        const api = '/api/plist?is_hot=1';
        this.common.ajaxget(api).then((response: any) => {
            this.pList = response.result;
        });
    }
    // 二维码扫描
    saomiao() {
        this.barcodeScanner.scan().then(barcodeData => {
            alert(barcodeData.text);
        }).catch(err => {
            console.log('Error', err);
        });
    }
}
