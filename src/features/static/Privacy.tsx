import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { Seo } from "@/components/Seo";

export default function Privacy() {
  return (
    <>
    <Seo title="Privacy Policy" description="Athenaeum privacy policy — how we handle your data." />
    <Section>
      <Container className="max-w-3xl">
        <PageHeader title="Privacy Policy" description="Last updated: June 1, 2026" />

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:font-medium [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3 [&_li]:mb-1">
          <h2>Introduction</h2>
          <p>At Athenaeum ("we," "our," or "us"), we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our library services.</p>
          <p>By using our services, you consent to the practices described in this policy. If you do not agree, please discontinue use of our services.</p>

          <h2>Information We Collect</h2>
          <h3>Information you provide directly</h3>
          <ul>
            <li><strong>Account information:</strong> name, email address, phone number, and postal address when you register for a library card.</li>
            <li><strong>Borrowing history:</strong> records of books you borrow, reserve, and return.</li>
            <li><strong>Communications:</strong> messages you send us through our contact form, including your name, email, subject, and message content.</li>
            <li><strong>Payment information:</strong> fine payments are processed through a third-party payment processor. We do not store credit card details on our servers.</li>
          </ul>
          <h3>Information collected automatically</h3>
          <ul>
            <li><strong>Usage data:</strong> pages visited, time spent on pages, click patterns, and search queries.</li>
            <li><strong>Device data:</strong> IP address, browser type, operating system, and device type.</li>
            <li><strong>Cookies:</strong> we use essential cookies for authentication and optional cookies for analytics and personalization.</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul>
            <li>To provide and maintain our library services, including borrowing, reservations, and account management.</li>
            <li>To communicate with you about your account, including due date reminders, reservation notifications, and fine notices.</li>
            <li>To improve our services through analytics and user research.</li>
            <li>To personalize your experience, including book recommendations based on your borrowing history.</li>
            <li>To comply with legal obligations and enforce our terms of service.</li>
          </ul>

          <h2>Data Sharing</h2>
          <p>We do not sell your personal information to third parties. We may share your information in the following circumstances:</p>
          <ul>
            <li><strong>Service providers:</strong> we use trusted third-party services for payment processing, email delivery, and hosting. These providers are contractually bound to protect your data.</li>
            <li><strong>Legal requirements:</strong> we may disclose information if required by law, court order, or governmental regulation.</li>
            <li><strong>Consent:</strong> we may share information with your explicit consent.</li>
          </ul>

          <h2>Data Security</h2>
          <p>We implement industry-standard security measures to protect your data:</p>
          <ul>
            <li>All data transmitted between your browser and our servers is encrypted using TLS 1.3.</li>
            <li>Passwords are hashed and salted using bcrypt.</li>
            <li>Access to personal data is restricted to authorized personnel only.</li>
            <li>Regular security audits and penetration testing are conducted.</li>
          </ul>
          <p>Despite these measures, no method of electronic storage or transmission is 100% secure. We cannot guarantee absolute security.</p>

          <h2>Your Rights</h2>
          <p>Depending on your jurisdiction, you may have the following rights:</p>
          <ul>
            <li><strong>Right to access:</strong> request a copy of the personal data we hold about you.</li>
            <li><strong>Right to rectification:</strong> request correction of inaccurate or incomplete data.</li>
            <li><strong>Right to deletion:</strong> request deletion of your personal data, subject to legal retention requirements.</li>
            <li><strong>Right to restrict processing:</strong> request limitation of how we use your data.</li>
            <li><strong>Right to data portability:</strong> request transfer of your data to another service provider.</li>
            <li><strong>Right to object:</strong> object to processing of your data for marketing purposes.</li>
          </ul>
          <p>To exercise any of these rights, please contact us using the information below.</p>

          <h2>Cookie Policy</h2>
          <p>Our website uses the following types of cookies:</p>
          <ul>
            <li><strong>Essential cookies:</strong> required for authentication and basic functionality. These cannot be disabled.</li>
            <li><strong>Functional cookies:</strong> remember your preferences, such as theme selection and language.</li>
            <li><strong>Analytics cookies:</strong> help us understand how you use our website so we can improve it.</li>
          </ul>
          <p>You can manage cookie preferences through your browser settings. Disabling certain cookies may affect website functionality.</p>

          <h2>Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of material changes by email and by posting a notice on our website. Continued use of our services after changes constitutes acceptance of the updated policy.</p>

          <h2>Contact</h2>
          <p>If you have questions about this Privacy Policy or wish to exercise your data rights, please contact us:</p>
          <ul>
            <li>Email: privacy@library.example.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Address: 123 Library Street, Booktown, BK 12345</li>
          </ul>
        </div>
      </Container>
    </Section>
    </>
  );
}
