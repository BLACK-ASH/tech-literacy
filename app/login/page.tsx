"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/features/login/components/LoginForm";
import { RegisterForm } from "@/features/login/components/RegisterForm";
import { authClient } from "@/lib/Auth/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const Page = () => {
  const { data: session, isPending, error, refetch } = authClient.useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      //redirect to the dashboard or sign in page
      toast.success("You are already logged in.");
      router.push("/");
    }
  }, [session, router]);

  return (
    <Tabs
      defaultValue="login"
      className="max-w-[500px] min-h-[calc(100vh-165px)] pt-32 mt-16 p-2 mx-auto"
    >
      <TabsList>
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <LoginForm />
      </TabsContent>
      <TabsContent value="register">
        <RegisterForm />
      </TabsContent>
    </Tabs>
  );
};

export default Page;
