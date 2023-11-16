import { CategoryEnum } from '../enums/category.enum';

export interface EventModel {
  id?: string;
  _id?: string;
  userId?: string;
  title: string;
  description: string;
  category: string;
  start?: string;
  end?: string;
  backgroundColor?: string;
}

export interface EventDialogModel {
  title: string;
  category: CategoryEnum;
  description: string;
}
