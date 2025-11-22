//import the auth client

import { useRouter } from "next/navigation";
import { authClient } from "./auth-client";
import { toast } from "sonner";

const emailAndPasswordSignUp = async (
  email: string,
  password: string,
  name: string,
  router: ReturnType<typeof useRouter>,
) => {
  await authClient.signUp.email(
    {
      email, // user email address
      password, // user password -> min 8 characters by default
      name, // user display name
    },
    {
      onRequest: (ctx) => {
        //show loading
      },
      onSuccess: (ctx) => {
        //redirect to the dashboard or sign in page
        toast.success("Registration successful");
        router.push("/login/verify-email");
      },
      onError: (ctx) => {
        // display the error message
        toast.error(ctx.error.message);
      },
    },
  );
};

const signUpWithGoogle = async () => {
  await authClient.signIn.social({
    provider: "google",
  });
};

export { emailAndPasswordSignUp, signUpWithGoogle };
