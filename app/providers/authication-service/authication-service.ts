import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";

declare var require:Require;
import * as PouchDB from 'pouchdb';

PouchDB.plugin(require('pouchdb-authentication'));

/*
 Generated class for the AuthicationService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class AuthicationService {
  /* connecting to pouch db for user authication */
  db: any;
  localdb: any;
  firstTime: boolean = false;
  users = [];


  constructor(public http: Http) {
    console.log('Hello AuthicationService Provider');

    this.db = new PouchDB('http://admin:admin@localhost:5984/rashi_db');
    this.localdb = new PouchDB('rashi_db');
    this.localdb.sync(this.db, {live: true, retry: true}).on('error', console.log.bind(console));
  }

  login(username, password){
    this.db.login(username,password).then( (res) =>{
      console.log(res);
      return res;
    },(error) => {
      console.log("username and password were invalid");
      return error;
    });
  }

  logout(username){
    this.db.logout(username).then( (res) => {
      console.log('user was logged out successfully');
      return this.db.allDocs();
    },(error) => {
      console.log('something else has happened');
      return error;
    });
  }

  signIn(userForm){
   return new Promise(resolve =>{
     this.db.get('user').then( (res) =>{
       this.firstTime = true;
       console.log("getting the information of the user" + res);
       if(res) {
         for (let user of res){
           if(!user.email == userForm.email){
             this.db.put(userForm);
             console.log("insert was successful");
           }
         }
       }

     }, (error) => {
       if(this.firstTime){
         this.db.put(userForm);
         console.log("insert was successful");
       } else {
         console.log("error has happened");
       }
     });
   });
  }

  forgotPassword(username){
    if(username)this.db.forgotPassword(username).then((result) => {
      console.log(result);
      return result;
    }, (error) => {
      console.log("failed to retrieve the password");
      return error;
    });
  }

}
