import * as Yup from "yup";

export const signInSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().trim().required("Password is required"),
  rememberMe: Yup.boolean().optional(),
});
export type SignInSchemaType = Yup.InferType<typeof signInSchema>;

export const changePasswordSchema = Yup.object().shape({
  current_password: Yup.string().required("Old password is required"),

  new_password: Yup.string()
    .required("New password is required")
    .min(8, "New Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "New password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
    )
    .notOneOf(
      [Yup.ref("old_password")],
      "New password must be different from old password",
    ),

  confirm_new_password: Yup.string()
    .required("Please confirm your new password")
    .oneOf([Yup.ref("new_password")], "Passwords must match"),
});

export type ChangePasswordSchemaType = Yup.InferType<
  typeof changePasswordSchema
>;

export const resetPasswordSchema = Yup.object().shape({
  email: Yup.string().trim().email("Invalid email address").optional(),
  new_password: Yup.string()
    .min(8, "New password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "New password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
    )
    .notOneOf(
      [Yup.ref("old_password")],
      "New password must be different from old password",
    )
    .required("New password is required"),

  confirm_password: Yup.string()
    .oneOf([Yup.ref("new_password")], "Passwords must match")
    .required("Please confirm your new password"),
});

export type ResetPasswordSchemaType = Yup.InferType<typeof resetPasswordSchema>;

export const editAdminProfileSchema = Yup.object().shape({
  full_name: Yup.string()
    .trim()
    .required("Full Name is required")
    .max(50, "Name can't exceed 50 characters"),
  profile_image: Yup.mixed()
    .optional()
    .nullable()
    .test(
      "valid-type",
      "Must be a valid URL or an image file (JPEG, PNG, GIF)",
      (value) => {
        if (!value) return true;
        if (typeof value === "string") {
          return /^https?:\/\//.test(value);
        }
        if (value instanceof File) {
          const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
          return allowedTypes.includes(value.type);
        }
        return false;
      },
    ),
});
export type EditAdminDetailsSchemaType = Yup.InferType<
  typeof editAdminProfileSchema
>;

export const editUserDetailsSchema = Yup.object().shape({
  // user_id: Yup.number().required("User ID is required"),
  email: Yup.string().trim().email("Invalid email address"),
  // .required("Email is required"),
  username: Yup.string().required("Username is required."),
  full_name: Yup.string()
    .trim()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters"),
  bio: Yup.string().optional().max(500, "Bio must be at most 500 characters"),
  age: Yup.number()
    .transform((value, originalValue) =>
      originalValue === null || String(originalValue).trim() === ""
        ? undefined
        : value,
    )
    .nullable()
    .min(1, "Age must be greater than 0")
    .max(120, "Age must be less than or equal to 120"),

  phone_number: Yup.string()
    .required("Phone number is required.")
    .matches(/^[+]?[\d\s\-()]{7,20}$/, "Invalid phone number format")
    .max(15, "Phone number must be at most 15 characters"),

  profile_image: Yup.mixed()
    .optional()
    .nullable()
    .test(
      "valid-type",
      "Must be a valid URL or an image file (JPEG, PNG, GIF)",
      (value) => {
        if (!value) return true;
        if (typeof value === "string") {
          return /^https?:\/\//.test(value);
        }
        if (value instanceof File) {
          const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
          return allowedTypes.includes(value.type);
        }
        return false;
      },
    ),

  // zipcode: Yup.string().trim().required("ZIP code is required"),
  region_id: Yup.string().nullable(),
  city_id: Yup.string().nullable(),
  country_id: Yup.string().nullable(),
  state_id: Yup.string().nullable(),

  gender: Yup.string()
    .nullable()
    .oneOf(["M", "F", "O", null], "Invalid gender"),
});
export type EditUserDetailsSchemaType = Yup.InferType<
  typeof editUserDetailsSchema
>;

export const ProductSchema = Yup.object().shape({
  product_id: Yup.string().required("Product ID is required"),
  // .matches(/^PRD-\d{3,}$/, "Product ID must be in format PRD-XXX"),

  name: Yup.string()
    .required("Product name is required")
    .min(3, "Product name must be at least 3 characters")
    .max(100, "Product name must not exceed 100 characters"),

  category: Yup.string()
    .required("Category is required")
    .oneOf(
      ["watches-men", "watches-women", "purse", "jewellery"],
      "Invalid category selected",
    ),

  price: Yup.number()
    .required("Price is required")
    .min(0, "Price must be greater than or equal to 0")
    .test("is-decimal", "Price must have at most 2 decimal places", (value) => {
      if (value === undefined) return true;
      return /^\d+(\.\d{1,2})?$/.test(value.toString());
    }),

  // quantity: Yup
  //   .number()
  //   .required("Quantity is required")
  //   .min(0, "Quantity must be greater than or equal to 0")
  //   .integer("Quantity must be a whole number"),

  cover_image: Yup.mixed()
    .test("fileRequired", "Cover image is required", function (value) {
      const { parent } = this;
      // Skip validation in edit mode if image already exists
      if (parent.id && value === undefined) return true;
      return value !== undefined;
    })
    .test("fileType", "Only image files are allowed", function (value) {
      if (!value || typeof value === "string") return true;
      const file = value as File;
      return (
        file &&
        ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
          file.type,
        )
      );
    })
    .test("fileSize", "File size must be less than 5MB", function (value) {
      if (!value || typeof value === "string") return true;
      const file = value as File;
      return file && file.size <= 5 * 1024 * 1024;
    }),

  images: Yup.array()
    .of(
      Yup.mixed().test(
        "fileType",
        "Only image files are allowed",
        function (value) {
          if (!value || typeof value === "string") return true;
          const file = value as File;
          return (
            file &&
            ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
              file.type,
            )
          );
        },
      ),
    )
    .max(5, "You can upload maximum 5 images")
    .nullable(),

  color_variants: Yup.array()
    .of(
      Yup.object({
        color: Yup.string()
          .required("Color is required")
          .matches(
            /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/,
            "Invalid color hex code",
          ),
        quantity: Yup.number()
          .typeError("Quantity must be a number")
          .integer("Quantity must be an integer")
          .min(1, "Quantity less than 1 is not allowed")
          .required("Quantity is required"),
      }),
    )
    .min(1, "At least one color variant is required")
    .required(),

  description: Yup.string()
    .max(500, "Description must not exceed 500 characters")
    .nullable(),
});

export type ProductSchemaType = Yup.InferType<typeof ProductSchema>;
