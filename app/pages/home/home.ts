import { Component,ViewChild, ElementRef } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import {NavigateToPage} from "../navigate-to/navigate-to";


@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {


  constructor(public navCtrl: NavController) {

  }

  mySlideOptions = {
		    initialSlide: 1,
		    loop: true,
		    autoplay: 200,
		    speed: 6000,
		    pager: true,
		    direction: 'horizontal'
		  };




  loadMap(){

    this.navCtrl.push(NavigateToPage);

  }

  openFaceBook(){
    window.open("https://www.facebook.com/krishnaraju.manjrabad", "_system", "location=yes");
    return false;
  }

  openTwitter(){
    window.open("https://twitter.com/krishna_mr", "_system", "location=yes");
    return false;
  }
}
