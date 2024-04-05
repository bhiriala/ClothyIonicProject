import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddArticlePage } from './add-article.page';

describe('AddArticlePage', () => {
  let component: AddArticlePage;
  let fixture: ComponentFixture<AddArticlePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddArticlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
