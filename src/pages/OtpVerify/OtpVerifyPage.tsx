import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useVerifyRegisterOtp } from "@/services/queries/auth.queries";
import { ROUTES } from "@/routes/paths";

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
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
  });

  // No email in nav state (e.g. direct visit or page refresh) — there's
  // nothing to verify against, so send them back to sign up rather than
  // show a broken form.
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
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-600" />
          <h1 className="text-2xl font-semibold text-black">Verify your email</h1>
          <p className="mt-1 text-sm text-black/60">
            Enter the 6-digit code sent to <span className="font-medium">{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <label htmlFor="token" className="mb-1 block text-sm font-medium text-black">
              Verification code
            </label>
            <input
              id="token"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder="123456"
              className="w-full rounded-md border border-black/20 px-3 py-2 text-center text-lg tracking-[0.5em] text-black outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              {...register("token")}
            />
            {errors.token && (
              <p className="mt-1 text-sm text-red-600">{errors.token.message}</p>
            )}
          </div>

          {error && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
              Verification failed. Check the code and try again.
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-md bg-green-600 px-4 py-2 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Verifying…" : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default OtpVerifyPage;