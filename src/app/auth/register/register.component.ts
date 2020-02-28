import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  firstName = '';
  middleName = '';
  lastName = '';
  farmName = '';
  region = '';
  location = '';
  phoneNumber = '';
  email = '';
  password = '';
  isLoadingResults = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      middleName: [null],
      farmName: [null, Validators.required],
      region: [null],
      location: [null],
      phoneNumber: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    console.log('authCtrl:  register user form >>>>', form);
    this.authService.register(form)
      .subscribe(res => {
        console.log(`register new user resonse ==> ${res}`);
        this.router.navigate(['auth/login']);
      }, (err) => {
        console.log(err);
        alert(err.error);
      });
  }

}
