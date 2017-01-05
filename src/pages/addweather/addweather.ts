import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/*
  Generated class for the Addweather page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-addweather',
  templateUrl: 'addweather.html'
})
export class Addweather {
  data: {city:string, country:string} = {city:'', country:''}

  constructor(public view: ViewController) {}

  ionViewDidLoad() {
    console.log('Hello Addweather Page');
  }

  dismiss() {
    this.view.dismiss();
  }

  select() {
    this.view.dismiss(this.data);
  }

}
