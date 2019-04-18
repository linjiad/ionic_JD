import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { CommonService } from '../services/common.service';
import { StorageService } from '../services/storage.service';
@Component({
    selector: 'app-registerstep2',
    templateUrl: './registerstep2.page.html',
    styleUrls: ['./registerstep2.page.scss'],
})
export class Registerstep2Page implements OnInit {
    public num: any = 10; // 倒计时秒数
    public sendCodeBtn = false; // 显示重新发送
    public tel: any = '';
    public code: any = '';
    constructor(public navController: NavController,
                public common: CommonService,
                public storage: StorageService,
                public toastController: ToastController) {
        this.tel = this.storage.get('tel');
    }
    ngOnInit() {
        this.doTimer();
    }
    goRegisterSetp3() {
        // 验证验证码
        const api = '/api/validateCode';
        this.common.ajaxPost(api, {'tel': this.tel, 'code': this.code}).then((response: any) => {
            if (response.success) {
                // 保存验证码
                this.storage.set('code', this.code);
                this.navController.navigateForward('/registerstep3');
            } else {
                this.presentToast('验证码输入错误');
            }
        });
    }
    // 倒计时
    doTimer() {
        const timer = setInterval(() => {
            this.num--;
            if (this.num === 0) {
                this.sendCodeBtn = true;
                clearInterval(timer);
            }
        }, 1000);
    }
    // 重新发送验证码
    sendCode() {
        const api = '/api/sendCode';
        this.common.ajaxPost(api, {'tel': this.tel}).then((response: any) => {
            if (response.success) {
                this.presentToast('发送验证码成功');
                this.num = 10;
                this.sendCodeBtn = false; // 显示倒计时
                this.doTimer(); // 开始倒计时
            } else {
                this.presentToast('发送验证码失败' + response.message);
            }
        });
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
