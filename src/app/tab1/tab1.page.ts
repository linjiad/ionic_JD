import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    @ViewChild('slide1') slide;
  public listSlides: any[] = []; // 轮播图数组
  public hostListWidth: any = '400rem'; // 横向滑动宽度
  public hotList: any[] = []; // 横向滑动数据数组
  public pList: any[] = []; // 商品列表数组
  public slideOpts = {
      effect: 'flip', // 轮播效果
      speed: 400,
      loop: true, // 循环轮播
      autoplay: { // 自动轮播
          delay: 2000 // 延迟2秒
      }
  };
  constructor() {
      // 初始化轮播图数据
    for (let i = 1; i <= 3 ; i++) {
        this.listSlides.push({
            pic: 'assets/img/slide0' + i + '.png',
            url: '',
        });
    }
      // 初始化横向滑动数据
      for (let i = 1; i <= 9 ; i++) {
          this.hotList.push({
              pic: 'assets/img/0' + i + '.jpg',
              title: '第' + i + '个',
          });
      }
      // 右侧数据
      for (let i = 1; i <= 12 ; i++) {
          this.pList.push({
              pic: 'assets/img/list' + i + '.jpg',
              title: '第' + i + '个',
          });
      }
      // 计算hostListWidth的宽度
      this.hostListWidth = this.hotList.length * 9 + 'rem';
  }

    ionSlideTouchEnd() {
      this.slide.startAutoplay(); // 解决手动轮播后不自动轮播
    }
}
