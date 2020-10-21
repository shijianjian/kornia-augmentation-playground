import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KorniaResultsComponent } from './kornia-results.component';

describe('KorniaResultsComponent', () => {
  let component: KorniaResultsComponent;
  let fixture: ComponentFixture<KorniaResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KorniaResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KorniaResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
