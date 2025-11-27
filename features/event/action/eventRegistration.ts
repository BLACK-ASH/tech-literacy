"use server";

import connectDB from "@/lib/Database/connection";
import Participation, { ParticipationType } from "@/lib/Database/Models/participation.model";
import { sendEventConfirmationMail } from "@/lib/Mailer/send-email-registration-conformation";

export const eventRegister = async (data: ParticipationType) => {
  await connectDB();

  try {
    // -------------------------------------
    // 1. Check if any member already registered for the same event
    // -------------------------------------
    const memberEmails = data.members.map(m => m.email);

    const existingMember = await Participation.findOne({
      eventId: data.eventId,
      "members.email": { $in: memberEmails }
    });

    if (existingMember) {
      return {
        status: "error",
        message: "One or more members are already registered for this event."
      };
    }

    // -------------------------------------
    // 2. Create the registration
    // -------------------------------------
    const res = await Participation.create(data);

    // -------------------------------------
    // 3. Send confirmation email
    // -------------------------------------
    sendEventConfirmationMail(data);

    return {
      status: "success",
      message: "Registration successful",
      data: JSON.parse(JSON.stringify(res))
    };

  } catch (e) {
    console.error("Registration error:", e);
    return { status: "error", message: "Registration failed" };
  }
};
