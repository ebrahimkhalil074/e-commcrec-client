"use client";


import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useUserRegistration } from "@/src/hooks/auth.hook";
import Link from "next/link";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
 
}

export default function RegisterPage() {
    const {mutate,isPending} =useUserRegistration()
const { register, handleSubmit, reset } = useForm<RegisterForm>();
const router = useRouter();

const onSubmit = async (data: RegisterForm) => {
mutate(data)

    reset();
    router.push("/");

  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md border border-amber-200">
        <h2 className="mb-6 text-center text-2xl font-bold text-amber-600">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:ring focus:ring-amber-200"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:ring focus:ring-amber-200"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:ring focus:ring-amber-200"
              placeholder="Enter password"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-amber-500 px-4 py-2 text-white font-semibold shadow hover:bg-amber-600 disabled:opacity-50 transition-colors"
          >
            {isPending ? "Registering..." : "Register"}
          </button>
        </form>
         <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-amber-600 hover:underline font-medium"
          >
            Please Login
          </Link>
        </p>
      </div>
     
    </div>
  );
}
