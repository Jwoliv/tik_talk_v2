import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarSubscriberCard } from './sidebar-subscriber-card';

describe('SidebarSubscriberCard', () => {
  let component: SidebarSubscriberCard;
  let fixture: ComponentFixture<SidebarSubscriberCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarSubscriberCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarSubscriberCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
