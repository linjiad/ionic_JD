import { Component, OnInit } from '@angular/core';

import { NavController, ToastController} from '@ionic/angular';
import { CommonService } from '../services/common.service';
import { StorageService } from '../services/storage.service';

@Component({
    selector: 'app-registerstep1',
    templateUrl: './registerstep1.page.html',
    styleUrls: ['./registerstep1.page.scss'],
})
export class Registerstep1Page implements OnInit {
    public tel: any = '';
    constructor(
        public navController: NavController,
        public common: CommonService,
        public storage: StorageService,
        public toastController: ToastController
    ) { }

    ngOnInit() {
    }

    goRegisterSetp2() {
        // 验证电话号码是否合法
        if (/^\d{11}$/.test(this.tel)) {
            const api = '/api/sendCode';
            this.common.ajaxPost(api, {'tel': this.tel}).then((response: any) => {
                if (response.success) {
                  console.log(response);
                    this.presentToast('发送验证码成功');
                    // 保存手机号
                    this.storage.set('tel', this.tel);
                    this.navController.navigateForward('/registerstep2');
                } else {
                    this.presentToast('发送验证码失败' + response.message);
                }
            });
        } else {
            this.presentToast('电话号码格式不正确');
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
