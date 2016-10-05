import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import * as PouchDB from "pouchdb";

declare var require: Require;

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
  user: any;

  constructor(public http: Http) {
    console.log('Hello AuthicationService Provider');

    this.db = new PouchDB('http://admin:admin@localhost:5984/rashi_db');
    this.localdb = new PouchDB('rashi_db');
    this.localdb.sync(this.db, {live: true, retry: true}).on('error', console.log.bind(console));
  }

  login(username, password){
    console.log("printing the user and pass" + username + " " + password);
    return new Promise(resolve => {
      this.db.get('users').then((res) => {
        console.log(res);
        if (res) {
          for (let userInfo of res.users) {
            if (userInfo.email == username && userInfo.password == password) {
              console.log("match found");
              this.user = userInfo;
              resolve(this.user);
            }

          }


        } else {
          console.log("No response from the server: please contact system admin");
        }
        return this.user;
      });
    });


    /* this.db.login(username,password).then( (res) =>{
     console.log(res);
     return res;
     },(error) => {
     console.log("username and password were invalid");
     return error;
     });*/
  }

  logout(username) {
    this.db.logout(username).then((res) => {
      console.log('user was logged out successfully');
      return this.db.allDocs();
    }, (error) => {
      console.log('something else has happened');
      return error;
    });
  }

  signIn(userForm) {
    return new Promise(resolve => {
      this.db.get('users').then((res) => {
        this.firstTime = true;
        console.log("getting the information of the user" + res);
        if (res) {
          for (let result of res.users) {
            if (!result.email == userForm.email) {
              this.db.put({_id: 'users', users: [userForm]});
              console.log("insert was successful");
            } else {
              console.log("user already exists in the system");
            }
            resolve(result.user);
          }
        }

      }, (error) => {
        if (!this.firstTime) {
          this.db.put({_id: 'users', users: [userForm]});
          console.log("insert was successful");
        } else {
          console.log("error has happened");
        }
      });
    });
  }

  forgotPassword(username) {
    if (username)this.db.forgotPassword(username).then((result) => {
      console.log(result);
      return result;
    }, (error) => {
      console.log("failed to retrieve the password");
      return error;
    });
  }

}
