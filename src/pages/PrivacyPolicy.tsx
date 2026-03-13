import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Privacy Policy</CardTitle>
            <p className="text-sm text-muted-foreground">Last Updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p>
                ECDcoding ("we," "our," or "us") is committed to protecting your privacy and the privacy of children in our programs. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
              <p className="mb-3">
                The data we collect about you is what you have provided to us, including your name, email address, cell phone number, 
                location, and other registration details. We may collect, or process on behalf of our customers, the following categories 
                of personal data when you use or interact with our products and services.
              </p>

              <h3 className="text-lg font-medium mb-2">Personal Information</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Name, email address, phone number</li>
                <li>Location information (country, state/province)</li>
                <li>Educational and professional information (for teachers and ECD managers)</li>
                <li>Payment information (processed securely through third-party providers)</li>
              </ul>

              <h3 className="text-lg font-medium mb-2 mt-4">Information from Google Sign-In</h3>
              <p className="mb-2">
                If you choose to sign in using Google, we receive limited profile information from your Google account. 
                Our use of Google user data is limited to the following:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Email address:</strong> Used to create and identify your account</li>
                <li><strong>Display name:</strong> Used to personalise your experience on the platform</li>
                <li><strong>Profile picture:</strong> Displayed on your user profile (if available)</li>
              </ul>
              <p className="mt-2 text-sm text-muted-foreground">
                We do not request access to your Google contacts, calendar, drive, or any other Google services. 
                We do not sell, share, or transfer your Google user data to any third parties, except as necessary to provide 
                and improve our services, or as required by law. Our use and transfer of information received from Google APIs 
                adheres to the{" "}
                <a 
                  href="https://developers.google.com/terms/api-services-user-data-policy" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary underline"
                >
                  Google API Services User Data Policy
                </a>, including the Limited Use requirements.
              </p>

              <h3 className="text-lg font-medium mb-2 mt-4">Child Information</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Learner's name, age, and gender</li>
                <li>Learning progress and educational records</li>
                <li>Parent/guardian relationship information</li>
              </ul>

              <h3 className="text-lg font-medium mb-2 mt-4">Automatically Collected Information</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Device information and IP address</li>
                <li>Browser type and operating system</li>
                <li>Usage data and analytics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
              <p className="mb-3">
                We will use your data to provide you with the services you requested, such as access to educational content, 
                learning progress tracking, email notifications, and program updates. We will not sell your data to third parties, 
                but we may share it with our partners who help us provide our services (e.g., payment processors, hosting providers).
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>To provide and maintain our educational services</li>
                <li>To process registrations and payments</li>
                <li>To communicate with you about services, updates, and support</li>
                <li>To personalize learning experiences for children</li>
                <li>To improve our platform and develop new features</li>
                <li>To ensure child safety and comply with legal obligations</li>
                <li>To send educational content and program updates</li>
              </ul>

              <h3 className="text-lg font-medium mb-2 mt-4">How We Use Google User Data</h3>
              <p className="mb-2">
                If you sign in with Google, we use the data received from your Google account strictly for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Account authentication:</strong> To verify your identity and securely sign you in</li>
                <li><strong>Profile personalisation:</strong> To display your name and profile picture within the platform</li>
                <li><strong>Communication:</strong> To send you service-related notifications, such as account updates and educational content alerts</li>
              </ul>
              <p className="mt-2 text-sm text-muted-foreground">
                We do not use Google user data for advertising, profiling, or any purpose unrelated to providing and improving 
                ECDcoding's educational services. We do not sell Google user data to third parties. Data may only be shared with 
                service providers who assist in operating our platform, subject to confidentiality obligations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Credit System and Daily Free Credits</h2>
              <p className="mb-2">ECDcoding uses a credit-based system to provide access to educational content:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Initial Credits:</strong> New users receive 100 free credits upon registration to start their learning journey.</li>
                <li><strong>Daily Free Credits:</strong> All registered users receive 5 free credits automatically every 24 hours. This ensures continuous access to learning content even when credits are depleted.</li>
                <li><strong>Credit Usage:</strong> Credits are deducted when accessing interactive lessons and educational content.</li>
                <li><strong>Credit Purchases:</strong> Additional credits may be purchased through our secure payment system.</li>
                <li><strong>No Rollover:</strong> Daily free credits are awarded once per 24-hour period and do not accumulate if not claimed.</li>
              </ul>
              <p className="mt-2 text-sm text-muted-foreground">
                This daily credit offering is provided to ensure all learners have continuous access to educational resources, 
                regardless of their financial situation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Information Sharing and Disclosure</h2>
              <p className="mb-2">We do not sell your personal information. We may share information with:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Service Providers:</strong> Third-party vendors who assist in operating our platform (payment processors, hosting providers)</li>
                <li><strong>Teachers and ECD Managers:</strong> Educational information necessary for providing services</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect rights and safety</li>
                <li><strong>With Consent:</strong> Any other disclosure made with your explicit consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Child Privacy Protection</h2>
              <p className="mb-2">We take child privacy seriously and comply with applicable child protection laws:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Parental consent is required before collecting child information</li>
                <li>Child data is used only for educational purposes</li>
                <li>Parents can review, update, or delete their child's information</li>
                <li>Children's personal information is encrypted and securely stored</li>
                <li>We do not knowingly allow children to make their information publicly available</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Data Security</h2>
              <p className="mb-2">We implement appropriate security measures to protect your information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Restricted access to personal information</li>
                <li>Staff training on data protection practices</li>
              </ul>
              <p className="mt-2 text-sm text-muted-foreground">
                However, no method of transmission over the internet is 100% secure. While we strive to protect your information, 
                we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Your Rights and Choices</h2>
              <p className="mb-2">You have the following rights regarding your information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your information (see <Link to="/data-deletion" className="text-primary underline">Data Deletion Instructions</Link>)</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Data Retention</h2>
              <p>
                We retain your information for as long as necessary to provide our services and comply with legal obligations. 
                When you request deletion, we will remove your information within 30 days, except where retention is required by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Cookies and Tracking Technologies</h2>
              <p className="mb-2">We use cookies and similar technologies to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Maintain user sessions and preferences</li>
                <li>Analyze platform usage and performance</li>
                <li>Improve user experience</li>
              </ul>
              <p className="mt-2">You can control cookies through your browser settings.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">11. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of significant changes by email or 
                through a notice on our platform. Your continued use of our services after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">12. Contact Us</h2>
              <p className="mb-2">If you have questions about this Privacy Policy or our data practices, please contact us:</p>
              <ul className="list-none space-y-2 ml-4">
                <li><strong>Email:</strong> <a href="mailto:info@ecdcoding.co.za" className="text-primary underline">info@ecdcoding.co.za</a></li>
                <li><strong>Website:</strong> <a href="https://www.ecdcoding.co.za" target="_blank" rel="noopener noreferrer" className="text-primary underline">www.ecdcoding.co.za</a></li>
              </ul>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
