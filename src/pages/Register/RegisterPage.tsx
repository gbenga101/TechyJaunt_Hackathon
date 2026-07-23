import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useSignup } from "@/services/queries/auth.queries";
import { ROUTES } from "@/routes/paths";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";

// Matches SignupPayload in types/auth.ts exactly, which matches the
// confirmed backend /auth/signup example body.
// NOTE: confirmPassword below is a client-side-only UX addition matching
// the approved Register screen mockup — it is NOT part of SignupPayload
// and is never sent to the backend.
const signupSchema = z
  .object({
    fullName: z.string().min(2, "Enter your full name"),
    email: z.string().email("Enter a valid email"),
    phone: z
      .string()
      .min(10, "Enter a valid phone number")
      .regex(/^[0-9+ ]+$/, "Phone number can only contain digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    role: z.enum(["farmer", "trader"], { error: "Select a role" }),
    state: z.string().min(2, "Enter your state"),
    lga: z.string().min(2, "Enter your LGA"),
    otpChannel: z.enum(["email", "voice"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

function RegisterPage() {
  const navigate = useNavigate();
  const { mutate: signup, isPending, error } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { otpChannel: "email" },
  });

  const onSubmit = (values: SignupFormValues) => {
    signup(
      {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        password: values.password,
        role: values.role,
        location: { state: values.state, lga: values.lga },
        otpChannel: values.otpChannel,
      },
      {
        onSuccess: () =>
          navigate(ROUTES.OTP_VERIFY, { state: { email: values.email } }),
      }
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-sm px-screen-x py-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary" />
          <h1 className="font-heading text-2xl font-bold text-primary">Create Account</h1>
          <p className="mt-1 font-body text-sm text-text-muted">
            Join the FarmRoute community to start trading.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Input
            label="Full Name"
            required
            id="fullName"
            autoComplete="fullName"
            placeholder="Enter your full name"
            error={errors.fullName?.message}
            {...register("fullName")}
          />

          <Input
            label="Email"
            required
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="Phone Number"
            required
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Enter your phone number"
            error={errors.phone?.message}
            {...register("phone")}
          />

          <PasswordInput
            label="Password"
            required
            id="password"
            autoComplete="new-password"
            placeholder="Create a password"
            error={errors.password?.message}
            {...register("password")}
          />

          <PasswordInput
            label="Confirm Password"
            required
            id="confirmPassword"
            autoComplete="new-password"
            placeholder="Confirm your password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <div>
            <label htmlFor="role" className="mb-1.5 block font-body text-sm font-medium text-primary">
              I am a<span className="ml-0.5 text-accent">*</span>
            </label>
            <select
              id="role"
              defaultValue=""
              className="h-12 w-full rounded-control border border-border bg-background px-4 font-body text-base text-primary focus-visible:border-focus-ring"
              {...register("role")}
            >
              <option value="" disabled>Select role</option>
              <option value="farmer">Farmer</option>
              <option value="trader">Trader</option>
            </select>
            {errors.role && (
              <p className="mt-1.5 font-body text-sm text-accent" role="alert">
                {errors.role.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="State"
              required
              id="state"
              placeholder="Kano"
              error={errors.state?.message}
              {...register("state")}
            />
            <Input
              label="LGA"
              required
              id="lga"
              placeholder="Kano"
              error={errors.lga?.message}
              {...register("lga")}
            />
          </div>

          <div>
            <span className="mb-1.5 block font-body text-sm font-medium text-primary">
              Send verification code by
            </span>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 font-body text-sm text-primary">
                <input type="radio" value="email" className="accent-accent" {...register("otpChannel")} />
                Email
              </label>
              <label className="flex items-center gap-2 font-body text-sm text-primary">
                <input type="radio" value="voice" className="accent-accent" {...register("otpChannel")} />
                Voice call
              </label>
            </div>
          </div>

          {error && (
            <p role="alert" className="rounded-control border border-accent bg-accent/5 px-3 py-2 font-body text-sm text-accent">
              Sign up failed. Check your details and try again.
            </p>
          )}

          <Button type="submit" isLoading={isPending}>
            {isPending ? "Creating account…" : "Create Account"}
          </Button>
        </form>

        <p className="mt-6 text-center font-body text-sm text-text-muted">
          Already have an account?{" "}
          <Link to={ROUTES.LOGIN} className="font-medium text-accent hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;