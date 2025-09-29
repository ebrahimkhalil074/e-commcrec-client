"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input, Button } from "@heroui/react"; // ✅ HeroUI import

import { useUserRegistration } from "@/src/hooks/auth.hook";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const { mutate, isPending } = useUserRegistration();
  const { register, handleSubmit, reset } = useForm<RegisterForm>();
  const router = useRouter();

  const onSubmit = (data: RegisterForm) => {
    mutate(data);
    reset();
    router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md border border-amber-200">
        <h2 className="mb-6 text-center text-2xl font-bold text-amber-600">
          Create an Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <Input
            id="name"
            label="Name"
            placeholder="Enter your name"
            {...register("name", { required: true })}
            isRequired
            variant="bordered"
          />

          {/* Email */}
          <Input
            id="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
            {...register("email", { required: true })}
            isRequired
            variant="bordered"
          />

          {/* Password */}
          <Input
            id="password"
            label="Password"
            placeholder="Enter password"
            type="password"
            {...register("password", { required: true })}
            isRequired
            variant="bordered"
          />

          {/* Submit Button */}
          <Button
            className="w-full"
            color="warning"
            isDisabled={isPending}
            type="submit"
          >
            {isPending ? "Registering..." : "Register"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            className="text-amber-600 hover:underline font-medium"
            href="/login"
          >
            Please Login
          </Link>
        </p>
      </div>
    </div>
  );
}
