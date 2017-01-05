import { Component } from '@angular/core';
import { Geolocation } from 'ionic-native';
import { Openweather } from '../../providers/openweather';
/*
  Generated class for the Map component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class Map {
  map
  marker
  infowin
  LocalWeather

  constructor(public weather : Openweather) {}
  ngOnInit() {
    Geolocation.getCurrentPosition().then (	(resp) => {
      this.map = new google.maps.Map(document.getElementById( 'map'),
                                    { zoom:15, center: {lat:resp.coords.latitude, lng: resp.coords.longitude},
                                      mapTypeId: google.maps.MapTypeId.ROADMAP } );
      this.weather.getWeatherByLocation(resp.coords.latitude, resp.coords.longitude)
      .map( data => data.json() )
      .subscribe((data) => {
        this.LocalWeather = data;
        this.infowin = new google.maps.InfoWindow( {
          content:
          "<ion-row>" +
          "<ion-thumbnail item-left>"
          + "<img src=" + "\"http://openweathermap.org/img/w/" + this.LocalWeather.weather[0].icon + ".png\"" + "height=50>"
          + "</ion-thumbnail>"
          + "<h3>" + this.LocalWeather.name + "</h3>"
          +"</ion-row>"
          + "<h4>Temp: " + Math.round(this.LocalWeather.main.temp) + "ºC</h4>"
          + "<h4>H: " + Math.round(this.LocalWeather.main.temp_max) + "ºC L: " + Math.round(this.LocalWeather.main.temp_min) + "ºC</h4>"
        });
      });
      this.marker= new google.maps.Marker( {
        map: this.map,
        position: this.map.getCenter(),
        animation: google.maps.Animation.DROP
      });
      google.maps.event.addListener(this.marker, 'click', () => {
        this.infowin.open(this.map, this.marker);
      });
    });
  }

  showWeatherMap(weather) {
    let loc = { lat: weather.coord.lat, lng: weather.coord.lon };
    this.map.setCenter(loc);
    this.marker.setPosition(loc);

    let content =
    "<ion-row>" +
    "<ion-thumbnail item-left>"
    + "<img src=" + "\"http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png\"" + "height=50>"
    + "</ion-thumbnail>"
    + "<h3>" + weather.name + "</h3>"
    +"</ion-row>"
    + "<h4>Temp: " + Math.round(weather.main.temp) + "ºC</h4>"
    + "<h4>H: " + Math.round(weather.main.temp_max) + "ºC L: " + Math.round(weather.main.temp_min) + "ºC</h4>";
    this.infowin.setContent(content);
    // google.maps.event.addListener(this.marker, 'click', () => {
    //   this.infowin.open(this.map, this.marker);
    // });
  }
}
