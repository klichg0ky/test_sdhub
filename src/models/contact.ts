export enum ContactGender {
  Male = "male",
  Female = "female",
}
export type Contact = {
  id: number;
  first_name: string;
  last_name: string;
  birth_date: string;
  gender: ContactGender;
  job: string;
  biography: string;
  is_active: boolean;
};
