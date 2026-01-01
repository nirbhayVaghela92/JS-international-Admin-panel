"use client";
import { EmailIcon, UserIcon } from "@/assets/icon";
import InputGroup from "@/components/custom-elements/InputGroup";

import { CustomButton } from "@/components/custom-elements/button";
import { UploadPhotoForm } from "../../shared/Uploadzone/UploadPhotoForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, set } from "react-hook-form";
import {
  EditAdminDetailsSchemaType,
  editAdminProfileSchema,
} from "@/utils/schemas";
import { useEditProfile } from "@/hooks/queries";
import { routes } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/custom-elements/Loader";
import { LocalStorageGetItem, LocalStorageSetItem } from "@/utils/helpers";

export function AccountSettings() {
  const router = useRouter();
  const { mutateAsync: editProfile, isPending } = useEditProfile();
  const adminDetails = LocalStorageGetItem("adminDetails");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditAdminDetailsSchemaType>({
    defaultValues: {
      profile_image: adminDetails?.profile_image,
      full_name: adminDetails?.username || "",
    },
    resolver: yupResolver(editAdminProfileSchema),
  });

  const onSubmit = async (values: EditAdminDetailsSchemaType) => {
    const formData = new FormData();
    formData.append("id", String(adminDetails?.id));
    formData.append("username", values.full_name);
    if (values.profile_image instanceof File) {
      formData.append("profile_image", values.profile_image);
    }

    const { data } = await editProfile(formData);

    if (!data?.status || data?.status === "false") {
      return;
    }

    LocalStorageSetItem("adminDetails", data?.data);
    router.replace(routes.dashboard);
  };

  // useEffect(() => {
  //   if (adminDetails) {
  //     setValue("profile_image", adminDetails.profile_image);
  //     setValue("full_name", adminDetails.full_name);
  //   }
  // }, [adminDetails]);

  if (isPending || !adminDetails) {
    return <Loader />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="rounded-[10px] bg-white p-7 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="flex flex-col gap-3">
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
                defaultImage={
                  adminDetails?.profile_image || "/images/user/user-03.png"
                }
              />
            )}
          />

          <InputGroup
            {...register("full_name")}
            error={!!errors.full_name}
            errorMessage={errors.full_name?.message}
            className="w-full"
            type="text"
            name="full_name"
            label="Full Name"
            icon={<UserIcon />}
            iconPosition="left"
            height="sm"
          />

          <InputGroup
            className="mb-5.5"
            type="email"
            name="email"

            label="Email Address"
            defaultValue={adminDetails?.email}
            icon={<EmailIcon />}
            iconPosition="left"
            height="sm"
            disabled
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            className="rounded-lg border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
            type="button"
            onClick={() => router.back()}
          >
            Cancel
          </button>

          <CustomButton
            className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
            type="submit"
            label={isPending ? "Saving..." : "Save"}
            disabled={isPending}
          />
        </div>
      </div>
    </form>
  );
}
