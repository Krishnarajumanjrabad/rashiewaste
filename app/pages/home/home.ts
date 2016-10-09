import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {NavigateToPage} from "../navigate-to/navigate-to";
import {LoginPage} from "../login/login";
import {GallaryPage} from "../gallary/gallary";
import {EnquiryFormPage} from "../enquiry-form/enquiry-form";
import {ContactPage} from "../contact/contact";
import {FeedbackPage} from "../feedback/feedback";


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


  loadMap() {

    this.navCtrl.push(NavigateToPage);

  }

  openEnquiryForm() {
    console.log("OPening the enquiry Form page");
    this.navCtrl.push(EnquiryFormPage);
  }

  openFaceBook() {
    window.open("https://www.facebook.com/krishnaraju.manjrabad", "_system", "location=yes");
    return false;
  }

  openTwitter() {
    window.open("https://twitter.com/krishna_mr", "_system", "location=yes");
    return false;
  }

  openGallery() {
    console.log("opening the Gallary Page");
    this.navCtrl.push(GallaryPage);
  }

  contactUs() {
    console.log("OPening the Contact Us page");
    this.navCtrl.push(ContactPage);
  }

  openFeedback() {
    console.log("OPening the Feed Back page");
    this.navCtrl.push(FeedbackPage);
  }

  logout() {
    console.log("inide the log out");

    window.localStorage.removeItem("user");
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("password");


    this.navCtrl.setRoot(LoginPage);
    // this.navCtrl.popToRoot();


  }
}
