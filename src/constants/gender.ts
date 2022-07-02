import { ContactGender } from "models/contact";

export const GENDER_NAMES = {
  [ContactGender.Male]: "Мужчина",
  [ContactGender.Female]: "Женщина",
};

export const GENDER_LIST = [
  {
    title: "Мужчина",
    value: ContactGender.Male,
  },
  {
    title: "Женщина",
    value: ContactGender.Female,
  },
];
