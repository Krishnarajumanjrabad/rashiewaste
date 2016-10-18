import {Component, ViewChild, ElementRef} from "@angular/core";
import {NavController, AlertController} from "ionic-angular";
import {FormBuilder, Validators} from "@angular/forms";
import {SendPhotoServices} from "../../providers/send-photo-services/send-photo-services";

/*
 Generated class for the SendPhotosPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/send-photos/send-photos.html',
})
export class SendPhotosPage {
  @ViewChild("input")
  private nativeInputBtn: ElementRef;
  sendPhotoForm: any;
  companyName: string;
  contactPerson: string;
  contactNumber: string;
  uploadFile: any;
  DB_NAME: string = "sendPhotos";
  file: any;
  sendPhotos: any[] = [];

  constructor(private navCtrl: NavController, public fb: FormBuilder, public sendPhotoService: SendPhotoServices, public alertCrt: AlertController) {
    this.sendPhotoForm = fb.group({
      'companyName': ['', Validators.required],
      'contactPerson': ['', Validators.required],
      'contactNumber': ['', [Validators.required, Validators.maxLength(10)]]
    });


    this.companyName = this.sendPhotoForm.controls['companyName'];
    this.contactPerson = this.sendPhotoForm.controls['contactPerson'];
    this.contactNumber = this.sendPhotoForm.controls['contactNumber'];
    this.uploadFile = this.sendPhotoForm.controls['uploadFile'];

  }

  saveSendItems(form) {
    console.log("inside the send Photo information");
    console.log(form);
    let files = this.nativeInputBtn.nativeElement.files;
    console.log(files);
    for (this.file of files) {
      let filename = this.file.name;
      let contentType = this.file.type;
      let reader = new FileReader();
      //let base64 = reader.replace('data:' + this.file.type + ';base64,', '');
      let data = form;
      this.sendPhotoService.upload(data, this.file, this.file.type).then((result) => {
        console.log(result);
        this.sendPhotoService.getSendPhotos(this.DB_NAME).then(res => {
          console.log(res);
          this.sendPhotos.push(res);
          console.log(this.sendPhotos);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    }


  }


}
