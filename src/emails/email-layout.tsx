import * as React from "react";
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { colors, fontFamily, site } from "./theme";

/** Shared dark-editorial shell: wordmark header, framed card, footer. */
export function EmailLayout({
  preview,
  children,
}: {
  preview: string;
  children: React.ReactNode;
}) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Text style={wordmark}>{site.name.toUpperCase()}</Text>
          </Section>

          <Section style={card}>{children}</Section>

          <Hr style={rule} />
          <Text style={footer}>
            {site.name} · {site.role}
          </Text>
          <Text style={footerFaint}>
            Sent from portfolio.lanceamiel.site. You can just reply to this
            email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const body: React.CSSProperties = {
  backgroundColor: colors.bg,
  color: colors.text,
  fontFamily,
  margin: 0,
  padding: "32px 12px",
};

const container: React.CSSProperties = {
  width: "100%",
  maxWidth: "580px",
  margin: "0 auto",
};

const header: React.CSSProperties = {
  padding: "0 4px 20px",
};

const wordmark: React.CSSProperties = {
  margin: 0,
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.18em",
  color: colors.muted,
};

const card: React.CSSProperties = {
  backgroundColor: colors.card,
  border: `1px solid ${colors.border}`,
  borderRadius: "18px",
  padding: "36px 32px",
};

const rule: React.CSSProperties = {
  borderColor: colors.border,
  margin: "28px 4px 16px",
};

const footer: React.CSSProperties = {
  margin: "0 4px",
  fontSize: "13px",
  color: colors.muted,
};

const footerFaint: React.CSSProperties = {
  margin: "6px 4px 0",
  fontSize: "12px",
  color: colors.faint,
};
