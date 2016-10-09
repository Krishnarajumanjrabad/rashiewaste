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
  recordFound: boolean = false;
  emailIdFound: boolean = false;
  DB_NAME = 'users';

  constructor(public http: Http) {
    console.log('Hello AuthicationService Provider');

    this.db = new PouchDB('http://admin:admin@192.168.1.105:5984/rashi_db/');
    this.localdb = new PouchDB('rashi_db');
    this.localdb.sync(this.db, {live: true});
    this.localdb.replicate.to(this.db).on('complete', function () {
      // yay, we're done!
    }).on('error', function ( err ) {
      console.log(err);
    });
  }

  login(username, password) {
    console.log("printing the user and pass" + username + " " + password);
    return new Promise(resolve => {
      this.db.get(this.DB_NAME, {attachments: true}).then(( res ) => {
        console.log(res);
        if (res) {
          for (let userInfo of res.users) {
            if (userInfo.email == username && userInfo.password == password) {
              console.log("match found");
              this.user = userInfo;
              this.recordFound = true;

            }
          }
        }
        if (this.recordFound) {
          resolve(this.user);
          return this.user;
        } else {
          resolve();
          return false;
        }


      }).catch(( err ) => {
        console.log(err);
      });

    });

  }


  logout(username) {
    this.db.logout(username).then((res) => {
      console.log('user was logged out successfully');

    }, (error) => {
      console.log('something else has happened');
      return error;
    });
  }

  signIn(userForm) {
    return new Promise(resolve => {
      this.db.get(this.DB_NAME, {attachments: true}).then(( res ) => {
        this.firstTime = true;
        console.log("getting the information of the user" + res);
        if (res) {
          this.users = res.users;
          for (let result of res.users) {
            if (result.email == userForm.email) {
              console.log("user is already exist");
              this.emailIdFound = true;

            }

          }

          if (this.emailIdFound) {
            resolve();
            return false;
          } else {

            this.users.push(userForm);

            return this.db.put({_id: res._id, users: this.users, _rev: res._rev}).then(( doc ) => {
              resolve(doc);
              console.log("insert was successful");
            }).catch(( err ) => {
              console.log(err);
            });
          }
        }

      }).catch(( error ) => {
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
