import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIncidentDialogComponent } from './edit-incident-dialog.component';

describe('EditIncidentDialogComponent', () => {
  let component: EditIncidentDialogComponent;
  let fixture: ComponentFixture<EditIncidentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditIncidentDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditIncidentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
