import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Constants from '../../helpers/http/urls';
import {LoginRequest} from '../../interfaces/model/login-request';
import {TokenResponse} from '../../interfaces/model/token-response';
import {tap} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  cookieService = inject(CookieService)
  tokenResponse?: TokenResponse

  get isAuthenticated(): boolean {
    if (!this.tokenResponse?.access_token) {
        this.tokenResponse = {
          access_token: this.cookieService.get("access_token"),
          refresh_token: this.cookieService.get("refresh_token"),
          token_type: this.cookieService.get("token_type"),
        };
    }
    return !!this.tokenResponse?.access_token;
  }

  public getTokenByLogin(request: LoginRequest) {
    const body = this.generateBody(request);
    return this.http.post<TokenResponse>(
      Constants.BASE_PATH_API + '/auth/token',
      body.toString(),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    ).pipe(tap(response => this.tokenResponse = response));
  }

  public refreshAccessToken() {

  }

  public saveCookie(response: TokenResponse) {
    this.cookieService.set("access_token", response.access_token);
    this.cookieService.set("refresh_token", response.refresh_token);
    this.cookieService.set("token_type", response.token_type);
  }

  private generateBody(request: LoginRequest) {
    return new URLSearchParams({
      "grant_type": "password",
      "username": request.username,
      "password": request.password
    });
  }
}
