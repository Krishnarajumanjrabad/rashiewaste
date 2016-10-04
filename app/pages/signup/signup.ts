import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {FormBuilder, Validators} from "@angular/forms";
import {AuthicationService} from "../../providers/authication-service/authication-service";
import {Control} from "@angular/common";

/*
 Generated class for the SignupPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/signup/signup.html',
})
export class SignupPage {
  signupForm: any;
  name: string;
  companyName: string;
  password: string;
  confirmPassword: string;
  address: string;
  contactNumber: string;
  email: string;



  constructor(private navCtrl: NavController, public fb: FormBuilder, public auth: AuthicationService) {
    console.log('Hello Sign Up Page');
    this.signupForm = fb.group({
      'password': ['', [Validators.required, Validators.minLength(8)]],
      'confirmPassword': ['', [Validators.required, Validators.minLength(8)]],
      'companyName': ['', Validators.required],
      'name': ['', Validators.required],
      'address': ['', Validators.required],
      'contactNumber': ['', Validators.required],
      'email': ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    });


   this.password = this.signupForm.controls['password'];
    this.companyName = this.signupForm.controls['companyName'];
    this.name = this.signupForm.controls['name'];
    this.confirmPassword = this.signupForm.controls['confirmPassword'];
    this.address = this.signupForm.controls['address'];
    this.contactNumber = this.signupForm.controls['contactNumber'];
    this.email = this.signupForm.controls['email'];
  }

 checkConfirmPasswordValidator(password, confirmPassword) {

      if ( password != null && confirmPassword != null) {

        if(password == confirmPassword){
          return true;
        } else {
          return false;
        }
      }

  }

  signUp(formValue) {
    console.log('inside the signup method');
    if (formValue) {
      console.log('Submitted value: ', formValue.password);
      this.auth.signIn(formValue);
      console.log('insert was successful');
    }
  }
}
