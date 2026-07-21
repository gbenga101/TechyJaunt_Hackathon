import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useLogin } from "@/services/queries/auth.queries";
import { ROUTES } from "@/routes/paths";

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
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-600" />
          <h1 className="text-2xl font-semibold text-black">Log in to FarmRoute</h1>
          <p className="mt-1 text-sm text-black/60">
            Enter your phone number and password
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-medium text-black">
              Phone number
            </label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="08012345678"
              className="w-full rounded-md border border-black/20 px-3 py-2 text-black outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-black">
                Password
              </label>
              <Link
                to={ROUTES.FORGOT_PASSWORD}
                className="text-sm text-green-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className="w-full rounded-md border border-black/20 px-3 py-2 text-black outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {error && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
              Login failed. Check your phone number and password and try again.
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-md bg-green-600 px-4 py-2 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Logging in…" : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-black/60">
          Don't have an account?{" "}
          <Link to={ROUTES.REGISTER} className="font-medium text-green-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;