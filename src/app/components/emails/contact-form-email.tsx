import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ContactFormEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  rodo: string;
}

export function ContactFormEmail({
  name,
  email,
  subject,
  message,
  rodo,
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Nowa wiadomość od {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Nowa wiadomość z formularza kontaktowego</Heading>
          
          <Section style={section}>
            <Text style={label}>Od:</Text>
            <Text style={text}>{name}</Text>
            
            <Text style={label}>Email:</Text>
            <Text style={text}>{email}</Text>
            
            <Text style={label}>Temat:</Text>
            <Text style={text}>{subject}</Text>
            
            <Text style={label}>Wiadomość:</Text>
            <Text style={text}>{message}</Text>
            
            <Hr style={hr} />
            
            <Text style={label}>Zgoda RODO:</Text>
            <Text style={text}>{rodo}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Style dla szablonu email
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const section = {
  padding: "0 48px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
  textAlign: "center" as const,
};

const label = {
  color: "#666",
  fontSize: "12px",
  fontWeight: "bold",
  textTransform: "uppercase" as const,
  marginBottom: "5px",
};

const text = {
  color: "#333",
  fontSize: "14px",
  margin: "0 0 24px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
}; 