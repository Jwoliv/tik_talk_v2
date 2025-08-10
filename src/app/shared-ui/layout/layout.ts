import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Sidebar} from '../sidebar/sidebar';
import {ProfileService} from '../../service/profile-service';
import {CookieService} from 'ngx-cookie-service';
import {ProfileCardDto} from '../../interfaces/model/profile-card';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    Sidebar
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {
  profileService = inject(ProfileService);
  personalProfile!: ProfileCardDto

  ngOnInit() {
    this.profileService.getPersonalProfile().subscribe(response => {
      this.personalProfile = response
    })
  }
}
