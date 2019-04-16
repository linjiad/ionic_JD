// 强制根据数据更新视图
import { Component, NgZone} from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from '../services/common.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
    public lCateList: any[] = []; // 左侧菜单
    public rCateList: any[] = []; // 右侧商品列表
    public selectedId: any = '';  /*选中的id*/
    public config: any = {}; // 获取全局配置
    constructor(public navController: NavController, public common: CommonService, private ngZone: NgZone) {
        this.config = common.config;
    }
    ngOnInit(): void {
        this.getLeftCateData();
    }
    goSearch() {
        this.navController.navigateForward('search');
    }
    // 左侧分类
    getLeftCateData() {
        const api = '/api/pcate';
        this.common.ajaxget(api).then((response: any) => {
            this.lCateList = response.result;
            // 第一次进来请求
            this.getRightCateData(this.lCateList[0]._id);
        });
    }
    // 右侧分类
    getRightCateData(pid) {
        // http://jd.itying.com/api/pcate?pid=59f1e1ada1da8b15d42234
        this.selectedId = pid;
        const api = '/api/pcate?pid=' + pid;
            this.common.ajaxget(api).then((response: any) => {
                this.ngZone.run(() => {
                    this.rCateList = response.result;
                });
            });
    }
}
