import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyfavPage } from './myfav.page';

describe('MyfavPage', () => {
  let component: MyfavPage;
  let fixture: ComponentFixture<MyfavPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MyfavPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
