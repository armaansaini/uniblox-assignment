"use client";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "../action";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="flex flex-col px-6 py-4 border rounded-lg shadow-lg w-[30%]">
        <div className="text-xl self-center">Login</div>

        <form action={loginAction}>
          <div className="flex justify-between my-5">
            <label htmlFor="email">Email</label>
            <Input id="email" name="email" type="email" className="w-[300px]" />
          </div>

          <div className="flex justify-between gap-x-4 mb-5">
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              name="password"
              type="password"
              className="w-[300px]"
            />
          </div>

          {state?.errors?.email && (
            <p className="text-red-500 my-2">{state.errors.email}</p>
          )}

          <SubmitButton />
        </form>
      </div>
    </div>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      Login
    </Button>
  );
};
