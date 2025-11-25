"use client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { ParticipationType } from "@/lib/Database/Models/participation.model";
import { Event } from "@/lib/eventData";
import MemberSelector from "./MemberSelector";
import { authClient } from "@/lib/Auth/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { eventRegister } from "../action/eventRegistration";

// ----------------- ZOD -----------------
const eventFormSchema = z.object({
  name: z.string().min(2),
  eventId: z.string().min(2),
  type: z.enum(["solo", "team"]),
  members: z.array(
    z.object({
      name: z.string(),
      email: z.string().email(),
    })
  ),
});

// ----------------- COMPONENT -----------------
const EventRegistrationForm = ({ event }: { event: Event }) => {
  const { data: session, isPending, error, refetch } = authClient.useSession();

  const router = useRouter();
  const user = session?.user;
  if (!user && !isPending) {
    toast.error("You must be logged in to register for an event.");
    router.push("/login");
  }

  const form = useForm<ParticipationType>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      name: event.title,
      eventId: event.id,
      type: event.type,
      members: [{ name: user?.name, email: user?.email }],
    },
  });

  // ----------------- SUBMIT -----------------
  const onSubmit = async (data: ParticipationType) => {
    const res = await eventRegister(data);

    if (res.status === "error") {
      toast.error(res.message);
      return;
    }

    if (res.status === "success") {
      toast.success(res.message);
      console.log(res.data);
      
      // router.push("/");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        {/* Event Name */}
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Event</FieldLabel>
              <Input {...field} disabled />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Type */}
        <Controller
          name="type"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Type</FieldLabel>
              <Input {...field} disabled />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <MemberSelector form={form} maxMembers={event?.maxMembers || 1} />
      </FieldGroup>

      <Button disabled={form.formState.isSubmitting} type="submit" className="mt-4">
        {form.formState.isSubmitting ? "Registering..." : "Register"}
      </Button>
    </form>
  );
};

export default EventRegistrationForm;
