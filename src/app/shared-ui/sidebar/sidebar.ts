import {Component, inject} from '@angular/core';
import {ProfileService} from '../../service/profile-service';
import {SidebarSubscriberCard} from '../sidebar-subscriber-card/sidebar-subscriber-card';
import {AsyncPipe} from '@angular/common';
import {ImgUrlPipe} from '../../helpers/pipes/img-url-pipe';

@Component({
  selector: 'app-sidebar',
  imports: [
    SidebarSubscriberCard,
    AsyncPipe,
    ImgUrlPipe
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  private profileService: ProfileService = inject(ProfileService);

  public links: { title: string, iconPath: string, urlPath: string }[] = [
    { title: 'Моя страница', iconPath: 'home_icon', urlPath: '/profile' },
    { title: 'Чати', iconPath: 'chats_icon', urlPath: '/chats' },
    { title: 'Поиск', iconPath: 'search_icon', urlPath: '/search' }
  ]

  public subscribers$ = this.profileService.getSubscribers()
  public personalProfile$ = this.profileService.getPersonalProfile()
}
