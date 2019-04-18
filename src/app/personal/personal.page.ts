import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { EventService } from '../services/eventemitter.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.page.html',
  styleUrls: ['./personal.page.scss'],
})
export class PersonalPage implements OnInit {
  public userSettings: any = {
    sex: '男',
    day: '2014-03-23'

  };
  // 定义时间选择的按钮，定义得按钮带方法
  public customPickerOptions = {
    buttons: [{
      text: '取消', handler: () => {
         console.log('Clicked Save!');
      }
    }, {
      text: '保存', handler: (result) => {
          // console.log('Clicked Log. Do not Dismiss.');
          this.userSettings.day = result;
      }
    }]
  };
  constructor(
      public actionSheetController: ActionSheetController,
      public navController: NavController,
      public storage: StorageService,
      public eventService: EventService
  ) {
  }
  ngOnInit() {
  }
  // 销毁时获取用户信息
  ngOnDestroy(): void {
    console.log(this.userSettings);
  }
  // 选择性别
  async showSex() {
    const actionSheet = await this.actionSheetController.create({
      header: '选择性别',
      buttons: [{
        text: '男',
        handler: () => {
          this.userSettings.sex = '男';
        }
      },
      {
        text: '女',
        handler: () => {
          this.userSettings.sex = '女';
        }
      },
      {
        text: '取消',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  goBack() {
    this.navController.navigateBack('/tabs/tab4');
  }
  doLoginOut() {
    // 删除用户信息
    this.storage.remove('userinfo');
    // 通知tab4更新信息
    this.eventService.eventEmit.emit('useraction');
    this.navController.navigateBack('/tabs/tab4');

  }
}
