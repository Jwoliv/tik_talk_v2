import {Component, inject} from '@angular/core';
import {ProfileService} from '../../service/profile-service';

@Component({
  selector: 'app-profile-page',
  imports: [],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss'
})
export class ProfilePage {
  profileService = inject(ProfileService)

  constructor() {
    this.profileService.getPersonalProfile().subscribe(personalProfile => console.log(personalProfile));
  }

}
