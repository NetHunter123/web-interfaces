import React from "react";
import signinImage from "@/assets/brooke-lark.jpg";
import Image from "next/image";
import SignInForm from "@/app/(auth)/login/SignInForm";

export const metadata = {
  title: "Sign In",
};

const LoginPage = () => {
  return (
    <main className={"flex h-screen items-center justify-center p-5"}>
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <Image
          src={signinImage}
          alt="Decor photo"
          className="hidden w-1/2 rounded-2xl object-cover md:block"
        />
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <div className="space-y-1 text-center">
            <h1 className={"text-3xl font-bold text-primary"}>Авторизація</h1>
            <p className={"text-muted-foreground"}>
              Це місце де ви побачите свою{" "}
              <span className={"font-bold italic text-primary"}>статистику</span>{" "}
              електроспоживання
            </p>
          </div>
          <div className="space-y-7">
            <SignInForm />
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
