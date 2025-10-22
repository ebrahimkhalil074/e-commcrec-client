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
      if (redirect) router.push(redirect);
      else router.push("/");
    }
  }, [isPending, isSuccess]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100  dark:bg-gray-900 transition-colors ">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-800 border border-amber-200 dark:border-gray-700 p-8 shadow-lg shadow-amber-100/40 dark:shadow-amber-900/20 transition-all">
        {/* Header */}
        <h2 className="mb-6 text-center text-3xl font-bold text-amber-600 dark:text-amber-400 tracking-wide">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-8">
          Please login to continue your journey
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <Input
              label="Email"
              type="email"
              {...register("email", { required: true })}
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent focus:border-amber-500 focus:ring focus:ring-amber-300/30"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <Input
              label="Password"
              type="password"
              {...register("password", { required: true })}
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent focus:border-amber-500 focus:ring focus:ring-amber-300/30"
              placeholder="Enter password"
            />
          </div>

          {/* Submit Button */}
          <button
            className="w-full rounded-lg bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-500 px-4 py-2 text-white font-semibold shadow-md transition-colors duration-300 disabled:opacity-50"
            disabled={isPending}
            type="submit"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-gray-700 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link
            className="text-amber-600 dark:text-amber-400 hover:underline font-medium transition-colors"
            href="/register"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
