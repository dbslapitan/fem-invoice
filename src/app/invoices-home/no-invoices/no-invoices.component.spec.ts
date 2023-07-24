import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoInvoicesComponent } from './no-invoices.component';

describe('NoInvoicesComponent', () => {
  let component: NoInvoicesComponent;
  let fixture: ComponentFixture<NoInvoicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoInvoicesComponent]
    });
    fixture = TestBed.createComponent(NoInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
