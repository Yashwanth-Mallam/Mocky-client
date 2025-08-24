"use client";

import { toast as sonnerToast } from "sonner";

type ToastType = "default" | "success" | "error" | "warning" | "info";

interface ShowToastOptions {
  title: string;
  description?: string;
  type?: ToastType;
  actionLabel?: string;
  onAction?: () => void;
}

function showToast({
  title,
  description,
  type = "default",
  actionLabel,
  onAction,
}: ShowToastOptions) {
  switch (type) {
    case "success":
      sonnerToast.success(title, {
        description,
        action:
          actionLabel && onAction
            ? {
                label: actionLabel,
                onClick: onAction,
              }
            : undefined,
      });
      break;

    case "error":
      sonnerToast.error(title, {
        description,
        action:
          actionLabel && onAction
            ? {
                label: actionLabel,
                onClick: onAction,
              }
            : undefined,
      });
      break;

    case "warning":
      sonnerToast.warning(title, {
        description,
        action:
          actionLabel && onAction
            ? {
                label: actionLabel,
                onClick: onAction,
              }
            : undefined,
      });
      break;

    case "info":
      sonnerToast.info(title, {
        description,
        action:
          actionLabel && onAction
            ? {
                label: actionLabel,
                onClick: onAction,
              }
            : undefined,
      });
      break;

    default:
      sonnerToast(title, {
        description,
        action:
          actionLabel && onAction
            ? {
                label: actionLabel,
                onClick: onAction,
              }
            : undefined,
      });
  }
}

export { showToast };
