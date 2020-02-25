import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userName: '';
  email = '';
  password = '';
  isLoadingResults = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: [null, Validators.required],
      password: [null, Validators.required]
    });

    // if (this.authService.checkLoggedIn) {
    //   this.router.navigate(['/']);
    // }
  }

  onFormSubmit(form: NgForm) {
    console.log('controller login form >>>>', form);
    this.authService.login(form)
      .subscribe(res => {
        this.isLoadingResults = true;
        console.log('login response >>>', res);
        if (res.token) {
          this.isLoadingResults = false;
          console.log(`res.token: ${res.token}`);
          console.log(`storing res.token ...`);
          localStorage.setItem('token', res.token);
          // console.log('getToken localstorage ::: ' + localStorage.getItem('token'));
          this.router.navigate(['dashboard']);
        }
      }, (err) => {
        console.error(`login controller: error login => ${err}`);
        alert(err.message);
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
   }

  register() {
    this.router.navigate(['auth/register']);
  }
}
