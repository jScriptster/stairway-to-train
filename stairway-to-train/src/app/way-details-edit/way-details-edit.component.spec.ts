import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WayDetailsEditComponent } from './way-details-edit.component';

describe('WayDetailsEditComponent', () => {
  let component: WayDetailsEditComponent;
  let fixture: ComponentFixture<WayDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WayDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WayDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
