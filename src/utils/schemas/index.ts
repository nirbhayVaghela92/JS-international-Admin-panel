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

export const getCategorySchema = ({
  isShowShortDescription,
  isShowUserType,
}: {
  isShowShortDescription: boolean;
  isShowUserType?: boolean;
}) => {
  return Yup.object({
    name: Yup.string().trim().required("Category name is required"),
    points: Yup.number()
      .typeError("Points must be a number")
      .required("Points are required")
      .min(1, "Points must be greater than 0"),
    short_description: isShowShortDescription
      ? Yup.string().trim().required("Short description is required.")
      : Yup.string().notRequired(),
    description: Yup.string().trim().required("Description is required."),
    image: Yup.mixed()
      .required("An image is required")
      .test("is-valid", "An image is required", (value) => {
        if (!value) return false;
        if (typeof value === "string") return value.trim() !== "";
        if (value instanceof File) {
          return value.type.startsWith("image/");
        }
        return false;
      }),
    userType: isShowUserType
      ? Yup.string()
          .oneOf(["all", "user", "business"])
          .required("User type is required.")
      : Yup.string().notRequired(),
    audio: Yup.mixed()
      .optional()
      .nullable()
      .test("is-valid-audio", "Invalid audio file", (value) => {
        // If no value provided, it's optional so return true
        if (!value) return true;

        // If it's a string (URL), check if it's not empty
        if (typeof value === "string") return value.trim() !== "";

        // If it's a File object, check if it's an audio file
        if (value instanceof File) {
          const allowedAudioTypes = [
            "audio/mpeg",
            "audio/mp3",
            "audio/wav",
            "audio/ogg",
            "audio/aac",
            "audio/flac",
            "audio/webm",
            "audio/mp4",
            "audio/x-m4a",
          ];
          return allowedAudioTypes.includes(value.type);
        }

        return false;
      }),
  });
};
export type SubCategorySchemaType = Yup.InferType<
  ReturnType<typeof getCategorySchema>
>;

export const adventureSchema = Yup.object({
  title: Yup.string().trim().required("Title is required"),
  points: Yup.number()
    .typeError("Points must be a number")
    .required("Points are required")
    .min(1, "Points must be greater than 0"),
  audio: Yup.mixed()
    .optional()
    .nullable()
    .test("is-valid-audio", "Invalid audio file", (value) => {
      // If no value provided, it's optional so return true
      if (!value) return true;

      // If it's a string (URL), check if it's not empty
      if (typeof value === "string") return value.trim() !== "";

      // If it's a File object, check if it's an audio file
      if (value instanceof File) {
        const allowedAudioTypes = [
          "audio/mpeg",
          "audio/mp3",
          "audio/wav",
          "audio/ogg",
          "audio/aac",
          "audio/flac",
          "audio/webm",
          "audio/mp4",
          "audio/x-m4a",
        ];
        return allowedAudioTypes.includes(value.type);
      }

      return false;
    }),
  sub_category_ids: Yup.array()
    .of(Yup.string().required())
    .min(1, "At least one sub-category must be selected")
    .required("Sub categories are required"),
  description: Yup.string().trim().required("Description is required"),
  userType: Yup.string()
    .oneOf(["user", "business"])
    .required("User type is required."),
  post_images: Yup.mixed()
    .required("An image  is required")
    .test("is-valid", "An image is required", (value) => {
      if (!value) return false;
      if (typeof value === "string") return value.trim() !== "";
      if (value instanceof File) {
        return value.type.startsWith("image/");
      }
      return false;
    }),
});
export type adventureSchemaType = Yup.InferType<typeof adventureSchema>;

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

export const editBusinessDetailsSchema = Yup.object().shape({
  // user_id: Yup.number().required("User ID is required"),
  business_name: Yup.string()
    .trim()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters"),
  email: Yup.string().trim().email("Invalid email address"),
  username: Yup.string().trim().required("Username is required."),
  website_link: Yup.string().trim().required("Website Link is required."),
  bio: Yup.string()
    .trim()
    .optional()
    .max(500, "Bio must be at most 500 characters"),
  logo: Yup.mixed()
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
  region_id: Yup.string().nullable(),
  city_id: Yup.string().nullable(),
  country_id: Yup.string().nullable(),
  state_id: Yup.string().nullable(),
  // business_size_id: Yup.string().required("Business size is required."),
  industry_id: Yup.string().required("Indsutry is required."),
  full_street_address: Yup.string().nullable(),
  // zipcode: Yup.string().trim().required("ZIP code is required"),
  // .matches(/^\d{5}(-\d{4})?$/, "Invalid ZIP code format"),
  monthly_online_orders: Yup.string().required(
    "Monthly online orders is required.",
  ),
  physical_locations_range: Yup.string().required(
    "Physical locations range is required.",
  ),
  estimated_annual_revenue: Yup.string().required(
    "Estimated annual revenue is required.",
  ),
});
export type EditBusinessDetailsType = Yup.InferType<
  typeof editBusinessDetailsSchema
