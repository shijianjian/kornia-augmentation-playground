import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsThumbnailComponent } from './results-thumbnail.component';

describe('ResultsThumbnailComponent', () => {
  let component: ResultsThumbnailComponent;
  let fixture: ComponentFixture<ResultsThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
