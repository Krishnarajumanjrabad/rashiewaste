import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {SignupPage} from "../signup/signup";
import {Validators, FormBuilder} from "@angular/common";
import {AuthicationService} from "../../providers/authication-service/authication-service";

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [AuthicationService]
})
export class LoginPage {
  loginForm:any;
  email: string;
  password: string;



 constructor(private navCtrl: NavController, public fb: FormBuilder, public auth: AuthicationService) {
    console.log('Hello Login Page');

    this.loginForm = fb.group({
      'email': [' ', Validators.required],
      'password': [' ', Validators.required]

    });

   this.email = this.loginForm.controls['email'];
    this.password = this.loginForm.controls['password'];

  }



  signIn(){
    console.log('button is clicked');
    this.navCtrl.push(SignupPage);
  }

  login(form){
    console.log('it is inside the onsubmit');
    if(this.loginForm.valid){
      console.log('inside the login submission');
    }

  }




}
