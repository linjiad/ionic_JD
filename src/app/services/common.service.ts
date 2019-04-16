import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Promise, reject} from 'q';
@Injectable({
    providedIn: 'root'
})
export class CommonService {
  public config: any = {
    domain : 'http://jd.itying.com',
  }
    constructor(public http: HttpClient) { }
    ajaxget(url) {
      const api = this.config.domain + url;
        return Promise((resovel, err) => {
            this.http.get(api).subscribe((response) => {
                resovel(response);
            }, (error) => {
                err(error);
            });
        });
    }
}
