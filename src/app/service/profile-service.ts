import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProfileCardDto} from '../interfaces/model/profile-card';
import Constants from '../helpers/http/urls';
import {Pageable} from '../interfaces/model/subscribers';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient);

  public getTestProfiles() {
    return this.http.get<ProfileCardDto[]>(`${Constants.BASE_PATH_API}/account/test_accounts`)
  }

  public getPersonalProfile() {
    return this.http.get<ProfileCardDto>(`${Constants.BASE_PATH_API}/account/me`)
  }

  public getSubscribers() {
    return this.http.get<Pageable<ProfileCardDto>>(`${Constants.BASE_PATH_API}/account/subscribers`)    .pipe(
      map(response => response.items.slice(0, 3)),
    );
  }

}
