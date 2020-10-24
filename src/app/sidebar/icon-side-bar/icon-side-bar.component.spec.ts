import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconSideBarComponent } from './icon-side-bar.component';

describe('IconSideBarComponent', () => {
  let component: IconSideBarComponent;
  let fixture: ComponentFixture<IconSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
