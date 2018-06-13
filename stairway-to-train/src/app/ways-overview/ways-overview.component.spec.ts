import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaysOverviewComponent } from './ways-overview.component';

describe('WaysOverviewComponent', () => {
  let component: WaysOverviewComponent;
  let fixture: ComponentFixture<WaysOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaysOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaysOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
