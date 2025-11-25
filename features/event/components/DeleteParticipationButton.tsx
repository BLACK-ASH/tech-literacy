"use client";
import { Button } from "@/components/ui/button";
import { ParticipationType } from "@/lib/Database/Models/participation.model";
import { Trash2Icon } from "lucide-react";
import { cancelParticipation } from "../action/cancelParticipation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const DeleteParticipationButton = ({
  participation,
  className,
}: {
  participation: ParticipationType;
  className?: string;
}) => {
  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={className} variant={"ghost"}>
          <Trash2Icon className="text-destructive" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            <span className="text-destructive"> Paritcipation</span> and remove
            your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              const res = await cancelParticipation(participation);
              if (res) {
                toast.success("Participation canceled");
                router.refresh();
              } else {
                toast.error("Failed to cancel participation");
              }
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteParticipationButton;
