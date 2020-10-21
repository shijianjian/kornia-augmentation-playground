import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AugmentationListComponent } from './augmentation-list.component';

describe('AugmentationListComponent', () => {
  let component: AugmentationListComponent;
  let fixture: ComponentFixture<AugmentationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AugmentationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AugmentationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
