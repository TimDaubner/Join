import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContactOverlay } from './edit-contact-overlay';

describe('EditContactOverlay', () => {
  let component: EditContactOverlay;
  let fixture: ComponentFixture<EditContactOverlay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditContactOverlay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditContactOverlay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
