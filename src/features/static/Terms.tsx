import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { Seo } from "@/components/Seo";

export default function Terms() {
  return (
    <>
    <Seo title="Terms of Service" description="Athenaeum terms of service and conditions of use." />
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

          <h2>Library Card and Membership</h2>
          <p>Upon successful registration, you will be issued a digital library card associated with your account. Your library card is non-transferable and may only be used by the registered account holder. You agree to present your library card or account credentials when borrowing items in person at our physical location.</p>
          <p>Membership tiers are as follows: Standard Members may borrow up to 5 items simultaneously. Premium Members, available to donors and long-standing members in good standing, may borrow up to 10 items simultaneously. Institutional Members, including schools and community organizations, are subject to separate agreements. Membership benefits, including borrowing limits and loan periods, may be adjusted at our discretion with reasonable notice.</p>
          <p>Membership may be suspended or revoked for violation of these Terms, including but not limited to failure to return items, non-payment of fines, or conduct that disrupts library operations. Suspended members retain access to in-library resources but may not borrow items until the suspension is lifted.</p>

          <h2>Reservations and Holds</h2>
          <p>Members may place holds on items that are currently checked out by other members. When a held item becomes available, we will notify you via email and hold the item for 72 hours at the circulation desk. If the item is not collected within the hold period, the hold will be canceled and the item will be made available to the next member in the queue.</p>
          <p>You may have up to 10 active holds at any time. Holds can be canceled through your account dashboard at any time before the item is picked up. Repeated failure to collect held items may result in suspension of hold privileges. We reserve the right to limit the number of holds per member during peak periods.</p>

          <h2>Digital Resources and Online Conduct</h2>
          <p>Access to digital resources, including e-books, audiobooks, online databases, and streaming media, is provided for personal, non-commercial use only. You agree not to reproduce, distribute, or publicly perform digital content except as expressly permitted by applicable copyright law.</p>
          <p>Digital resources are subject to licensing agreements with publishers and content providers. These agreements may impose additional restrictions on usage, including limits on concurrent users, download allowances, and geographic availability. We will make reasonable efforts to notify you of such restrictions but are not liable for limitations imposed by third-party content providers.</p>
          <p>You agree to use our digital resources responsibly. Prohibited activities include but are not limited to: using automated downloading tools or scripts to systematically download content, circumventing digital rights management protections, sharing access credentials with unauthorized users, and engaging in excessive bandwidth consumption that degrades service for other members.</p>

          <h2>Programs and Events</h2>
          <p>We host educational and community programs, including author readings, workshops, book clubs, and children's story hours. Registration for events may be required due to capacity limitations. We reserve the right to cancel or reschedule events at our discretion. In the event of cancellation, registered participants will be notified at least 24 hours in advance when possible and offered priority registration for the rescheduled event.</p>
          <p>By attending our events, you consent to photography and recording for promotional purposes unless you notify us in advance. We will make reasonable accommodations for participants with disabilities upon request. Behavior that disrupts events or endangers other participants may result in removal from the premises and suspension of membership privileges.</p>

          <h2>Donations and Gifts</h2>
          <p>We gratefully accept donations of books and materials that align with our collection development policy. Donated items become the sole property of Athenaeum and may be added to the collection, sold, or discarded at our discretion. We do not provide monetary appraisals for donated items for tax purposes, but we can acknowledge receipt of donations upon request.</p>
          <p>Monetary donations and bequests are subject to our Gift Acceptance Policy, which ensures that all contributions are used in accordance with our mission and applicable laws. Donors may designate gifts for specific purposes, subject to our approval. We will acknowledge all donations in writing and provide appropriate documentation for tax purposes where applicable.</p>
          <p>We do not accept donations that impose unreasonable restrictions, require permanent display or naming rights, or conflict with our mission and values. All gift agreements are reviewed by our board of directors for compliance with our institutional policies.</p>

          <h2>Disclaimer of Warranties</h2>
          <p>Our Services are provided on an "as is" and "as available" basis. We make no warranties, expressed or implied, regarding:</p>
          <ul>
            <li>The availability, reliability, or accuracy of our Services.</li>
            <li>The completeness or timeliness of content in our catalog.</li>
            <li>Uninterrupted or error-free operation of our Services.</li>
          </ul>
          <p>We disclaim all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement. No advice or information, whether oral or written, obtained from us or through our Services creates any warranty not expressly stated in these Terms.</p>
          <p>We do not warrant that our Services will be compatible with all devices, browsers, or operating systems, or that they will be free from viruses, malware, or other harmful components. You are responsible for implementing appropriate security measures, including antivirus software and regular backups, when accessing our Services.</p>

          <h2>Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, Athenaeum shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of our Services. This includes, but is not limited to, damages for loss of data, loss of profits, business interruption, or personal injury, even if we have been advised of the possibility of such damages.</p>
          <p>Our total liability for any claim arising from these Terms or our Services shall not exceed the total amount of fines paid by you in the 12 months preceding the claim. This limitation applies regardless of the form of action, whether in contract, tort, strict liability, or otherwise.</p>
          <p>Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability, so some of the above limitations may not apply to you. In such cases, our liability will be limited to the maximum extent permitted by applicable law.</p>

          <h2>Indemnification</h2>
          <p>You agree to indemnify, defend, and hold harmless Athenaeum, its officers, directors, employees, volunteers, and agents from and against any and all claims, liabilities, damages, losses, costs, and expenses, including reasonable legal fees, arising out of or related to: (a) your use or misuse of our Services; (b) your violation of these Terms; (c) your violation of any applicable law or regulation; or (d) your infringement of any third-party intellectual property or other rights.</p>
          <p>We reserve the right, at our own expense, to assume the exclusive defense and control of any matter subject to indemnification by you. In such cases, you agree to cooperate with our defense efforts at your expense. This indemnification obligation survives the termination of your account and these Terms.</p>

          <h2>Governing Law and Dispute Resolution</h2>
          <p>These Terms are governed by and construed in accordance with the laws of the State of Booktown, without regard to its conflict of law principles. The United Nations Convention on Contracts for the International Sale of Goods does not apply to these Terms.</p>
          <p>Any dispute arising from these Terms or your use of our Services shall first be submitted to informal negotiation. If the dispute cannot be resolved through negotiation within 30 days, the parties agree to submit the dispute to binding mediation administered by the American Arbitration Association. If mediation is unsuccessful, either party may initiate binding arbitration in accordance with the Commercial Rules of the American Arbitration Association.</p>
          <p>You agree that any action at law or in equity arising out of or relating to these Terms shall be filed only in the courts located in Booktown, and you hereby consent and submit to the personal jurisdiction of such courts for the purposes of litigating any such action. The prevailing party in any dispute shall be entitled to recover reasonable legal fees and costs.</p>

          <h2>Severability and Waiver</h2>
          <p>If any provision of these Terms is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect. The invalid provision will be modified to the minimum extent necessary to make it valid, enforceable, and consistent with the original intent of the parties.</p>
          <p>Our failure to enforce any right or provision of these Terms does not constitute a waiver of such right or provision. No waiver of any term shall be deemed a further or continuing waiver of such term or any other term. Any waiver must be in writing and signed by an authorized representative of Athenaeum to be effective.</p>

          <h2>Entire Agreement</h2>
          <p>These Terms, together with our Privacy Policy, constitute the entire agreement between you and Athenaeum regarding your use of our Services and supersede all prior agreements, understandings, communications, and representations, whether written or oral, regarding the subject matter hereof.</p>
          <p>You acknowledge that you have read these Terms, understand them, and agree to be bound by them. You further acknowledge that you have had the opportunity to seek independent legal advice before agreeing to these Terms.</p>

          <h2>Contact</h2>
          <p>For questions about these Terms, please contact us:</p>
          <ul>
            <li>Email: legal@library.example.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Address: 123 Library Street, Booktown, BK 12345</li>
            <li>Legal Counsel: counsel@library.example.com</li>
          </ul>
        </div>
      </Container>
    </Section>
    </>
  );
}
