import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public customizedErrorMsg = '';

  constructor(public loginFormBuilder: FormBuilder, public router: Router) { }

  loginForm = this.loginFormBuilder.group({
    email: ['user@imdb.com', Validators.required],
    password: ['123', Validators.required]
  });

  ngOnInit() {
    localStorage.clear();
  }

  onSubmit() {
    if (this.loginForm.value.email === 'user@imdb.com' && this.loginForm.value.password === '123') {
      localStorage.setItem('loginToken', 'true');
      this.router.navigate(['/home']);
    } else {
      this.customizedErrorMsg = 'Invalid username or password';
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
