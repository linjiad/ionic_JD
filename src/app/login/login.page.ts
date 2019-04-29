import { Component, OnInit } from '@angular/core';
import { NavController, ToastController} from '@ionic/angular';
import { CommonService } from '../services/common.service';
import { StorageService } from '../services/storage.service';
// 监听事件
import { EventService } from '../services/eventemitter.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    public userinfo: any = {
        username: '',
        password: '',
    }; // 用户信息
    public returnUrl: any = ''; // 从哪来的页面

    constructor(
        public navController: NavController,
        public common: CommonService,
        public storage: StorageService,
        public toastController: ToastController,
        public eventService: EventService,
        public activatedRoute: ActivatedRoute // 路由跳转
    ) { }
  ngOnInit() {
      this.activatedRoute.queryParams.subscribe((data: any) => {
          data.returnUrl ? this.returnUrl = data.returnUrl : this.returnUrl = '/tabs/tab4';
      });
  }
    goBack() {
        // 登录页面还需要做其他判断   从哪里跳转到登录页面 我们让页面返回到哪里
        this.navController.navigateBack(this.returnUrl);
    }
    // 登录
    doLogin() {
        if (this.userinfo.username === '') {
            this.presentToast('用户名不能为空');
        } else if (this.userinfo.password.length < 6) {
            this.presentToast('密码错误');
        } else {
            const api = '/api/doLogin';
            this.common.ajaxPost(api, {
                username: this.userinfo.username,
                password: this.userinfo.password,
            }).then((response: any) => {
                console.log(response);
                if (response.success) {
                    // 1、保存用户信息
                    this.storage.set('userinfo', response.userinfo[0]);
                    // 2、跳转到用户中心 (根)
                    // this.navController.navigateRoot('/tabs/tab4');
                    this.navController.navigateRoot(this.returnUrl);
                    // 通知用户中心更新用户信息
                    this.eventService.eventEmit.emit('useraction');
                } else {
                    this.presentToast(response.message);
                }
            });
        }
    }
    async presentToast(s: string) {
        const toast = await this.toastController.create({
            message: s, // 弹出信息
            duration: 2000 , // 2秒后自动关闭
            color: 'dark', // 弹出颜色
            cssClass: 'mytoast', // 样式名称（必须写在全局globa.sass）
        });
        toast.present(); // 调用
    }
}
