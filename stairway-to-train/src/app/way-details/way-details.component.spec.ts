import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WayDetailComponent } from './way-detail.component';

describe('WayDetailComponent', () => {
  let component: WayDetailComponent;
  let fixture: ComponentFixture<WayDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WayDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WayDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
