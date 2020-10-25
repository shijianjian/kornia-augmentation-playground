import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamsViewerComponent } from './params-viewer.component';

describe('ParamsViewerComponent', () => {
  let component: ParamsViewerComponent;
  let fixture: ComponentFixture<ParamsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParamsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
