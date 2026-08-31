import { notFound } from "next/navigation";
import { render } from "@react-email/components";
import InquiryNotificationEmail from "@/emails/inquiry-notification";
import InquiryAcknowledgmentEmail from "@/emails/inquiry-acknowledgment";

// Dev-only preview of the transactional emails. Never served in production.
export const dynamic = "force-static";

export default async function EmailPreviewPage() {
  if (process.env.NODE_ENV === "production") notFound();

  const [notification, acknowledgment] = await Promise.all([
    render(
      <InquiryNotificationEmail
        {...InquiryNotificationEmail.PreviewProps}
      />,
    ),
    render(
      <InquiryAcknowledgmentEmail
        {...InquiryAcknowledgmentEmail.PreviewProps}
      />,
    ),
  ]);

  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "#0e0d0b",
        padding: "32px 16px",
        display: "grid",
        gap: "32px",
        gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <Preview title="Owner notification" html={notification} />
      <Preview title="Visitor acknowledgment" html={acknowledgment} />
    </main>
  );
}

function Preview({ title, html }: { title: string; html: string }) {
  return (
    <section>
      <h2
        style={{
          color: "#928c80",
          font: "700 12px/1 ui-sans-serif, system-ui",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          marginBottom: "12px",
        }}
      >
        {title}
      </h2>
      <iframe
        title={title}
        srcDoc={html}
        style={{
          width: "100%",
          height: "760px",
          border: "1px solid #26241d",
          borderRadius: "12px",
          background: "#0e0d0b",
        }}
      />
    </section>
  );
}
