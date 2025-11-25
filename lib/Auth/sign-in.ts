import { type useRouter } from "next/navigation";
import { authClient } from "./auth-client";
import { toast } from "sonner";

const emailAndPasswordSignIn = async (
  email: string,
  password: string,
  router: ReturnType<typeof useRouter>,
) => {
  await authClient.signIn.email(
    {
      /**
       * The user email
       */
      email,
      /**
       * The user password
       */
      password,
      /**
       * A URL to redirect to after the user verifies their email (optional)
       */
      callbackURL: "/",
      /**
       * remember the user session after the browser is closed.
       * @default true
       */
      rememberMe: false,
    },
    {
      //callbacks
      onSuccess: (ctx) => {
        //redirect to the dashboard or sign in page

        toast.success("Login successful");
        router.push("/");
      },
      onError: async (ctx) => {
        // display the error message

        // Handle the error
        if (ctx.error.status === 403) {
          await authClient.sendVerificationEmail({ email, callbackURL: "/" });
          toast.error("Please verify your email address");
          router.push("/login/verify-email?email=" + email);
          return;
        }
        toast.error(ctx.error.message);
      },
    },
  );
};

export { emailAndPasswordSignIn };
