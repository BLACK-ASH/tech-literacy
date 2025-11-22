"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/Auth/auth-client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

const LogoutButton = ({ className }: { className?: string }) => {
  const router = useRouter();
  return (
    <Button
      className={cn("", className)}
      onClick={() => {
        authClient.signOut({
          fetchOptions: {
            onSuccess: (ctx) => {
              router.refresh();
            },
          },
        });
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
