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
      first_name: userDetails?.first_name || "",
      last_name: userDetails?.last_name || "",
      email: userDetails?.email,
      phone_number: userDetails?.mobile_number,
    },
    resolver: yupResolver(editUserDetailsSchema),
  });

  const onSubmit = async (values: EditUserDetailsSchemaType) => {
    const res = await updateUserDetails({
      id: userDetails.id,
      first_name: values.first_name,
      last_name: values.last_name,
      phone_number: values.phone_number,
    });
    console.log(res, "resresres");
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
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InputGroup
                {...register("first_name")}
                error={!!errors.first_name}
                errorMessage={errors.first_name?.message}
                className="w-full"
                type="text"
                label="First Name"
                placeholder="First Name"
                height="sm"
              />

              <InputGroup
                {...register("last_name")}
                error={!!errors.last_name}
                errorMessage={errors.last_name?.message}
                className="w-full"
                type="text"
                label="Last Name"
                placeholder="Last Name"
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
                disabled
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
              className="rounded-lg bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
              type="submit"
              label="Save"
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
