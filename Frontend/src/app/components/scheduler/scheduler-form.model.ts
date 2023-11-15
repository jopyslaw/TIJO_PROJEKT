import { FormArray, FormControl } from '@angular/forms';

export interface SchedulerModel {
  title: FormControl<string | null>;
  category: FormControl<string | null>;
  description: FormControl<string | null>;
  events?: FormArray;
  userId?: FormControl<string>;
  startDate?: FormControl<string | null>;
  endDate?: FormControl<string | null>;
}
