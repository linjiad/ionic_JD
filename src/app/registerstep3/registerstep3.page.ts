import { Component, OnInit } from '@angular/core';
import { NavController, ToastController} from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { CommonService } from '../services/common.service';
import {EventService} from '../services/eventemitter.service';
@Component({
    selector: 'app-registerstep3',
    templateUrl: './registerstep3.page.html',
    styleUrls: ['./registerstep3.page.scss'],
})
export class Registerstep3Page implements OnInit {
    public tel: any = ''; // 电话号码
    public code: any = ''; // 验证码
    public password: any = ''; // 密码
    public rpassword: any = ''; // 确认密码
    constructor(
        public storage: StorageService,
        public common: CommonService,
        public navController: NavController,
        public toastController: ToastController,
        public eventService: EventService) {
        // 获取tel  code
        this.tel = this.storage.get('tel');
        this.code = this.storage.get('code');
    }
    ngOnInit() {}
    // 验证两次密码是否相同
    doRegister() {
        // 简单验证    、 服务器也需要验证
        if (this.password !== this.rpassword) {
            this.presentToast('密码确认密码输入错误');
        } else if (this.password.length < 6) {
            this.presentToast('密码长度不能小于6位');
        } else {
            const api = '/api/register';
            const postJson = {
                tel: this.tel,
                code: this.code,
                password: this.password
            };
            this.common.ajaxPost(api, postJson).then((response: any) => {
                console.log(response);
                if (response.success) {
                    // 1、保存用户信息         2、跳转到首页
                    this.storage.set('userinfo', response.userinfo[0]);
                    // 回到根
                    this.navController.navigateRoot('/tabs/tab4');
                    // 通知用户中心更新用户信息
                    this.eventService.eventEmit.emit('useraction');
                } else {
                    this.presentToast('注册失败');
                }
            });
        }
    }
    // 弹出框
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
