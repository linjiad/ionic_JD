import { Injectable} from '@angular/core';
import { EventEmitter } from 'eventemitter3';
@Injectable({
    providedIn: 'root' })
export class EventService {
    public eventEmit: any;
    constructor() {
// 定义发射事件
        this.eventEmit = new EventEmitter(); // 这个实例就会被多个组件共享来实现不同组件之间通讯
    }
}
