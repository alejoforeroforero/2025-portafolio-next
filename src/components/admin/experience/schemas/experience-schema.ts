import * as yup from "yup";

export const experienceSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().nullable().default(null),
  link: yup.string().url("Must be a valid URL").nullable().default(null),
  startDate: yup.date().nullable().default(null),
  endDate: yup.date().nullable().default(null),
  position: yup.number().required("Position is required").min(0, "Position must be positive"),
  stack: yup.array().of(yup.string()).required("Stack is required").min(1, "At least one technology is required"),
  img: yup.string().nullable().default(null),
});

export type ExperienceFormData = yup.InferType<typeof experienceSchema>;
