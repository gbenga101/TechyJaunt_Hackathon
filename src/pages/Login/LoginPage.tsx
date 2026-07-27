import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import FarmrouteLogo from "@/assets/Farmroute logo-noBG.png";
import { useLogin } from "@/services/queries/auth.queries";
import { ROUTES } from "@/routes/paths";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";

const loginSchema = z.object({
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .regex(/^[0-9+ ]+$/, "Phone number can only contain digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginPage() {
  const navigate = useNavigate();
  const { mutate: login, isPending, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (values: LoginFormValues) => {
    login(values, {
      onSuccess: () => navigate(ROUTES.DASHBOARD),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-screen-x">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <img
            src={FarmrouteLogo}
            alt="FarmRoute logo"
            className="mx-auto mb-4 h-16 w-16 object-contain"
          />
          <h1 className="font-heading text-2xl font-bold text-primary">
            Log in to FarmRoute
          </h1>
          <p className="mt-1 font-body text-sm text-text-muted">
            Enter your phone number and password
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Input
            label="Phone number"
            required
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="08012345678"
            error={errors.phone?.message}
            {...register("phone")}
          />

          <div>
            <PasswordInput
              label="Password"
              required
              id="password"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register("password")}
            />
            <div className="mt-1.5 text-right">
              <Link
                to={ROUTES.FORGOT_PASSWORD}
                className="font-body text-sm text-accent hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-control border border-accent bg-accent/5 px-3 py-2 font-body text-sm text-accent"
            >
              {error instanceof Error ? error.message : "Login failed. Check your phone number and password and try again."}
            </p>
          )}

          <Button type="submit" isLoading={isPending}>
            {isPending ? "Logging in…" : "Log in"}
          </Button>
        </form>

        <p className="mt-6 text-center font-body text-sm text-text-muted">
          Don't have an account?{" "}
          <Link to={ROUTES.REGISTER} className="font-medium text-accent hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;