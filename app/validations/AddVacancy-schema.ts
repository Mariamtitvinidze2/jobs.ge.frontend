import * as yup from "yup";

export const AddVacancySchema = yup.object().shape({
  name: yup
    .string()
    .required("Vacancy name is required")
    .min(2, "Vacancy name must be at least 2 characters"),
  sallery: yup
    .number()
    .typeError("Salary must be a number")
    .required("Salary is required")
    .min(0, "Salary must be 0 or greater"),
  location: yup
    .string()
    .required("Category is required")
    .oneOf(
      [
        "IT and Programming",
        "Educational",
        "Marketing",
        "Finances",
        "Medical Field",
        "Law",
        "Construction",
        "Accounting, Finances",
        "Auto Service",
        "Advertisement, Cashier, Consultant",
        "Education",
        "Sales, Marketing",
        "Insurance, Banks",
        "Cleaning",
        "Protection, Security",
        "Cook, Bartender",
        "Mechanics",
        "Construction",
        "Repair, Building",
        "Office Work, Administration",
        "Hotel, Tourism",
        "Construction Vehicles",
        "Sports, Negotiation",
        "Engineering",
        "Statistics",
        "Management",
        "Logistics, Jobs",
        "Pharmacy, Health",
        "Art, Management",
        "Handyman, Repair, Decoration",
        "Assistant, Singer, Helper",
        "Underwater Firefighter",
      ],
      "Select a valid category"
    ),
  workplace: yup
    .string()
    .required("Workplace selection is required")
    .oneOf(["On-site", "Remote", "Optional"], "Select a valid workplace"),
  duration: yup
    .string()
    .required("Duration selection is required")
    .oneOf(["Part-time", "Full-time", "Hybrid"], "Select a valid duration"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
});

export type AddVacancyType = yup.InferType<typeof AddVacancySchema>;