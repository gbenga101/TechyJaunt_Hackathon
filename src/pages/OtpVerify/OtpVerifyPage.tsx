import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useVerifyRegisterOtp } from "@/services/queries/auth.queries";
import { ROUTES } from "@/routes/paths";
import { Button } from "@/components/ui/Button";
import { OTPInput } from "@/components/ui/OTPInput";
import { TopAppBar } from "@/components/ui/TopAppBar";

const otpSchema = z.object({
  token: z
    .string()
    .length(6, "Enter the 6-digit code")
    .regex(/^[0-9]+$/, "Code must be numbers only"),
});

type OtpFormValues = z.infer<typeof otpSchema>;

interface LocationState {
  email?: string;
}

function OtpVerifyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as LocationState | null)?.email;

  const { mutate: verifyOtp, isPending, error } = useVerifyRegisterOtp();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { token: "" },
  });

  useEffect(() => {
    if (!email) {
      navigate(ROUTES.REGISTER, { replace: true });
    }
  }, [email, navigate]);

  if (!email) {
    return null;
  }

  const onSubmit = (values: OtpFormValues) => {
    verifyOtp(
      { email, token: values.token },
      { onSuccess: () => navigate(ROUTES.DASHBOARD) }
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <TopAppBar title="FarmRoute" onBack={() => navigate(ROUTES.REGISTER)} />

      <div className="mx-auto w-full max-w-sm px-screen-x py-8">
        <h1 className="font-heading text-2xl font-bold text-primary">Verify your email</h1>
        <p className="mt-2 font-body text-sm text-text-muted">
          Enter the 6-digit code sent to <span className="font-medium text-primary">{email}</span>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
          <Controller
            name="token"
            control={control}
            render={({ field }) => (
              <OTPInput
                value={field.value}
                onChange={field.onChange}
                onComplete={field.onChange}
              />
            )}
          />
          {errors.token && (
            <p role="alert" className="font-body text-sm text-accent">
              {errors.token.message}
            </p>
          )}

          {error && (
            <p role="alert" className="rounded-control border border-accent bg-accent/5 px-3 py-2 font-body text-sm text-accent">
              Verification failed. Check the code and try again.
            </p>
          )}

          <Button type="submit" isLoading={isPending}>
            {isPending ? "Verifying…" : "Verify"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default OtpVerifyPage;