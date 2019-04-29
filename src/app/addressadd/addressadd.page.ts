import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addressadd',
  templateUrl: './addressadd.page.html',
  styleUrls: ['./addressadd.page.scss'],
})
export class AddressaddPage implements OnInit {

  public addressList: any = {
    name: '',
    phone: '',
    address: ''
  };

  constructor() { }

  ngOnInit() {
  }

}
