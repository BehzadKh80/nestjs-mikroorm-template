import {
  CheckboxQuestion,
  ConfirmQuestion,
  EditorQuestion,
  ExpandQuestion,
  InputQuestion,
  ListQuestion,
  NumberQuestion,
  PasswordQuestion,
  Question,
  RawListQuestion,
} from 'inquirer';

export type PromptQuestion =
  | Question
  | CheckboxQuestion
  | ListQuestion
  | ExpandQuestion
  | ConfirmQuestion
  | EditorQuestion
  | RawListQuestion
  | PasswordQuestion
  | NumberQuestion
  | InputQuestion;
