import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';

// 监听服务
import { EventService } from '../services/eventemitter.service';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
    public userinfo: any = {}; // 用户信息

  constructor(public storage: StorageService, public eventService: EventService) {
      // 初始化用户信息
      const userinfo = this.storage.get('userinfo');
      if (userinfo && userinfo.username) {
          this.userinfo = userinfo;
      } else {
          this.userinfo = '';
      }
  }

  ngOnInit() {
      // 监听注册 登录成功的事件
      // 监听useraction这个
      this.eventService.eventEmit.on('useraction', () => {
          const userinfo = this.storage.get('userinfo');
          if (userinfo && userinfo.username) {
              this.userinfo = userinfo;
          } else {
              this.userinfo = '';
          }
      });
  }
    ionViewWillEnter() {
        console.log('进入一个页面时触发');
    }
    ionViewDidEnter() {
        console.log('进入后触发');
    }
}
