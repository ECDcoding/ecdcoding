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
              <h3 className="text-lg font-medium mb-2">Personal Information</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Name, email address, phone number</li>
                <li>Location information (country, state/province)</li>
                <li>Educational and professional information (for teachers and ECD managers)</li>
                <li>Payment information (processed securely through third-party providers)</li>
              </ul>

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
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>To provide and maintain our educational services</li>
                <li>To process registrations and payments</li>
                <li>To communicate with you about services, updates, and support</li>
                <li>To personalize learning experiences for children</li>
                <li>To improve our platform and develop new features</li>
                <li>To ensure child safety and comply with legal obligations</li>
                <li>To send educational content and program updates</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Information Sharing and Disclosure</h2>
              <p className="mb-2">We do not sell your personal information. We may share information with:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Service Providers:</strong> Third-party vendors who assist in operating our platform (payment processors, hosting providers)</li>
                <li><strong>Teachers and ECD Managers:</strong> Educational information necessary for providing services</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect rights and safety</li>
                <li><strong>With Consent:</strong> Any other disclosure made with your explicit consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Child Privacy Protection</h2>
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
              <h2 className="text-xl font-semibold mb-3">6. Data Security</h2>
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
              <h2 className="text-xl font-semibold mb-3">7. Your Rights and Choices</h2>
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
              <h2 className="text-xl font-semibold mb-3">8. Data Retention</h2>
              <p>
                We retain your information for as long as necessary to provide our services and comply with legal obligations. 
                When you request deletion, we will remove your information within 30 days, except where retention is required by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Cookies and Tracking Technologies</h2>
              <p className="mb-2">We use cookies and similar technologies to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Maintain user sessions and preferences</li>
                <li>Analyze platform usage and performance</li>
                <li>Improve user experience</li>
              </ul>
              <p className="mt-2">You can control cookies through your browser settings.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of significant changes by email or 
                through a notice on our platform. Your continued use of our services after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">11. Contact Us</h2>
              <p className="mb-2">If you have questions about this Privacy Policy or our data practices, please contact us:</p>
              <ul className="list-none space-y-2 ml-4">
                <li><strong>Email:</strong> privacy@ecdcoding.com</li>
                <li><strong>Website:</strong> <Link to="/contact" className="text-primary underline">Contact Us</Link></li>
              </ul>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
