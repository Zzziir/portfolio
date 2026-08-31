import * as React from "react";
import { Link, Section, Text } from "@react-email/components";
import { EmailLayout } from "./email-layout";
import { colors, fontFamily, site } from "./theme";

export interface InquiryAcknowledgmentProps {
  name: string;
  message: string;
}

/** Auto-reply to the visitor, so they know the message landed. On-brand, warm. */
export function InquiryAcknowledgmentEmail({
  name,
  message,
}: InquiryAcknowledgmentProps) {
  const firstName = name.split(" ")[0];

  return (
    <EmailLayout
      preview={`Thanks ${firstName}, I got your message and ${site.replyWithin.toLowerCase()}`}
    >
      <Text style={eyebrow}>MESSAGE RECEIVED</Text>
      <Text style={heading}>Thanks, {firstName}.</Text>

      <Text style={body}>
        Your message reached me, this is just a note so you know it landed and
        didn&rsquo;t vanish into a form. {site.replyWithin}
      </Text>

      <Text style={label}>What you sent</Text>
      <Section style={quote}>
        <Text style={quoteText}>{message}</Text>
      </Section>

      <Text style={body}>
        While you wait, the case studies walk through how I take a problem from
        the fuzzy middle to running software.
      </Text>

      <Link href={`${site.url}/#work`} style={cta}>
        See the work →
      </Link>

      <Text style={signoff}>
        Talk soon,
        <br />
        <span style={signName}>Lance</span>
      </Text>
    </EmailLayout>
  );
}

InquiryAcknowledgmentEmail.PreviewProps = {
  name: "Maria Santos",
  message:
    "We're a Series A fintech and our onboarding drops 40% of users at the KYC step. Looking for someone who can both redesign the flow and ship it.",
} satisfies InquiryAcknowledgmentProps;

export default InquiryAcknowledgmentEmail;

const eyebrow: React.CSSProperties = {
  margin: 0,
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.16em",
  color: colors.brand,
};

const heading: React.CSSProperties = {
  margin: "10px 0 20px",
  fontSize: "30px",
  lineHeight: 1.1,
  fontWeight: 800,
  letterSpacing: "-0.02em",
  color: colors.text,
};

const body: React.CSSProperties = {
  margin: "0 0 20px",
  fontSize: "15px",
  lineHeight: 1.7,
  color: colors.text,
};

const label: React.CSSProperties = {
  margin: "0 0 8px",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.14em",
  color: colors.muted,
};

const quote: React.CSSProperties = {
  backgroundColor: colors.panel,
  border: `1px solid ${colors.border}`,
  borderRadius: "12px",
  padding: "14px 18px",
  margin: "0 0 24px",
};

const quoteText: React.CSSProperties = {
  margin: 0,
  fontSize: "14px",
  lineHeight: 1.6,
  color: colors.muted,
  whiteSpace: "pre-wrap",
  fontStyle: "italic",
  fontFamily,
};

const cta: React.CSSProperties = {
  display: "inline-block",
  fontSize: "15px",
  fontWeight: 600,
  color: colors.text,
  textDecoration: "underline",
  textUnderlineOffset: "3px",
  marginBottom: "28px",
};

const signoff: React.CSSProperties = {
  margin: "8px 0 0",
  fontSize: "15px",
  lineHeight: 1.6,
  color: colors.text,
};

const signName: React.CSSProperties = {
  fontWeight: 700,
};
