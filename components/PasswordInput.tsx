"use client";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Eye, EyeOffIcon } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

const PasswordInput = ({
  className,
  ...props
}: React.ComponentProps<"input">) => {
  const [visible, setVisible] = useState(false);

  const handleVisible = () => {
    setVisible((prev) => !prev);
  };

  return (
    <InputGroup className={cn(className)}>
      <InputGroupInput
        {...props}
        type={visible ? "text" : "password"}
        placeholder="Password"
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton onClick={() => handleVisible()}>
          <span className="sr-only">Show password</span>
          {visible ? (
            <Eye className="text-muted-foreground" />
          ) : (
            <EyeOffIcon className="text-muted-foreground" />
          )}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
};

export default PasswordInput;
