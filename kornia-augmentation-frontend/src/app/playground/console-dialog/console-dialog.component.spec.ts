import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleDialogComponent } from './console-dialog.component';

describe('ConsoleDialogComponent', () => {
  let component: ConsoleDialogComponent;
  let fixture: ComponentFixture<ConsoleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsoleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
