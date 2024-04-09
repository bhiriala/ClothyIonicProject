import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilearticlePage } from './profilearticle.page';

describe('ProfilearticlePage', () => {
  let component: ProfilearticlePage;
  let fixture: ComponentFixture<ProfilearticlePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProfilearticlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
