"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Input } from "@heroui/input";

import { useUserLogin } from "@/src/hooks/auth.hook";
import { useUser } from "@/src/context/User.context";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const searchParams = useSearchParams();
  const { setIsLoading } = useUser();
  const { mutate, isPending, isSuccess } = useUserLogin();
  const { register, handleSubmit } = useForm<LoginForm>();

  const router = useRouter();
  const redirect = searchParams.get("redirect");
  const onSubmit = async (data: LoginForm) => {
    mutate(data);

    setIsLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md border border-amber-200">
        <h2 className="mb-6 text-center text-2xl font-bold text-amber-600">
          Welcome Back
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <Input
              label="Email"
              type="email"
              {...register("email", { required: true })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:ring focus:ring-amber-200"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <Input
              label="Password"
              type="password"
              {...register("password", { required: true })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:ring focus:ring-amber-200"
              placeholder="Enter password"
            />
          </div>

          {/* Submit */}
          <button
            className="w-full rounded-lg bg-amber-500 px-4 py-2 text-white font-semibold shadow hover:bg-amber-600 disabled:opacity-50 transition-colors"
            disabled={isPending}
            type="submit"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Link to register */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            className="text-amber-600 hover:underline font-medium"
            href="/register"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
