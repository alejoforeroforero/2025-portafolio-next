import * as yup from "yup";

export const PROJECT_TYPES = ['root', 'art', 'api'] as const;
export type ProjectType = typeof PROJECT_TYPES[number];

export const projectSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  link: yup.string().url("Must be a valid URL").required("Link is required"),
  startDate: yup.date().required("Start date is required"),
  endDate: yup.date().nullable().default(null),
  position: yup.number().required("Position is required").min(0, "Position must be positive"),
  stack: yup.array().of(yup.string()).required("Stack is required").min(1, "At least one technology is required"),
  img: yup.string().nullable().default(null),
  type: yup.string().oneOf(PROJECT_TYPES, "Invalid project type").required("Project type is required"),
});

export type ProjectFormData = yup.InferType<typeof projectSchema>;
