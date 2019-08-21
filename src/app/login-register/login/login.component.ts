import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginRegisterService } from '../login-register.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['../login-register.scss', './login.component.scss']
})
export class LoginComponent implements OnInit {

  /** The form for all the content on the input when logging in */
  loginForm: FormGroup;
  /** Boolean to show/hide the password */
  passwordVisibility: boolean;
  /** number with the response status */
  resStatus: number;

  constructor(
    private loginRegisterService: LoginRegisterService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    //build the login form with Angular's FormBuilder (provided in root, by ReactiveFormsModule)
    this.loginForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });

    //set the password non-visible by default
    this.passwordVisibility = false;
  }

  onSubmit() {
    if (this.isValid()) {
      this.loginRegisterService.login(this.username.value, this.password.value)
        .subscribe((res: any) => this.resStatus = res);
    }
  }

  ngOnInit() {
    this.authService.isAuth().subscribe((authStatus: boolean) => {
      authStatus && this.router.navigateByUrl(this.authService.redirectUrl || '/dashboard');
    });
  }

  get username() { return this.loginForm.get('username') }
  get password() { return this.loginForm.get('password') }

  isValid(): boolean {
    return (this.username.errors || this.password.errors) ? false : true
  }
}
