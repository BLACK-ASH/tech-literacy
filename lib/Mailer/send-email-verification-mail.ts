import type { User } from "../Auth/auth-client";
import { sendMail } from "./send-mail";

type UserMail = Partial<User>;

const generateHtml = async (user: UserMail, url: string, token: string) => {
  return `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Verify your email</title>

  <style>
    body {
      margin: 0;
      padding: 0;
      background: #fdf2f8; /* shadcn rose-50 */
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial;
      color: #111827;
    }

    .container {
      max-width: 640px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 14px;
      border: 1px solid #fce7f3; /* rose-100 border */
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
      letter-spacing: -0.02em;
    }

    .sub-header {
      margin-top: 6px;
      font-size: 14px;
      color: #9f1239; /* rose-800 */
    }

    .inner {
      padding: 34px 40px;
    }

    .lead {
      font-size: 16px;
      line-height: 1.6;
      margin: 0 0 16px 0;
      color: #1f2937;
    }

    .muted {
      color: #6b7280;
      font-size: 14px;
      line-height: 1.6;
    }

    .btn-wrap {
      margin: 28px 0;
      text-align: center;
    }

    .cta {
      display: inline-block;
      background: #e11d48; /* rose-600 */
      color: #ffffff !important;
      text-decoration: none;
      padding: 12px 22px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 15px;
    }

    .cta:hover {
      background: #be123c; /* rose-700 */
    }

    .token {
      display: inline-block;
      background: #fdf2f8; /* rose-50 */
      padding: 10px 12px;
      border-radius: 8px;
      font-family: monospace;
      font-size: 13px;
      color: #111827;
      word-break: break-all;
      margin-top: 6px;
      border: 1px solid #fbcfe8; /* rose-200 */
    }

    .footer {
      padding: 22px 40px;
      background: #fff1f2; /* rose-50 slightly darker */
      text-align: center;
      font-size: 13px;
      color: #9f1239;
      border-top: 1px solid #fce7f3;
    }

    a.link {
      word-break: break-all;
      color: #e11d48; /* rose-600 */
      text-decoration: none;
    }

    @media (max-width: 520px) {
      .inner,
      .header,
      .footer {
        padding: 22px;
      }
      .cta {
        width: 100%;
        padding: 14px;
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
            <h1>Tech Literacy Day</h1>
            <div class="sub-header">
              2 December 2025 • Organized by CS Dept, Ismail Yusuf College
            </div>
          </div>

          <div class="inner">
            <p class="lead">Hi <strong>${user.name}</strong>,</p>

            <p class="muted">
              Thank you for registering for <strong>Tech Literacy Day 2025</strong>.  
              Please verify your email address to complete your registration.
            </p>

            <div class="btn-wrap">
              <a href="${url}" class="cta" target="_blank" rel="noopener noreferrer">
                Verify Email
              </a>
            </div>

            <p class="muted">If the button doesn’t work, use this link:</p>

            <p class="token">
              <a href="${url}" class="link">${url}</a>
            </p>

            <p class="muted" style="margin-top:20px;">
              If you didn't request this, you can safely ignore the message.
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
`;
};


export const sendEmailVerificationMail = async ({
  user,
  url,
  token,
}: {
  user: UserMail;
  url: string;
  token: string;
}) => {
  await sendMail({
    to: user.email as string,
    subject: "Verify your LitLearn account",
    html: await generateHtml(user, url, token),
  });
};
