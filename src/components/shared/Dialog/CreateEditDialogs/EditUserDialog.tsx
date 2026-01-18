"use client";
import InputGroup from "@/components/custom-elements/InputGroup";
import { CustomButton } from "@/components/custom-elements/button";
import CustomDropdown from "@/components/custom-elements/CustomDropdown";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { UploadPhotoForm } from "@/components/shared/Uploadzone/UploadPhotoForm";
import { useUpdateUserDetails } from "@/hooks/queries";
import { useGetDropdowns } from "@/hooks/useGetDropdowns";
import {
  editUserDetailsSchema,
  EditUserDetailsSchemaType,
} from "@/utils/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

interface EditUserDialogPropTypes {
  userDetails: any;
  isOpen: boolean;
  onClose: () => void;
}

export function EditUserDialog({
  isOpen,
  onClose,
  userDetails,
}: EditUserDialogPropTypes) {
  const router = useRouter();

  const { mutateAsync: updateUserDetails, isPending: isUpdatingUserDetails } =
    useUpdateUserDetails();


  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<EditUserDetailsSchemaType>({
    defaultValues: {
      full_name: userDetails?.name,
      bio: userDetails?.bio || "",
      age: userDetails?.age ?? "",
      username: userDetails?.username,
      country_id: userDetails?.country ? String(userDetails?.country) : "",
      state_id: userDetails?.state ? String(userDetails?.state) : "",
      city_id: userDetails?.city ? String(userDetails?.city) : "",
      email: userDetails?.email,
      gender: userDetails?.gender,
      phone_number: userDetails?.mobile_number,
      profile_image: userDetails?.profile_image || null,
      region_id: userDetails?.region?.id,
      // zipcode: userDetails?.zipcode || "",
    },
    resolver: yupResolver(editUserDetailsSchema),
  });

  const countryId = watch("country_id");
  const stateId = watch("state_id");
  const cityId = watch("city_id");
  const gender = watch("gender");
  const regionId = watch("region_id");

  const onSubmit = async (values: EditUserDetailsSchemaType) => {
    const formData = new FormData();
    // Append updated values
    if (values.bio) formData.append("bio", values.bio || "");
    formData.append("user_id", String(userDetails?.id));
    formData.append("username", values.username);
    formData.append("full_name", values.full_name);
    formData.append("email", String(values.email));
    formData.append("age", values.age?.toString() || "");
    formData.append("gender", values.gender || "");
    formData.append("mobile_number", values.phone_number);
    formData.append("country_id", values.country_id?.toString() || "");
    formData.append("state_id", values.state_id?.toString() || "");
    formData.append("city_id", values.city_id?.toString() || "");
    if (values.region_id)
      formData.append("region_id", values.region_id?.toString() || "");
    // if (values.zipcode) formData.append("zipcode", values.zipcode);
    if (values.profile_image instanceof File) {
      formData.append("profile_image", values.profile_image);
    }

    // const { data } = await updateUserDetails(formData);
    const data= {
      status: "true"
    }

    if (!data?.status || data?.status === "false") {
      // toast.error(data?.message || "Failed to update profile.");
      return;
    }

    onClose();
  };

  if (!userDetails) {
    return null;
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent
        className="max-h-[85vh] overflow-y-auto border-none p-5 sm:max-w-2xl"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onInteractOutside={(e) => {
          // Check if the click is inside a popover content
          const target = e.target as Element;
          if (target.closest("[data-radix-popper-content-wrapper]")) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>Edit User Details</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Controller
              name="profile_image"
              control={control}
              render={({ field: { onChange, onBlur, value, name } }) => (
                <UploadPhotoForm
                  name={name}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={!!errors.profile_image}
                  errorMessage={errors.profile_image?.message}
                />
              )}
            />
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InputGroup
                {...register("full_name")}
                error={!!errors.full_name}
                errorMessage={errors.full_name?.message}
                className="w-full"
                type="text"
                label="Full Name"
                placeholder="Full Name"
                height="sm"
              />

              <InputGroup
                {...register("username")}
                error={!!errors.username}
                errorMessage={errors.username?.message}
                className="w-full"
                type="text"
                name="username"
                label="Username"
                placeholder="Username"
                height="sm"
              />

              <InputGroup
                {...register("email")}
                error={!!errors.email}
                errorMessage={errors.email?.message}
                className="w-full"
                type="email"
                name="email"
                label="Email"
                placeholder="Email"
                height="sm"
              />
              <InputGroup
                {...register("phone_number")}
                error={!!errors.phone_number}
                errorMessage={errors.phone_number?.message}
                className="no-spinner w-full"
                type="text"
                name="phone_number"
                label="Phone Number"
                placeholder="Phone Number"
                height="sm"
              />
              <Textarea
                label="Bio"
                errorMessage={errors.bio?.message}
                {...register("bio")}
                placeholder="Add Bio"
                maxLength={150}
              />
              <InputGroup
                {...register("age")}
                error={!!errors.age}
                errorMessage={errors.age?.message}
                className="w-full"
                type="number"
                name="age"
                label="Age"
                placeholder="Age"
                height="sm"
              />

              {/* <CustomDropdown
                label="Gender"
                placeholder="Gender"
                width="w-70"
                options={genderDropdown!}
                showClearButton={true}
                onClear={() => setValue("gender", null)}
                value={gender ?? ""}
                onChange={(option) => {
                  const selectedGender = option;
                  setValue("gender", selectedGender as "M" | "F" | "other");
                }}
              /> */}


              {/* <Input
                label="Zipcode"
                placeholder="Enter Zipcode"
                type="text"
                value={watch("zipcode")}
                onChange={(e) => {
                  const value = e.target.value;

                  // Allow only digits (remove all non-digit characters)
                  if (/^\d*$/.test(value)) {
                    setValue("zipcode", String(value));
                  }
                }}
                className="w-full"
                autoComplete="off"
                error={!!errors.zipcode}
                errorMessage={errors.zipcode?.message}
              /> */}

              {/* <CustomDropdown
                label="Region"
                placeholder="Region"
                width="w-70"
                options={regionDropdown!}
                showClearButton={true}
                onClear={() => setValue("region_id", null)}
                value={regionId ?? ""}
                onChange={(option) => {
                  const selectedRegionId = option as string;
                  setValue("region_id", selectedRegionId);
                }}
              /> */}
            </div>
          </div>
          <div className="mt-5 flex justify-end gap-3">
            <button
              className="rounded-lg border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

            <CustomButton
              loading={isUpdatingUserDetails}
              className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
              type="submit"
              label="Save"
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
