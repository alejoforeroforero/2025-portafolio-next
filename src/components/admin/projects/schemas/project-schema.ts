import * as yup from "yup";

export const PROJECT_TYPES = ['root', 'art', 'api'] as const;
export type ProjectType = typeof PROJECT_TYPES[number];

export const projectSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  
  description: yup
    .string()
    .nullable()
    .transform((value) => value || null),
  
  link: yup
    .string()
    .url("Must be a valid URL")
    .nullable()
    .transform((value) => value || null),
  
  startDate: yup
    .date()
    .nullable()
    .transform((value) => value || null),
  
  endDate: yup
    .date()
    .nullable()
    .transform((value) => value || null)
    .test('end-date', 'End date must be after start date', function(value) {
      const { startDate } = this.parent;
      if (!startDate || !value) return true;
      return new Date(value) > new Date(startDate);
    }),
  
  position: yup
    .number()
    .required("Position is required")
    .min(0, "Position must be a positive number")
    .integer("Position must be a whole number"),
  
  stack: yup
    .array()
    .of(yup.string().required("Technology name cannot be empty"))
    .required("Technologies stack is required")
    .min(1, "At least one technology is required"),
  
  img: yup
    .string()
    .nullable()
    .transform((value) => value || null)
    .test('is-url', 'Must be a valid URL if provided', (value) => {
      if (!value) return true;
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    }),
  
  type: yup
    .string()
    .oneOf(PROJECT_TYPES, "Invalid project type. Must be one of: root, art, or api")
    .nullable()
    .transform((value) => value || null),
});

export type ProjectFormData = yup.InferType<typeof projectSchema>;
