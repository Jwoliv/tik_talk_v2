import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {ProfileCard} from '../../shared-ui/profile-card/profile-card';
import { ProfileService } from '../../service/profile-service';
import {ProfileCardDto} from '../../interfaces/model/profile-card';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-search-page',
  imports: [
    ProfileCard
  ],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss'
})
export class SearchPage {
  profileService = inject(ProfileService);
  cdr = inject(ChangeDetectorRef);
  profiles : ProfileCardDto[] = []

  constructor() {
    this.profileService.getTestProfiles()
      .subscribe(profiles => {
        this.profiles = profiles
        this.cdr.markForCheck()
      });
  }
}
