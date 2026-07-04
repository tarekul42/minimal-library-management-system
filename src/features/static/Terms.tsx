import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";

export default function Terms() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <PageHeader title="Terms of Service" description="Last updated: June 1, 2026" />

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:font-medium [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3 [&_li]:mb-1">
          <h2>Acceptance of Terms</h2>
          <p>By accessing or using the Athenaeum website and library services ("Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to all the terms, you may not access or use our Services.</p>
          <p>These Terms constitute a legally binding agreement between you and Athenaeum. Please read them carefully.</p>

          <h2>Eligibility</h2>
          <p>To use our Services, you must:</p>
          <ul>
            <li>Be at least 13 years of age. Users under 16 require parental or guardian consent.</li>
            <li>Provide accurate, current, and complete registration information.</li>
            <li>Maintain and promptly update your account information.</li>
            <li>Have the legal capacity to enter into a binding contract.</li>
          </ul>
          <p>We reserve the right to refuse service, terminate accounts, or cancel orders at our sole discretion.</p>

          <h2>Account Registration</h2>
          <p>When you create an account, you are responsible for:</p>
          <ul>
            <li>Maintaining the confidentiality of your login credentials.</li>
            <li>All activities that occur under your account.</li>
            <li>Notifying us immediately of any unauthorized use of your account.</li>
          </ul>
          <p>We are not liable for any loss or damage arising from your failure to protect your account credentials.</p>

          <h2>Borrowing Terms</h2>
          <p>By borrowing books through our Services, you agree to:</p>
          <ul>
            <li>Return borrowed items by the due date.</li>
            <li>Not damage, deface, or lose borrowed items.</li>
            <li>Pay any fines or replacement costs associated with late returns or lost items.</li>
            <li>Adhere to borrowing limits: maximum 5 items at a time, loan period of 14 days, maximum 3 renewals per item.</li>
          </ul>
          <p>We reserve the right to suspend borrowing privileges for members who violate these terms.</p>

          <h2>Fines & Returns</h2>
          <p>The following fine structure applies:</p>
          <ul>
            <li>Late returns: $0.50 per day per item, up to a maximum of $15 per item.</li>
            <li>Lost items: replacement cost of the item plus a $5 processing fee.</li>
            <li>Damaged items: assessed on a case-by-case basis, up to full replacement cost.</li>
          </ul>
          <p>Fines must be paid within 30 days of being assessed. Unpaid fines may result in suspension of borrowing privileges and referral to a collections agency.</p>

          <h2>Intellectual Property</h2>
          <p>All content on our website — including text, graphics, logos, images, and software — is the property of Athenaeum or its content suppliers and is protected by copyright and other intellectual property laws.</p>
          <p>You may not reproduce, distribute, modify, or create derivative works from our content without our express written permission, except as permitted by fair use doctrine.</p>

          <h2>Prohibited Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use our Services for any unlawful purpose or in violation of any applicable laws.</li>
            <li>Attempt to gain unauthorized access to our systems or other users' accounts.</li>
            <li>Interfere with or disrupt the operation of our Services.</li>
            <li>Upload or transmit viruses, malware, or any malicious code.</li>
            <li>Harass, abuse, or harm other users or staff members.</li>
            <li>Use automated tools (bots, scrapers) to access our Services without our permission.</li>
            <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity.</li>
          </ul>

          <h2>Termination</h2>
          <p>We may terminate or suspend your account and access to our Services immediately, without prior notice, under the following circumstances:</p>
          <ul>
            <li>Violation of these Terms or any applicable laws.</li>
            <li>Fraudulent, abusive, or illegal activity.</li>
            <li>Non-payment of fines or fees.</li>
            <li>Request by you to close your account.</li>
          </ul>
          <p>Upon termination, your right to use our Services ceases immediately. Provisions of these Terms that by their nature should survive termination shall survive.</p>

          <h2>Disclaimer</h2>
          <p>Our Services are provided on an "as is" and "as available" basis. We make no warranties, expressed or implied, regarding:</p>
          <ul>
            <li>The availability, reliability, or accuracy of our Services.</li>
            <li>The completeness or timeliness of content in our catalog.</li>
            <li>Uninterrupted or error-free operation of our Services.</li>
          </ul>
          <p>We disclaim all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>

          <h2>Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, Athenaeum shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of our Services.</p>
          <p>Our total liability for any claim arising from these Terms or our Services shall not exceed the total amount of fines paid by you in the 12 months preceding the claim.</p>
          <p>Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability, so some of the above limitations may not apply to you.</p>

          <h2>Changes to Terms</h2>
          <p>We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. We will notify you of material changes by email and by posting a notice on our website.</p>
          <p>Your continued use of our Services after changes are posted constitutes your acceptance of the modified Terms.</p>

          <h2>Contact</h2>
          <p>For questions about these Terms, please contact us:</p>
          <ul>
            <li>Email: legal@library.example.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Address: 123 Library Street, Booktown, BK 12345</li>
          </ul>
        </div>
      </Container>
    </Section>
  );
}
