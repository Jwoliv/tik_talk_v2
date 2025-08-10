import {Component, inject, Output, signal} from '@angular/core';
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
  private authService = inject(AuthService)
  private router = inject(Router)

  public isPasswordVisible = signal(false);

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  })

  public sendLoginRequest(event: Event) {
    let loginRequest: LoginRequest = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    this.authService.getTokenByLogin(loginRequest).subscribe({
      next: (response: TokenResponse) => {
        this.authService.saveTokenInCookie(response);
        this.router.navigate(['/search'])
      }
    });
  }

  public clickPasswordRevealButton(): void {
    this.isPasswordVisible.set(!this.isPasswordVisible())
  }
}
