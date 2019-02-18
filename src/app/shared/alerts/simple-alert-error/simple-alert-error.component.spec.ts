import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleAlertErrorComponent } from './simple-alert-error.component';

describe('SimpleAlertErrorComponent', () => {
  let component: SimpleAlertErrorComponent;
  let fixture: ComponentFixture<SimpleAlertErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleAlertErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleAlertErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
