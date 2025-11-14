import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactOverlay } from './contact-overlay';

describe('ContactOverlay', () => {
  let component: ContactOverlay;
  let fixture: ComponentFixture<ContactOverlay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactOverlay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactOverlay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
