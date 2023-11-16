import { FormArray, FormControl } from '@angular/forms';

export interface EventFormModel {
  title: FormControl<string | null>;
  category: FormControl<string | null>;
  description: FormControl<string | null>;
}
