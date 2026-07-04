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
          <p>At Athenaeum ("we," "our," or "us"), we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our library services. It covers the full lifecycle of your personal data, from collection through storage, processing, and eventual deletion, and details your rights and our obligations under applicable data protection laws.</p>
          <p>By using our services, you consent to the practices described in this policy. If you do not agree with any part of this policy, please discontinue use of our services and contact us to close your account. We may update this policy periodically; we encourage you to review it regularly to stay informed about how we protect your information.</p>
          <p>This Privacy Policy applies to all users of our website, mobile application, and physical library services. It does not apply to third-party services that we do not own or control, including payment processors, analytics providers, and content delivery networks that have their own privacy policies governing data handling practices.</p>

          <h2>Information We Collect</h2>
          <h3>Information you provide directly</h3>
          <ul>
            <li><strong>Account information:</strong> name, email address, phone number, and postal address when you register for a library card. We also collect date of birth for age verification purposes when required by law.</li>
            <li><strong>Borrowing history:</strong> records of books you borrow, reserve, and return, including dates, quantities, and any associated fines or fees.</li>
            <li><strong>Communications:</strong> messages you send us through our contact form or email, including your name, email address, subject line, message content, and any attachments you include.</li>
            <li><strong>Payment information:</strong> fine payments are processed through a PCI-DSS compliant third-party payment processor. We do not store full credit card details, CVV codes, or bank account numbers on our servers. We retain only the last four digits of your card number, the card type, and the transaction amount for reference and reconciliation purposes.</li>
            <li><strong>Survey and feedback responses:</strong> when you voluntarily participate in our user satisfaction surveys or provide feedback about your experience, we collect your responses along with basic demographic information if provided.</li>
            <li><strong>Event registration:</strong> information provided when registering for library programs and events, including accommodation requests and emergency contact details where applicable.</li>
          </ul>
          <h3>Information collected automatically</h3>
          <ul>
            <li><strong>Usage data:</strong> pages visited, time spent on pages, click patterns, search queries, download history for digital resources, and features used most frequently.</li>
            <li><strong>Device data:</strong> IP address, browser type and version, operating system, device type and model, screen resolution, language preferences, and time zone setting.</li>
            <li><strong>Cookies and similar technologies:</strong> we use essential cookies for authentication and session management, functional cookies to remember your preferences such as theme and language settings, and analytics cookies to understand how our services are used. You can manage cookie preferences through your browser settings at any time.</li>
            <li><strong>Location data:</strong> with your consent, we may collect approximate location information derived from your IP address to personalize content and recommendations based on your region.</li>
          </ul>
          <p>We do not use any form of fingerprinting, tracking beacons, or cross-site tracking technologies. Analytics data is anonymized after 26 months and used exclusively for service improvement purposes.</p>

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

          <h2>Data Retention</h2>
          <p>We retain your personal information only as long as necessary to fulfill the purposes described in this Privacy Policy, or as required by applicable law. When determining retention periods, we consider the nature of the data, the purpose for which it was collected, and legal or regulatory requirements.</p>
          <p>Account information is retained for the duration of your account's active status and for a reasonable period after closure to comply with legal obligations, resolve disputes, and enforce our agreements. Borrowing history records are anonymized after 36 months of inactivity for analytical purposes. Communications and correspondence are retained for 24 months following resolution of the matter.</p>
          <p>When personal data is no longer required, we securely delete or anonymize it using industry-standard methods that prevent reconstruction. You may request deletion of your data at any time, subject to legal retention requirements.</p>

          <h2>International Data Transfers</h2>
          <p>Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those in your jurisdiction.</p>
          <p>When we transfer your data internationally, we implement appropriate safeguards, including Standard Contractual Clauses approved by relevant authorities, binding corporate rules, or reliance on adequacy decisions issued by competent data protection authorities. Our servers are currently located in the United States and the European Union, and we ensure that data transferred between these regions is protected by appropriate mechanisms.</p>
          <p>We conduct data protection impact assessments for international transfers to identify and mitigate any risks to your privacy rights. By using our services, you consent to the transfer of your data to countries that may have different data protection standards than your own, subject to the safeguards described above.</p>

          <h2>Third-Party Services</h2>
          <p>We integrate with third-party services to enhance our offerings. These services have their own privacy policies governing data handling:</p>
          <ul>
            <li><strong>Payment processing:</strong> We use a PCI-DSS compliant payment processor for fine payments. We do not receive or store your full payment card details. The processor retains transaction records in accordance with financial regulations and its own privacy policy.</li>
            <li><strong>Email delivery:</strong> Transactional emails are sent through a third-party email service provider. Only your email address and the content of the communication are shared for delivery purposes.</li>
            <li><strong>Cloud hosting:</strong> Our infrastructure is hosted on cloud servers with comprehensive security certifications, including SOC 2 and ISO 27001.</li>
            <li><strong>Analytics:</strong> We use privacy-focused analytics tools that anonymize IP addresses and do not share data with advertising networks.</li>
          </ul>
          <p>We review our third-party providers annually to ensure they maintain adequate data protection standards and comply with applicable regulations. We recommend reviewing the privacy policies of any third-party services you access through our platform.</p>

          <h2>Children's Privacy</h2>
          <p>Our services are not directed to children under the age of 13, and we do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information without your consent, please contact us immediately.</p>
          <p>For users between the ages of 13 and 16, we require verifiable parental or guardian consent before collecting any personal data. This consent can be provided through our registration process, which includes a guardian contact verification step. If we discover that we have inadvertently collected personal data from a child under 13 without proper consent, we will take prompt steps to delete that information.</p>
          <p>Parents and guardians have the right to review their child's personal data maintained by us, request deletion, and refuse further collection or use of their child's information. We provide a dedicated channel for such requests at privacy@library.example.com.</p>

          <h2>Automated Decision-Making</h2>
          <p>We may use automated decision-making processes, including profiling, for the following purposes:</p>
          <ul>
            <li><strong>Book recommendations:</strong> Our recommendation engine analyzes your borrowing history and reading preferences to suggest books you may enjoy. This analysis is based on genre preferences, author affinity, and borrowing patterns.</li>
            <li><strong>Fine calculation:</strong> Late fines are automatically calculated based on due dates, return dates, and applicable fine rates. No human intervention is required for standard fine assessments.</li>
            <li><strong>Fraud detection:</strong> We use automated systems to detect unusual account activity that may indicate unauthorized access or fraudulent behavior.</li>
          </ul>
          <p>You have the right to request human intervention in automated decisions that significantly affect you. If you disagree with an automated decision, such as a fine assessment or recommendation block, you may appeal by contacting our support team. We will review the decision with a human staff member and respond within 14 business days.</p>

          <h2>Data Breach Notification</h2>
          <p>In the event of a data breach that affects your personal information, we will notify you within 72 hours of becoming aware of the incident. Our notification will include:</p>
          <ul>
            <li>The nature and scope of the breach and the categories of data affected.</li>
            <li>The likely consequences of the breach for affected individuals.</li>
            <li>The measures we have taken or propose to take to address the breach and mitigate its potential adverse effects.</li>
            <li>Recommendations for steps you can take to protect yourself from potential consequences.</li>
          </ul>
          <p>We maintain a comprehensive incident response plan that includes immediate containment measures, forensic investigation, regulatory notification, and remediation procedures. Our security team conducts regular tabletop exercises to ensure readiness for potential security incidents.</p>

          <h2>Contact</h2>
          <p>If you have questions about this Privacy Policy or wish to exercise your data rights, please contact us:</p>
          <ul>
            <li>Email: privacy@library.example.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Address: 123 Library Street, Booktown, BK 12345</li>
            <li>Data Protection Officer: dpo@library.example.com</li>
          </ul>
          <p>We aim to respond to all inquiries within 30 days. If you are unsatisfied with our response, you may have the right to lodge a complaint with your local data protection authority.</p>
        </div>
      </Container>
    </Section>
    </>
  );
}
