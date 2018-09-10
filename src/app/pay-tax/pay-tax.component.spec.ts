import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayTaxComponent } from './pay-tax.component';

describe('PayTaxComponent', () => {
  let component: PayTaxComponent;
  let fixture: ComponentFixture<PayTaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayTaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