>;

export const NotificationSchema = Yup.object().shape({
  title: Yup.string().trim().required("Notification title is required."),
  // userType: Yup.string().oneOf(["all", "user", "business"]).required("User type is required."),
  message: Yup.string().trim().required("Notification Body is required."),
});
export type NotificationSchemaType = Yup.InferType<typeof NotificationSchema>;

export const BadgeSchema = Yup.object().shape({
  name: Yup.string().trim().required("Badge Name is required."),
  cover_image: Yup.mixed()
    .required("An image is required")
    .test("is-valid", "An image is required", (value) => {
      if (!value) return false;
      if (typeof value === "string") return value.trim() !== "";
      if (value instanceof File) {
        return value.type.startsWith("image/");
      }
      return false;
    }),
  type: Yup.string()
    .nullable()
    .oneOf(["points_based", "custom", "contest_badge"], "Invalid badge type")
    .required("Type is required."),
  points: Yup.number()
    .typeError("Points must be a number")
    .when("sub_type", {
      is: "stats_points",
      then: (schema) =>
        schema
          .required("Points are required")
          .min(1, "Points must be greater than 0"),
      otherwise: (schema) => schema.notRequired(),
    }),
  sub_type: Yup.string()
    .nullable()
    .when("type", {
      is: "points_based",
      then: (schema) =>
        schema
          .oneOf(["total_points", "stats_points", null], "Invalid badge type")
          .required("sub type is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  userType: Yup.string()
    .nullable()
    .when("type", {
      is: "points_based",
      then: (schema) =>
        schema
          .oneOf(["all", "user", "business"])
          .required("User type is required."),
      otherwise: (schema) => schema.notRequired(),
    }),
  category: Yup.string()
    .nullable()
    .when("sub_type", {
      is: "stats_points",
      then: (schema) =>
        schema
          .oneOf(
            [
              "posts",
              "rewards",
              "contests",
              "challenges",
              "encouragements",
              "shares",
              null,
            ],
            "Invalid badge categroy.",
          )
          .required("badge categroy is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

  description: Yup.string().trim().required("Description is required."),
});
export type BadgeSchemaType = Yup.InferType<typeof BadgeSchema>;

export const UniversitySchema = (mode: "Create" | "Edit") => {
  return Yup.object().shape({
    state_id: Yup.number().required("State is required."),
    college_name: Yup.string().trim().required("University name is required."),
    cover_image: Yup.mixed().when([], {
      is: () => mode === "Edit",
      then: (schema) =>
        schema
          .required("An image is required")
          .test("is-valid", "An image is required", (value) => {
            if (!value) return false;
            if (typeof value === "string") return value.trim() !== "";
            if (value instanceof File) {
              return value.type.startsWith("image/");
            }
            return false;
          }),
      otherwise: (schema) => schema.notRequired(),
    }),
    description: Yup.string()
      .required()
      .trim()
      .min(10, "Description must be at most 10 characters"),
  });
};
export type UniversitySchemaType = Yup.InferType<
  ReturnType<typeof UniversitySchema>
>;

export const AnnouncementsPostSchema = Yup.object().shape({
  media: Yup.mixed()
    .required("An image or video is required")
    .test("file-type", "Only image or video files are allowed", (value) => {
      if (!value) return false;

      if (typeof value === "string") return value.trim() !== "";

      if (value instanceof File) {
        return (
          value.type.startsWith("image/") || value.type.startsWith("video/")
        );
      }
      return false;
    })
    .test("file-size", "File must be under 100MB", (value) => {
      if (value instanceof File) {
        return value.size <= 100 * 1024 * 1024;
      }
      return true;
    })
    .test("video-duration", "Video must be under 90 seconds", (value) => {
      if (value instanceof File && value.type.startsWith("video/")) {
        return new Promise((resolve) => {
          const video = document.createElement("video");
          video.preload = "metadata";

          video.onloadedmetadata = () => {
            window.URL.revokeObjectURL(video.src);
            resolve(video.duration <= 90);
          };

          video.onerror = () => resolve(false);

          video.src = URL.createObjectURL(value);
        });
      }
      return true;
    }),

  content: Yup.string().trim().required("Content is required"),

  delete_images: Yup.array().of(Yup.string()).optional(),

  thumbnail: Yup.mixed()
    .nullable()
    .test("file-type", "Thumbnail must be an image", (value) => {
      if (!value) return true;
      if (typeof value === "string") return value.trim() !== "";
      if (value instanceof File) return value.type.startsWith("image/");
      return false;
    }),
});
export type AnnouncementsPostSchemaType = Yup.InferType<
  typeof AnnouncementsPostSchema
>;

export const contestSchema = Yup.object({
  title: Yup.string().trim().required("Title is required"),

  image: Yup.mixed()
    .required("Media file is required")
    .test("is-valid-image", "Invalid image file", (value) => {
      if (!value) return false;
      if (typeof value === "string") return value.trim() !== "";
      if (value instanceof File) {
        return value.type.startsWith("image/");
      }
      return false;
    }),

  description: Yup.string().trim().required("Introduction is required"),

  pricePoll: Yup.number()
    // .min(0, "Price poll amount must be at least 0.")
    .required("Price poll amount is required"),

  winnerPoints: Yup.number()
    .typeError("Winner points must be a number")
    .required("Winner points are required")
    .min(1, "Winner points must be greater than 0"),

  participatePoints: Yup.number()
    .typeError("Participant points must be a number")
    .required("Participant points are required")
    .min(1, "Participant points must be greater than 0"),

  startDate: Yup.date()
    .typeError("Start date is required")
    .required("Start date is required"),

  endDate: Yup.date()
    .typeError("End date is required")
    .required("End date is required")
    .min(Yup.ref("startDate"), "End date must be after the start date"),

  autoAssignBadge: Yup.boolean().required(
    "Auto-assign badge option is required",
  ),

  charityPercentage: Yup.number()
    .typeError("Charity percentage must be a number")
    .required("Charity percentage is required")
    .min(0, "Charity percentage must be at least 0%")
    .max(100, "Charity percentage cannot exceed 100%"),

  showDaysLeft: Yup.boolean().required(
    "Show/Hide 'Days Left' option is required",
  ),

  tncFile: Yup.mixed()
    .required("Terms and Condition PDF is required")
    .test("is-valid-pdf", "Invalid PDF file", (value) => {
      if (!value) return false;
      if (typeof value === "string") return value.trim() !== "";
      if (value instanceof File) {
        return value.type === "application/pdf";
      }
      return false;
    }),

  badges_id: Yup.array().of(Yup.string()),

  userType: Yup.string()
    .oneOf(["user", "business"])
    .required("User type is required."),

  contestScope: Yup.string()
    .oneOf(["local", "national"])
    .required("Contest scope is required."),
  region: Yup.string().when("contestScope", {
    is: "local",
    then: (schema) => schema.required("Region is required for local contests."),
    otherwise: (schema) => schema.notRequired(),
  }),
});
export type ContestSchemaType = Yup.InferType<typeof contestSchema>;

export const CharitySchema = Yup.object().shape({
  name: Yup.string().trim().required("Charity Name is required."),
  email: Yup.string().trim().email("Invalid email address"),
  phone_number: Yup.string()
    // .required("Phone number is required.")
    // .matches(/^[+]?[\d\s\-()]{7,20}$/, "Invalid phone number format")
    .max(15, "Phone number must be at most 15 characters"),
});
export type CharitySchemaType = Yup.InferType<typeof CharitySchema>;

export const regionSchema = Yup.object({
  name: Yup.string().trim().required("Region Name is required"),

  radius: Yup.number()
    .typeError("Radius must be a number")
    .required("Radius is required")
    .min(1, "Radius must be greater than 0"),

  stateId: Yup.string().required("State is required"),

  anchoreCityId: Yup.string().required("Anchore City is required"),

  citiesId: Yup.array()
    .of(Yup.string().required())
    .min(1, "At least one city must be selected")
    .required("Cities are required"),

  thresholdLimitUsers: Yup.number()
    .min(0, "Threshold limit for Users must be at least 0.")
    .required("Threshold limit for Users is required"),

  thresholdLimitBusiness: Yup.number()
    .min(0, "Threshold limit for Business must be at least 0.")
    .required("Threshold limit for Business is required"),
});
export type RegionSchemaType = Yup.InferType<typeof regionSchema>;
