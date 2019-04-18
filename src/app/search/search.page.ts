import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { NavController, AlertController, IonContent} from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { CommonService } from '../services/common.service';
@Component({
    selector: 'app-search',
    templateUrl: './search.page.html',
    styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
    @ViewChild(IonContent) content: IonContent;
    public flag = true;
    public productList = [];  // 商品列表
    public historyList: any[] = [];  // 历史记录
    public keywords: any = '';  // 输入的关键字
    public page: any = '';   // 重置 page：  换关键词要从第一页开始请求
    public hasInfiniteData: any = '';    // 开启上拉分页
    public subHeaderSelected: any = '';  // 重置选择的属性
    public config: any = {};  // 配置
    public sort: any = '';

    constructor(public navController: NavController,
                public storage: StorageService,
                public alertController: AlertController,
                public common: CommonService,
                private ngZone: NgZone) {
        this.config = this.common.config; // 初始化配置
        /*for (let i = 1; i <= 10; i++) {
            this.productList.push({
                pic: 'assets/img/0' + i + '.jpg',
                title: '运动套装女春秋韩版2019新款时尚连帽休闲套装女卫衣女开衫长' + i,
                price: i * 22
            });
        }*/
    }
    ngOnInit() {
        this.getHistory();
    }
    goBack() {
        this.navController.back();
    }
    doSearch() {
        this.saveHistory(); // 保存历史记录
        this.flag = false; // 切换页面

        this.page = 1;   // 重置 page：  换关键词要从第一页开始请求
        this.hasInfiniteData = true;    // 开启上拉分页
        this.subHeaderSelected = 1;  // 重置选择的属性
        this.content.scrollToTop(0);   // 回到顶部

        const api = '/api/plist?search=' + this.keywords + '&page=' + this.page;
        this.common.ajaxget(api).then((response: any) => {
            this.ngZone.run(() => {
                this.productList = response.result;
                this.page++;
            });
        });
    }
    // 保存历史记录
    saveHistory() {
        /*
        1、获取本地存储里面的历史记录数据
        2、判断本地存储的历史记录是否存在
        3、存在：把新的历史记录和以前的历史记录拼接  然后重新保存     （去重）
        4、不存在：直接把新的历史记录保存到本地
        */
        let historyList = this.storage.get('historylist');
        if (historyList) { // 存在
            if (historyList.indexOf(this.keywords) === -1) { // 判断关键字存不存在
                historyList.push(this.keywords); // 关键字不存在就添加
            }
            this.storage.set('historylist', historyList); // 关键字存在就不用添加
        } else {  // 不存在
            historyList = [];
            historyList.push(this.keywords);
            this.storage.set('historylist', historyList);
        }
    }

    // 获取历史记录
    getHistory() {
        const historyList = this.storage.get('historylist');
        if (historyList) {
            this.historyList = historyList;
        }


    }
    // 长按删除历史记录
    async removeHistory(key) {
        const alert = await this.alertController.create({
            backdropDismiss: false,
            header: '提示！',
            message: '确定要删除吗?',
            buttons: [
                {
                    text: '取消',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: '删除',
                    handler: () => {
                        this.historyList.splice(key, 1);
                        this.storage.set('historylist', this.historyList);
                    }
                }
            ]
        });
        await alert.present();
    }
    // 点击历史记录 进行搜索
    goSearch(keywords) {
        this.keywords = keywords;
        this.doSearch();
    }
    // 上拉分页加载更多
    getProductList(event) {
        let api = '/api/plist?search=' + this.keywords + '&page=' + this.page;
        if (this.sort) {
            api = '/api/plist?search=' + this.keywords + '&page=' + this.page + '&sort=' + this.sort;
        }
        this.common.ajaxget(api).then((response: any) => {
            this.ngZone.run(() => {
                this.productList = this.productList.concat(response.result);
                this.page++;
                event ? event.target.complete() : '';
                // 判断是否有数据
                if (response.result.length < 10) {
                    this.hasInfiniteData = false;   // 把上拉分页禁用掉
                }
            });
        });
    }
}
