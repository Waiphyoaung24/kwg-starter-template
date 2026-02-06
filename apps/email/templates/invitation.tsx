import { Button, Heading, Section, Text } from "@react-email/components";
import { BaseTemplate, colors } from "../components/BaseTemplate";

interface InvitationProps {
  invitedByEmail: string;
  invitedByName?: string;
  organizationName: string;
  inviteUrl: string;
  role: string;
  appName?: string;
  appUrl?: string;
}

export function Invitation({
  invitedByEmail,
  invitedByName,
  organizationName,
  inviteUrl,
  role,
  appName,
  appUrl,
}: InvitationProps) {
  const preview = `You've been invited to join ${organizationName} on ${appName || "NexusPoint"}`;
  const inviterText = invitedByName
    ? `${invitedByName} (${invitedByEmail})`
    : invitedByEmail;

  return (
    <BaseTemplate preview={preview} appName={appName} appUrl={appUrl}>
      <Heading style={heading}>Join {organizationName}</Heading>

      <Text style={paragraph}>Hello,</Text>

      <Text style={paragraph}>
        <strong>{inviterText}</strong> has invited you to join the organization{" "}
        <strong>{organizationName}</strong> as a <strong>{role}</strong> on{" "}
        {appName || "NexusPoint"}.
      </Text>

      <Section style={buttonContainer}>
        <Button href={inviteUrl} style={button}>
          Accept Invitation
        </Button>
      </Section>

      <Text style={paragraph}>
        Or copy and paste this URL into your browser:
      </Text>

      <Text style={linkText}>{inviteUrl}</Text>

      <Text style={paragraph}>
        <strong>This invitation will expire in 7 days.</strong>
      </Text>

      <Text style={paragraph}>
        If you were not expecting this invitation, you can safely ignore this
        email.
      </Text>
    </BaseTemplate>
  );
}

const heading = {
  fontSize: "24px",
  fontWeight: "600",
  color: colors.text,
  margin: "0 0 24px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  color: colors.textMuted,
  margin: "0 0 16px",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: colors.primary,
  borderRadius: "6px",
  color: colors.white,
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
  lineHeight: "20px",
};

const linkText = {
  fontSize: "14px",
  color: colors.textLight,
  wordBreak: "break-all" as const,
  margin: "0 0 16px",
  padding: "12px",
  backgroundColor: "#f8f9fa",
  borderRadius: "4px",
  border: "1px solid #e9ecef",
};
