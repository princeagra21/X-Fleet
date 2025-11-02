import { PrismaClient } from '../../generated/prisma-primary';
const prisma = new PrismaClient();

type Row = {
  type: string;
  title: string;
  slug?: string;
  language_code: string;
  email_subject: string;
  message: string;
};

const DATA: Row[] = [
  // ===== Auth / User Lifecycle =====
  {
    type: "USER_CREATION",
    title: "User Creation (Welcome)",
    language_code: "en",
    email_subject: "Welcome to {app_name} — Your account is ready",
    message: `Hi {name},

Your {app_name} account for {company_name} has been created by {created_by}.
Set your password using the link below:

Set password: {set_password_link}

Login: {login_link}
Username: {email}

If this wasn’t you, contact {support_email}.

— {app_name} Team`,
  },
  {
    type: "VERIFY_EMAIL",
    title: "Verify Email",
    language_code: "en",
    email_subject: "Verify your email to activate your {app_name} account",
    message: `Hi {name},

Please verify your email address to activate your {app_name} account.

Verify now: {verify_link}

If you didn’t request this, ignore this email or contact {support_email}.`,
  },
  {
    type: "FORGOT_PASSWORD",
    title: "Forgot Password (Reset Link)",
    language_code: "en",
    email_subject: "Reset your {app_name} password",
    message: `Hi {name},

We received a request to reset your {app_name} password.

Reset password: {reset_link}

If you didn’t request this, you can safely ignore this email.`,
  },
  {
    type: "PASSWORD_RESET_SUCCESS",
    title: "Password Reset Success",
    language_code: "en",
    email_subject: "Your {app_name} password was changed",
    message: `Hi {name},

This is a confirmation that your {app_name} password was changed successfully.
If you didn’t do this, contact {support_email} immediately.`,
  },
  {
    type: "LOGIN_OTP",
    title: "Login OTP / Magic Code",
    language_code: "en",
    email_subject: "Your {app_name} login code: {otp}",
    message: `Hi {name},

Use this one-time code to complete your login: {otp}

Time: {login_time}
IP: {ip}
Device: {device}

This code expires soon. If this wasn’t you, please secure your account.`,
  },

  // ===== Vehicle & Driver Ops =====
  {
    type: "VEHICLE_ASSIGNED",
    title: "Vehicle Assigned to User",
    language_code: "en",
    email_subject: "{vehicle_name} ({vehicle_reg}) assigned to you",
    message: `Hi {name},

The vehicle {vehicle_name} ({vehicle_reg}) has been assigned to your account by {assigned_by}.
Group: {group_name}

Open Dashboard: {dashboard_url}

— {app_name} Fleet`,
  },
  {
    type: "VEHICLE_UNASSIGNED",
    title: "Vehicle Unassigned from User",
    language_code: "en",
    email_subject: "{vehicle_name} ({vehicle_reg}) unassigned from your account",
    message: `Hi {name},

The vehicle {vehicle_name} ({vehicle_reg}) has been unassigned from your account.
Reason (if any): {unassign_reason}

Open Dashboard: {dashboard_url}`,
  },
  {
    type: "DRIVER_ASSIGNED",
    title: "Driver Assigned to Vehicle",
    language_code: "en",
    email_subject: "{driver_name} assigned to {vehicle_name} ({vehicle_reg})",
    message: `Hello,

Driver {driver_name} has been assigned to vehicle {vehicle_name} ({vehicle_reg}).
Shift: {shift_from} → {shift_to}

View assignment: {dashboard_url}`,
  },

  // ===== Compliance / Risk =====
  {
    type: "DOCUMENT_EXPIRY_WARNING",
    title: "Document Expiry Warning",
    language_code: "en",
    email_subject: "{document_name} expires in {days_left} days — {vehicle_name} ({vehicle_reg})",
    message: `Heads up {name},

The document "{document_name}" for {vehicle_name} ({vehicle_reg}) will expire on {expiry_date} ({days_left} days left).

Renew now: {dashboard_url}

Please update the document to avoid penalties and downtime.`,
  },
  {
    type: "DEVICE_OFFLINE_ALERT",
    title: "Device Offline Alert",
    language_code: "en",
    email_subject: "{device_name} is offline — last seen {last_seen}",
    message: `Alert,

The tracking device for {vehicle_name} ({vehicle_reg}) is offline.
IMEI: {imei}
Last seen: {last_seen}
Offline for: {offline_for}

Troubleshoot: {dashboard_url}`,
  },
];

export async function seedEmailTemplates(client: PrismaClient) {
  await client.emailTemplate.createMany({
    data: DATA.map((r) => ({
      type: r.type,
      title: r.title,
      slug: r.slug ?? `${r.type.toLowerCase()}-${r.language_code}`,
      languageCode: r.language_code,
      emailSubject: r.email_subject,
      message: r.message,
      isActive: true,
    })),
    skipDuplicates: true, // requires @unique on slug
  });
  console.log(`✅ Email templates seeded: ${DATA.length}`);
}

/** Run standalone */
if (require.main === module) {
  seedEmailTemplates(prisma)
    .catch((e) => {
      console.error("❌ Seeding failed:", e);
      process.exitCode = 1;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}