import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {ConnectivityService} from "../connectivity-service/connectivity-service";

/*
 Generated class for the SendPhotoServices provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class SendPhotoServices {
  db: any;
  DB_NAME: string = "sendPhotos";
  private showPageList: any[] = [];
  private file: any;
  private matchFound: boolean = false;
  private sendPhotos: any[] = [];

  constructor(private http: Http) {
    if (this.db == null || this.db == "UNDEFINED") {
      this.db = ConnectivityService.getDatabaseConnection();
    }
  }

  upload(form, file, type) {
    if (form && file) {
      var peep = form;
      peep._attachments = {};
      peep._attachments.files = {
        "content_type": type,
        "data": file
      };
      peep._id = this.DB_NAME;


      return new Promise((resolve, reject)=> {
        this.db.get(this.DB_NAME, {attachments: true}).then((result) => {
          console.log(result);
          console.log(peep);
          if (result) {
            if (JSON.stringify(result) == JSON.stringify(peep)) {
              console.log("already this file exist in the system");
              peep._rev = result._rev;
              this.db.put(peep).then((doc) => {
                console.log(doc);
                resolve(doc);
              }).catch((err) => {
                console.log(err);
                reject(err);
              });
            } else {
              peep._rev = result._rev;
              this.db.put(peep).then((doc) => {
                console.log(doc);
                resolve(doc);
              }).catch((err) => {
                console.log(err);
                reject(err);
              });
            }
          }
        });
        /* this.db.post( peep ).then((doc)=> {
         console.log(doc);
         resolve(doc);
         }).catch((err)=> {
         reject(err);
         });*/
      });
    }
  }

  getSendPhotos(id) {
    return new Promise((resolve, reject)=> {
      this.db.get(id, {attachments: true})
        .then((docs) => {
          resolve(docs)
        })
        .catch((err)=> {
          reject(err)
        })
    })
  }


}

