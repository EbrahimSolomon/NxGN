import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupedMoviesComponent } from './grouped-movies.component';

describe('GroupedMoviesComponent', () => {
  let component: GroupedMoviesComponent;
  let fixture: ComponentFixture<GroupedMoviesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupedMoviesComponent]
    });
    fixture = TestBed.createComponent(GroupedMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
