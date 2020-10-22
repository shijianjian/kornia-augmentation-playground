import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AugmentationItemComponent } from './augmentation-item.component';

describe('AugmentationItemComponent', () => {
  let component: AugmentationItemComponent;
  let fixture: ComponentFixture<AugmentationItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AugmentationItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AugmentationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
