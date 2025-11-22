"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";

const Page = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

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
    // Add your resend email logic here
    setCanResend(false);
    setTimeLeft(60);
  };
  return (
    <section className="container mx-auto  min-h-[calc(100vh-150px)] pt-8 scroll-mt-28 p-2">
      <Card className="max-w-2xl mx-auto px-2">
        <CardHeader>
          <CardTitle>Verify your email</CardTitle>
          <CardDescription>
            A verification email has been sent to you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleResend}
            disabled={!canResend}
            className="w-full sm:w-auto"
          >
            {canResend ? "Resend Verification Email" : `Resend in ${timeLeft}s`}
          </Button>
        </CardContent>
        <CardFooter>
          {!canResend && (
            <p className="text-sm text-muted-foreground">
              Please wait for {timeLeft}s before resending.
            </p>
          )}
        </CardFooter>
      </Card>
    </section>
  );
};

export default Page;
