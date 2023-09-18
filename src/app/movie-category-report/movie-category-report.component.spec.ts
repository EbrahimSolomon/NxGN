import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCategoryReportComponent } from './movie-category-report.component';

describe('MovieCategoryReportComponent', () => {
  let component: MovieCategoryReportComponent;
  let fixture: ComponentFixture<MovieCategoryReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieCategoryReportComponent]
    });
    fixture = TestBed.createComponent(MovieCategoryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
