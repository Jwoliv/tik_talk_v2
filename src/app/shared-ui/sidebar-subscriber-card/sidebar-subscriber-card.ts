import {Component, Input} from '@angular/core';
import {ProfileCardDto} from '../../interfaces/model/profile-card';
import {ImgUrlPipe} from '../../helpers/pipes/img-url-pipe';

@Component({
  selector: 'app-sidebar-subscriber-card',
  imports: [
    ImgUrlPipe
  ],
  templateUrl: './sidebar-subscriber-card.html',
  styleUrl: './sidebar-subscriber-card.scss'
})
export class SidebarSubscriberCard {
  @Input() profile!: ProfileCardDto
}
