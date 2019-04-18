import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// http相关模块
import { HttpClientModule } from '@angular/common/http';
import { CommonService } from './services/common.service';
// 本地存储模块
import { StorageService } from './services/storage.service';

// 最小化模块
import { AppMinimize } from '@ionic-native/app-minimize/ngx';

// 监听广播事件
import { EventService } from './services/eventemitter.service';

// 操作手机，扫描二维码
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(
      {
          mode: 'ios', // 配置 android ios 都使用一个样式
          backButtonText: '返回' // 配置默认的返回按钮
      }
  ), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    CommonService,
    StorageService,
    AppMinimize,
    EventService,
    BarcodeScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
