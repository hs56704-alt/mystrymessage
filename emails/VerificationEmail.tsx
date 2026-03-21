import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button,
} from "@react-email/components";

interface VerificationEmailProps {
    username: string;
    otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
    return (
        <Html lang="en" dir="ltr">
            <Head>
                <title>Verification</title>
                <Font
                    fontFamily="Roboto"
                    fallbackFontFamily="Verdana"
                    webFont={{
                        url : 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf',
                        format : 'truetype'
                    }}
                    fontWeight= {400}
                    fontStyle = "normal"
                />
            </Head>
            <Preview>Here&apos;s your verification code</Preview>
            <Section style={{ backgroundColor: "#f9f9f9", padding: "20px" }}>
                <Row>
                    <Heading style={{ color: "#333", fontSize: "24px", marginBottom: "10px" }}>
                        Hello {username},
                    </Heading>
                </Row>
                <Row>
                    <Text>
                        Thank you for registering with us! Please use the following verification code to complete your registration:
                    </Text>
                </Row>
                <Row>
                    <Text>{otp}</Text>
                </Row>
                <Row>
                    <Text>
                        If you did not create an account, please ignore this email.
                    </Text>
                </Row>
                {/* <Row>
                    <Button
                        href = {`href://localhost:3000/verify/${username}`}
                        style={{ color: "#61dafb", textDecoration: "none", fontSize: "16px" }}
                    >
                        Verify Account
                    </Button>
                </Row>
                    */}
            </Section>
            </Html>
    );
}

                    