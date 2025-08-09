import {Component, Input} from '@angular/core';
import {ProfileCardDto} from '../../interfaces/model/profile-card';
import {NgOptimizedImage} from '@angular/common';
import {ImgUrlPipe} from '../../helpers/pipes/img-url-pipe';

@Component({
  selector: 'app-profile-card',
  imports: [
    ImgUrlPipe
  ],
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss'
})
export class ProfileCard {
  @Input() profile!: ProfileCardDto;
}
