"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import InputGroup from "@/components/custom-elements/InputGroup";
import { CustomButton } from "@/components/custom-elements/button";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  NotificationSchema,
  NotificationSchemaType,
} from "@/utils/schemas";
import { Textarea } from "@/components/ui/textarea";
import { useSendNotificaion } from "@/hooks/queries";

interface NotificationDialogType {
  isOpen: boolean;
  onClose: () => void;
  mode?: "create" | "view";
  title?: string;
  notification?: any;
}

export function NotificationDialog({
  isOpen,
  onClose,
  mode,
  title,
  notification,
}: NotificationDialogType) {
  const { mutateAsync: sendNotification, isPending: isSendingNotification } =
    useSendNotificaion();

  const {
    setValue,
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NotificationSchemaType>({
    defaultValues: {
      title: notification?.title ?? "",
      message: notification?.message ?? "",
    },
    resolver: yupResolver(NotificationSchema),
  });

  // const userType = watch("userType");

  const onSubmit = async (data: NotificationSchemaType) => {
    await sendNotification({
      title: data?.title,
      message: data?.message,
      // userType: data?.userType,
    });

    onClose();
    reset();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          reset();
          onClose();
        }
      }}
    >
      <DialogContent
        className="sm:max-w-md"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="modaldatascroll grid gap-4 py-4"
        >
          <div className="flex flex-col gap-4">
            <InputGroup
              autoComplete="off"
              type="text"
              disabled={mode === "view"}
              label="Notification Title"
              placeholder="Enter Notification title"
              error={!!errors.title}
              errorMessage={errors.title?.message}
              {...register("title")}
            />
            {/* {mode === "create" ?
              <CustomDropdown
                label="Eligible for"
                placeholder="Select User type"
                width="w-full"
                options={userTypeDropdown}
                error={!!errors.userType}
                errorMessage={errors.userType?.message}
                showClearButton={false}
                value={userType ?? ""}
                onChange={(option) => {
                  const selectedUserType = option;
                  setValue("userType", selectedUserType as NotificationSchemaType["userType"]);
                }}
              /> :

              <UserTypeBadge type="user" className="w-fit" label="Eligible for"/>
            } */}

            <Textarea
              disabled={mode === "view"}
              label="Add Notification message"
              errorMessage={errors.message?.message}
              {...register("message")}
              placeholder="Add message"
            />
          </div>

          {mode === "create" && (
            <DialogFooter>
              <CustomButton
                type="button"
                onClick={() => {
                  reset();
                  onClose();
                }}
                variant="outline"
                label="Cancel"
              />

              <CustomButton
                type="submit"
                label="Send"
                loading={isSendingNotification}
              />
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
