import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
    public cateList: any[] = []; // 左侧菜单
    public pList: any[] = []; // 右侧商品列表
    constructor(public navController: NavController) {
        // 初始化左侧菜单
        for (let i = 0; i < 16; i++) {
            this.cateList.push('分类' + i);
        }
        // 初始化商品列表
        for (let i = 1; i <= 12 ; i++) {
            this.pList.push({
                pic: 'assets/img/list' + i + '.jpg',
                title: '第' + i + '个',
            });
        }
    }
    goSearch() {
        this.navController.navigateForward('search');
    }
}
