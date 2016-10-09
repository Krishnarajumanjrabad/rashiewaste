import {Component} from "@angular/core";
import {Platform, ionicBootstrap} from "ionic-angular";
import {StatusBar} from "ionic-native";
import {TabsPage} from "./pages/tabs/tabs";
import {LoginPage} from "./pages/login/login";
import {AuthicationService} from "./providers/authication-service/authication-service";
import {GallaryService} from "./providers/gallary-service/gallary-service";
import {EnquiryService} from "./providers/enquiry-service/enquiry-service";
import * as PouchDB from "pouchdb";
import {FeedbackService} from "./providers/feedback-service/feedback-service";

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [GallaryService, AuthicationService, EnquiryService, FeedbackService]
})
export class MyApp {

  public rootPage: any;
  databaseServerIp: string = "192.168.1.105:5984";
  DBServerName: string = "rashi_db";
  db: any;
  localdb: any;
  remoteServerURL: string = "admin:admin@http://192.168.1.105:5984/rashi_db";


  constructor( private platform: Platform ) {
    this.rootPage = TabsPage;
    this.loadDataFromDB();
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

  private loadDataFromDB() {

    console.log("iniating the process of db sync and replication from remoter db server to phone");
    this.localdb = new PouchDB(this.DBServerName);
    this.db = new PouchDB(this.remoteServerURL);
    //PouchDB.debug.enable('*');
    this.localdb.replicate.to(this.db).then(function ( result ) {
      // handle 'completed' result
      console.log(result);
    }).catch(function ( err ) {
      console.log(err);
    });
    this.db.replicate.to(this.localdb, {
      doc_ids: ['lru__', 'users']
    });
    this.localdb.sync(this.db, {live: true});
  }
}


ionicBootstrap(MyApp, [AuthicationService, GallaryService, EnquiryService, FeedbackService], {
  backButtonText: 'Go Back',
  iconMode: 'ios',
  modalEnter: 'modal-slide-in',
  modalLeave: 'modal-slide-out',
  tabsPlacement: 'bottom',
  pageTransition: 'ios',
  tabsHighlight: true
});
