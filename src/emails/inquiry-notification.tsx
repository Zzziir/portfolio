import * as React from "react";
import { Button, Section, Text } from "@react-email/components";
import { EmailLayout } from "./email-layout";
import { colors, fontFamily } from "./theme";

export interface InquiryNotificationProps {
  name: string;
  email: string;
  message: string;
  receivedAt: Date;
}

/** Sent to Lance when a visitor submits the contact form. Built to be scanned. */
export function InquiryNotificationEmail({
  name,
  email,
  message,
  receivedAt,
}: InquiryNotificationProps) {
  const when = formatManila(receivedAt);

  return (
    <EmailLayout preview={`New inquiry from ${name}: ${clamp(message, 90)}`}>
      <Text style={eyebrow}>NEW INQUIRY</Text>
      <Text style={heading}>{name}</Text>

      <Text style={meta}>
        <a href={`mailto:${email}`} style={metaLink}>
          {email}
        </a>
        &nbsp;&nbsp;·&nbsp;&nbsp;{when}
      </Text>

      <Section style={quote}>
        <Text style={quoteText}>{message}</Text>
      </Section>

      <Button href={`mailto:${email}`} style={button}>
        Reply to {name.split(" ")[0]}
      </Button>
    </EmailLayout>
  );
}

InquiryNotificationEmail.PreviewProps = {
  name: "Maria Santos",
  email: "maria@acme.com",
  message:
    "We're a Series A fintech and our onboarding drops 40% of users at the KYC step. Looking for someone who can both redesign the flow and ship it. Are you available for a 6-week engagement starting September?",
  receivedAt: new Date(),
} satisfies InquiryNotificationProps;

export default InquiryNotificationEmail;

function formatManila(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function clamp(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
}

const eyebrow: React.CSSProperties = {
  margin: 0,
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.16em",
  color: colors.brand,
};

const heading: React.CSSProperties = {
  margin: "10px 0 0",
  fontSize: "30px",
  lineHeight: 1.1,
  fontWeight: 800,
  letterSpacing: "-0.02em",
  color: colors.text,
};

const meta: React.CSSProperties = {
  margin: "8px 0 24px",
  fontSize: "14px",
  color: colors.muted,
};

const metaLink: React.CSSProperties = {
  color: colors.text,
  textDecoration: "none",
  fontWeight: 500,
};

const quote: React.CSSProperties = {
  backgroundColor: colors.panel,
  border: `1px solid ${colors.border}`,
  borderRadius: "12px",
  padding: "16px 18px",
  margin: "0 0 28px",
};

const quoteText: React.CSSProperties = {
  margin: 0,
  fontSize: "15px",
  lineHeight: 1.65,
  color: colors.text,
  whiteSpace: "pre-wrap",
  fontFamily,
};

const button: React.CSSProperties = {
  backgroundColor: colors.text,
  color: colors.bg,
  fontSize: "14px",
  fontWeight: 600,
  borderRadius: "10px",
  padding: "12px 22px",
  textDecoration: "none",
};
