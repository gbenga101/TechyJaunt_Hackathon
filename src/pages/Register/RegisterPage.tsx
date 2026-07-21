import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useSignup } from "@/services/queries/auth.queries";
import { ROUTES } from "@/routes/paths";

// Matches SignupPayload in types/auth.ts exactly, which matches the
// confirmed backend /auth/signup example body.
const signupSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .regex(/^[0-9+ ]+$/, "Phone number can only contain digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["farmer", "trader"], {
    error: "Select a role",
  }),
  state: z.string().min(2, "Enter your state"),
  lga: z.string().min(2, "Enter your LGA"),
  otpChannel: z.enum(["email", "voice"]),
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
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        role: values.role,
        location: { state: values.state, lga: values.lga },
        otpChannel: values.otpChannel,
      },
      {
        // verify-register-otp is keyed by email, so it travels forward
        // via navigation state to the OTP screen.
        onSuccess: () =>
          navigate(ROUTES.OTP_VERIFY, { state: { email: values.email } }),
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-600" />
          <h1 className="text-2xl font-semibold text-black">Create your account</h1>
          <p className="mt-1 text-sm text-black/60">Join FarmRoute as a farmer or trader</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-black">
              Full name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              className="w-full rounded-md border border-black/20 px-3 py-2 text-black outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              {...register("name")}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-black">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="w-full rounded-md border border-black/20 px-3 py-2 text-black outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              {...register("email")}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

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
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-black">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              className="w-full rounded-md border border-black/20 px-3 py-2 text-black outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="role" className="mb-1 block text-sm font-medium text-black">
              I am a
            </label>
            <select
              id="role"
              defaultValue=""
              className="w-full rounded-md border border-black/20 bg-white px-3 py-2 text-black outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              {...register("role")}
            >
              <option value="" disabled>
                Select role
              </option>
              <option value="farmer">Farmer</option>
              <option value="trader">Trader</option>
            </select>
            {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="state" className="mb-1 block text-sm font-medium text-black">
                State
              </label>
              <input
                id="state"
                type="text"
                placeholder="Kano"
                className="w-full rounded-md border border-black/20 px-3 py-2 text-black outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                {...register("state")}
              />
              {errors.state && (
                <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="lga" className="mb-1 block text-sm font-medium text-black">
                LGA
              </label>
              <input
                id="lga"
                type="text"
                placeholder="Kano"
                className="w-full rounded-md border border-black/20 px-3 py-2 text-black outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                {...register("lga")}
              />
              {errors.lga && <p className="mt-1 text-sm text-red-600">{errors.lga.message}</p>}
            </div>
          </div>

          <div>
            <span className="mb-1 block text-sm font-medium text-black">
              Send verification code by
            </span>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm text-black">
                <input type="radio" value="email" {...register("otpChannel")} />
                Email
              </label>
              <label className="flex items-center gap-2 text-sm text-black">
                <input type="radio" value="voice" {...register("otpChannel")} />
                Voice call
              </label>
            </div>
          </div>

          {error && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
              Sign up failed. Check your details and try again.
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-md bg-green-600 px-4 py-2 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-black/60">
          Already have an account?{" "}
          <Link to={ROUTES.LOGIN} className="font-medium text-green-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;