import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContactOverlay } from './add-contact-overlay';

describe('AddContactOverlay', () => {
  let component: AddContactOverlay;
  let fixture: ComponentFixture<AddContactOverlay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddContactOverlay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddContactOverlay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
