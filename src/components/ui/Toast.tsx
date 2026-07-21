/* eslint-disable react-refresh/only-export-components */
import toast, { Toaster } from "react-hot-toast";
import { CheckCircle2, XCircle } from "lucide-react";

export const ToastProvider = () => (
  <Toaster
    position="top-center"
    toastOptions={{
      className: "font-body text-sm rounded-control border border-border",
      style: { background: "#FDFBF7", color: "#1C3F30" },
    }}
  />
);

export const showSuccessToast = (message: string) =>
  toast.custom((t) => (
    <div
      className={`flex items-center gap-2 rounded-control border border-border bg-background px-4 py-3 font-body text-sm text-primary ${
        t.visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <CheckCircle2 className="h-5 w-5 text-secondary-green" />
      {message}
    </div>
  ));

export const showErrorToast = (message: string) =>
  toast.custom((t) => (
    <div
      className={`flex items-center gap-2 rounded-control border border-border bg-background px-4 py-3 font-body text-sm text-primary ${
        t.visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <XCircle className="h-5 w-5 text-accent" />
      {message}
    </div>
  ));