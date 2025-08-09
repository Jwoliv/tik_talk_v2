import {Component, inject, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth/auth-service';
import {TokenResponse} from '../../interfaces/model/token-response';
import {Router} from '@angular/router';
import {LoginRequest} from '../../interfaces/model/login-request';

@Component({
  selector: 'app-login-page',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage {
  private tokenResponse: TokenResponse = {
    access_token: '',
    refresh_token: '',
    token_type: ''
  };
  private authService = inject(AuthService)
  private router = inject(Router)

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  })

  sendLoginRequest(event: Event) {
    let loginRequest: LoginRequest = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    this.authService.getTokenByLogin(loginRequest).subscribe({
      next: (response: TokenResponse) => {
        this.tokenResponse = response
        this.authService.saveCookie(response);
        this.router.navigate(['/search'])
      }
    });
  }
}
