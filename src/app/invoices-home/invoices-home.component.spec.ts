import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesHomeComponent } from './invoices-home.component';

describe('InvoicesHomeComponent', () => {
  let component: InvoicesHomeComponent;
  let fixture: ComponentFixture<InvoicesHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoicesHomeComponent]
    });
    fixture = TestBed.createComponent(InvoicesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
