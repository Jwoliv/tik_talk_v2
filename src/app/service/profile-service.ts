import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProfileCardDto} from '../interfaces/model/profile-card';
import Constants from '../helpers/http/urls';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient);

  getTestProfiles() {
    return this.http.get<ProfileCardDto[]>(`${Constants.BASE_PATH_API}/account/test_accounts`)
  }

  getPersonalProfile() {
    return this.http.get<ProfileCardDto>(`${Constants.BASE_PATH_API}/account/me`)
  }
}
