"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/Auth/auth-client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();   // allowed here
  const router = useRouter();

  const email = searchParams.get("email");

  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Redirect in an effect (never in render)
  useEffect(() => {
    if (!email) router.push("/login");
  }, [email, router]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleResend = () => {
    authClient.sendVerificationEmail({ email: email as string });
    setCanResend(false);
    setTimeLeft(60);
  };

  return (
    <Card className="max-w-2xl mx-auto px-2">
      <CardHeader>
        <CardTitle>Verify your email</CardTitle>
        <CardDescription>A verification email has been sent to you.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleResend} disabled={!canResend} className="w-full sm:w-auto">
          {canResend ? "Resend Verification Email" : `Resend in ${timeLeft}s`}
        </Button>
      </CardContent>
      <CardFooter>
        {!canResend && (
          <p className="text-sm text-muted-foreground">
            Please wait {timeLeft}s before resending.
          </p>
        )}
      </CardFooter>
    </Card>
  );
}

export default function Page() {
  return (
    <section className="container mx-auto min-h-[calc(100vh-150px)] pt-8 scroll-mt-28 p-2">
      <Suspense fallback="Loading...">
        <VerifyEmailContent />
      </Suspense>
    </section>
  );
}
