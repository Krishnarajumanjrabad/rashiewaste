import {Component} from "@angular/core";
import {NavController, LoadingController, AlertController} from "ionic-angular";
import {SignupPage} from "../signup/signup";
import {Validators, FormBuilder} from "@angular/common";
import {AuthicationService} from "../../providers/authication-service/authication-service";
import {TabsPage} from "../tabs/tabs";

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
  loginForm: any;
  email: string;
  password: string;
  users: any;


  constructor(private navCtrl: NavController, public fb: FormBuilder, public auth: AuthicationService, public loadingCrt: LoadingController, public alertCrt: AlertController) {
    console.log('Hello Login Page');

    this.loginForm = fb.group({
      'email': [' ', Validators.required],
      'password': [' ', Validators.required]

    });

    this.email = this.loginForm.controls['email'];
    this.password = this.loginForm.controls['password'];

  }


  signIn() {
    console.log('button is clicked');
    this.navCtrl.push(SignupPage);
  }

  login(form) {
    console.log('it is inside the onsubmit' + form.email);
    if (form) {
      console.log('inside the login submission');
      this.auth.login(form.email, form.password).then((res) => {
        console.log(res);
        if (res) {
          console.log(res);
          window.localStorage.setItem("user", JSON.stringify(res));
          this.navCtrl.setRoot(TabsPage);
        }
      }).catch((error) => {
        console.log("inside the else loop");
        let errorMessage: string = "Invalid username or password";
        let errorAlert = this.alertCrt.create({
          message: errorMessage,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
      });
    }


  }
}
