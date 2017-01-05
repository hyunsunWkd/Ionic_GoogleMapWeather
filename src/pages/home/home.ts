import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Map } from '../../components/map/map';
import { Addweather } from '../addweather/addweather';
import { Openweather } from '../../providers/openweather';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('mymap') map;
  weatherList = [];
  city: string;
  seoul = {"coord":{"lon":126.98,"lat":37.57},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"base":"stations","main":{"temp":277.296,"pressure":1010.9,"humidity":88,"temp_min":277.296,"temp_max":277.296,"sea_level":1034.66,"grnd_level":1010.9},"wind":{"speed":1.22,"deg":57.5031},"clouds":{"all":0},"dt":1477249121,"sys":{"message":0.0127,"country":"KR","sunrise":1477172920,"sunset":1477212199},"id":1835848,"name":"Seoul","cod":200};
  chicago= {"coord":{"lon":-87.65,"lat":41.85},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"base":"stations","main":{"temp":289.821,"pressure":1003.04,"humidity":86,"temp_min":289.821,"temp_max":289.821,"sea_level":1025.22,"grnd_level":1003.04},"wind":{"speed":4.77,"deg":231.003},"clouds":{"all":0},"dt":1477249207,"sys":{"message":0.0094,"country":"US","sunrise":1477224823,"sunset":1477263306},"id":4887398,"name":"Chicago","cod":200};
  constructor(public navCtrl: NavController, public modalCtrl : ModalController,
    public openweather : Openweather) {

  }

  addWeather() {
    let m = this.modalCtrl.create(Addweather);
    m.onDidDismiss( (data) => {
      this.getWeather(data.city, data.country);
    })
    m.present();
  }

  cityChanged(weather) {
    if(this.map) this.map.showWeatherMap(weather);
    // switch(this.city) {
    //   case 'seoul':
    //     if(this.map) this.map.showWeatherMap(this.seoul);
    //     break;
    //   case 'chicago':
    //     if(this.map) this.map.showWeatherMap(this.chicago);
    //     break;
    // }
  }

  getWeather(city: string, country: string) {
    if(city && country && this.weatherList.length < 5) {
      this.openweather.getWeatherByCity(city, country)
      .map( data => data.json() )
      .subscribe(
        data => {
          this.weatherList.push(data);
        }
      );
    }
  }

}
