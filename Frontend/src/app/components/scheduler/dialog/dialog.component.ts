import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryEnum } from 'src/app/shared/enums/category.enum';
import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventModel } from 'src/app/shared/models/event.model';
import { SchedulerModel } from '../scheduler-form.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  addForm!: FormGroup<SchedulerModel>;
  categories: { name: string; value: CategoryEnum }[] = [
    { name: 'Rozrywka', value: CategoryEnum.ENTERTAINMENT },
    { name: 'Wizyta medyczna', value: CategoryEnum.MEDICAL_VISIT },
    { name: 'Spotkanie', value: CategoryEnum.MEETING },
    { name: 'Wizyta', value: CategoryEnum.VISITS },
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventModel
  ) {}

  ngOnInit(): void {
    this.addForm = this.fb.group<SchedulerModel>({
      title: this.fb.control(
        this.data === null ? null : this.data.title,
        Validators.required
      ),
      category: this.fb.control(
        this.data === null ? null : this.data.category,
        Validators.required
      ),
      description: this.fb.control(
        this.data === null ? null : this.data.description,
        Validators.required
      ),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  save() {
    const data = this.addForm.getRawValue();
    this.dialogRef.close(data);
  }

  close() {
    this.dialogRef.close();
  }
}
