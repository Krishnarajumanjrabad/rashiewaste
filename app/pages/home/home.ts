import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {NavigateToPage} from "../navigate-to/navigate-to";
import {TabsPage} from "../tabs/tabs";


@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  private user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = JSON.parse(window.localStorage.getItem("user"));
    console.log("printing the user name" + this.user.name);

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

  logout(email) {
    console.log("printing the current user" + email);
    if (email) {
      window.localStorage.removeItem("user");
      this.navCtrl.setRoot(TabsPage);
    }

  }
}
