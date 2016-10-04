import {Component} from "@angular/core";
import {Platform, ionicBootstrap} from "ionic-angular";
import {StatusBar} from "ionic-native";
import {TabsPage} from "./pages/tabs/tabs";
import {ConnectivityService} from "./providers/connectivity-service/connectivity-service";
import {Facebookservice} from "./providers/facebookservice/facebookservice";
import {LoginPage} from "./pages/login/login";
import {AuthicationService} from "./providers/authication-service/authication-service";


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [Facebookservice]
})
export class MyApp {

  public rootPage: any;
  db: any;

  constructor(private platform: Platform, public fbService: Facebookservice) {
    this.rootPage = TabsPage;
    this.checkPreviousAuthorization();
    console.log("printing the db connection" + this.db);
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  private checkPreviousAuthorization() {
    if ((window.localStorage.getItem('username') === "undefined" || window.localStorage.getItem('username') === null) &&
      (window.localStorage.getItem('password') === "undefined" || window.localStorage.getItem('password') === null)) {
      this.rootPage = LoginPage;
    } else {
      this.rootPage = TabsPage;
    }
  }
}

ionicBootstrap(MyApp, [ConnectivityService,AuthicationService], {
  backButtonText: 'Go Back',
  iconMode: 'ios',
  modalEnter: 'modal-slide-in',
  modalLeave: 'modal-slide-out',
  tabsPlacement: 'bottom',
  pageTransition: 'ios',
  tabsHighlight: true
});
