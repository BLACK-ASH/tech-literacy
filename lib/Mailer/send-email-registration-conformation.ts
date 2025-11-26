"use server";

import { ParticipationType } from "../Database/Models/participation.model";
import { sendMail } from "./send-mail";

interface Member {
    name: string;
    email: string;
}


const generateEventConfirmationHtml = async (data: ParticipationType, member: Member) => {
    const { name, eventId, type, members, } = data;

    const teamHtmlList = members
        .map(
            (m) => `
        <div class="member">
          <strong>${m.name}</strong>  
          <div class="email">${m.email}</div>
        </div>
      `
        )
        .join("");
    return `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Event Registration Confirmation</title>

  <style>
    body {
      margin: 0;
      padding: 0;
      background: #fdf2f8; /* rose-50 */
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial;
      color: #111827;
    }

    .container {
      max-width: 640px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 14px;
      border: 1px solid #fce7f3;
      overflow: hidden;
    }

    .header {
      padding: 32px 40px 0 40px;
      text-align: center;
    }

    .header h1 {
      margin: 0;
      font-size: 22px;
      font-weight: 700;
      color: #be123c; /* rose-700 */
    }

    .sub-header {
      margin-top: 6px;
      font-size: 14px;
      color: #9f1239;
    }

    .inner {
      padding: 34px 40px;
    }

    .lead {
      font-size: 17px;
      margin: 0 0 12px 0;
      font-weight: 600;
      color: #1f2937;
    }

    .muted {
      color: #6b7280;
      font-size: 14px;
      line-height: 1.6;
    }

    .event-box {
      background: #fdf2f8;
      padding: 18px;
      border-radius: 10px;
      border: 1px solid #fbcfe8;
      margin-top: 20px;
    }

    .event-item {
      margin-bottom: 8px;
      font-size: 15px;
      color: #374151;
    }

    .members-box {
      margin-top: 18px;
    }

    .member {
      margin-bottom: 10px;
      padding: 10px;
      border: 1px solid #fce7f3;
      border-radius: 8px;
      background: #fff1f2;
    }

    .member .email {
      font-size: 13px;
      color: #6b7280;
      margin-top: 4px;
    }

    .footer {
      padding: 22px 40px;
      background: #fff1f2;
      text-align: center;
      font-size: 13px;
      color: #9f1239;
      border-top: 1px solid #fce7f3;
    }

    @media(max-width: 520px) {
      .inner, .header, .footer {
        padding: 22px;
      }
    }
  </style>
</head>

<body>
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">

        <div class="container">
          <div class="header">
            <h1>Registration Confirmed</h1>
            <div class="sub-header">
              Tech Literacy Day — Ismail Yusuf College
            </div>
          </div>

          <div class="inner">
            <p class="lead">Hello <strong>${member.name}</strong>,</p>

            <p class="muted">
              Your registration for <strong>${name}</strong> has been successfully completed.
            </p>

            <div class="event-box">
              <div class="event-item"><strong>Event:</strong> ${name}</div>
              <div class="event-item"><strong>Event ID:</strong> ${eventId}</div>
              <div class="event-item"><strong>Participation Type:</strong> ${type}</div>
            </div>

            <div class="members-box">
              <h3 style="color:#be123c;margin-bottom:12px;margin-top:24px;">Team Members</h3>
              ${teamHtmlList}
            </div>

            <p class="muted" style="margin-top:22px;">
              If any details are incorrect, contact the event coordinator immediately.
            </p>
          </div>

          <div class="footer">
            © ${new Date().getFullYear()} Tech Literacy Day — Ismail Yusuf College
          </div>
        </div>

      </td>
    </tr>
  </table>
</body>
</html>
`
};

export const sendEventConfirmationMail = async (
    participation: ParticipationType
) => {
    // send mail to each member
    const promises = participation.members.map(async (member) => {
        const html = await generateEventConfirmationHtml(participation, member);
        sendMail({
            to: member.email,
            subject: `Registration Confirmed — ${participation.name}`,
            html,
        })
    }
    );

    await Promise.all(promises);

    return { success: true };
};