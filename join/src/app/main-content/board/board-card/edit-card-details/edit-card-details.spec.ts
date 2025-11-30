import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCardDetails } from './edit-card-details';

describe('EditCardDetails', () => {
  let component: EditCardDetails;
  let fixture: ComponentFixture<EditCardDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCardDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCardDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
