import { ArrowLeft, Trash2, FileText, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const DataDeletion = () => {
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
            <CardTitle className="text-3xl flex items-center gap-2">
              <Trash2 className="h-8 w-8" />
              Data Deletion Instructions
            </CardTitle>
            <p className="text-sm text-muted-foreground">How to request deletion of your personal data</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <AlertDescription>
                At ECDcoding, we respect your right to privacy and control over your personal information. 
                You can request deletion of your data at any time following the instructions below.
              </AlertDescription>
            </Alert>

            <section>
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                What Data Can Be Deleted?
              </h2>
              <p className="mb-2">When you request data deletion, we will remove:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your account information (name, email, phone number, location)</li>
                <li>Profile details and preferences</li>
                <li>Learner information associated with your account</li>
                <li>Payment history and transaction records</li>
                <li>Educational progress and activity logs</li>
                <li>Any uploaded files or documents</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Data That May Be Retained</h2>
              <p className="mb-2">In some cases, we may retain certain data as required by law or for legitimate business purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Financial records for tax and accounting purposes (7 years)</li>
                <li>Legal compliance documentation</li>
                <li>Anonymized analytics data that cannot identify you</li>
                <li>Backup copies (automatically purged within 90 days)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Mail className="h-5 w-5" />
                How to Request Data Deletion
              </h2>
              
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4 py-2">
                  <h3 className="font-semibold text-lg mb-2">Method 1: Email Request</h3>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Send an email to <strong>info@ecdcoding.co.za</strong></li>
                    <li>Use the subject line: "Data Deletion Request"</li>
                    <li>Include in your email:
                      <ul className="list-disc list-inside ml-6 mt-1">
                        <li>Your full name</li>
                        <li>Email address associated with your account</li>
                        <li>Account type (Parent/Guardian, ECD Manager, or Tech Teacher)</li>
                        <li>Brief reason for deletion (optional)</li>
                      </ul>
                    </li>
                    <li>We may ask for verification to confirm your identity</li>
                  </ol>
                </div>

                <div className="border-l-4 border-primary pl-4 py-2">
                  <h3 className="font-semibold text-lg mb-2">Method 2: Contact Form</h3>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Visit our <Link to="/contact" className="text-primary underline">Contact Us page</Link></li>
                    <li>Select "Data Deletion Request" as the subject</li>
                    <li>Fill in the required information</li>
                    <li>Submit the form</li>
                  </ol>
                </div>

                <div className="border-l-4 border-primary pl-4 py-2">
                  <h3 className="font-semibold text-lg mb-2">Method 3: Account Settings (Coming Soon)</h3>
                  <p className="ml-4 text-muted-foreground">
                    We are developing a self-service option where you can delete your account directly from your profile settings.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Processing Timeline
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-24 font-semibold">24-48 hours</div>
                  <div>We will acknowledge receipt of your deletion request</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-24 font-semibold">3-5 days</div>
                  <div>Identity verification (if required)</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-24 font-semibold">30 days</div>
                  <div>Complete deletion of your data from our active systems</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-24 font-semibold">90 days</div>
                  <div>Automatic purging of data from backup systems</div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Important Considerations</h2>
              <Alert>
                <AlertDescription className="space-y-2">
                  <p><strong>⚠️ Data deletion is permanent and cannot be undone.</strong></p>
                  <p>Before requesting deletion, please note:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>You will lose access to all educational content and progress</li>
                    <li>Active subscriptions will be cancelled (no refunds for partial periods)</li>
                    <li>You will need to create a new account to use our services again</li>
                    <li>Any learner accounts linked to yours will also be deleted</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Alternatives to Full Deletion</h2>
              <p className="mb-2">If you're not sure about complete deletion, consider these alternatives:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Account Deactivation:</strong> Temporarily disable your account without losing data</li>
                <li><strong>Update Privacy Settings:</strong> Control what information is shared and visible</li>
                <li><strong>Unsubscribe:</strong> Stop receiving marketing emails while keeping your account</li>
                <li><strong>Data Export:</strong> Download a copy of your data before deletion</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <p><strong>Data Protection Officer:</strong> info@ecdcoding.co.za</p>
                <p><strong>General Support:</strong> <Link to="/contact" className="text-primary underline">Contact Us</Link></p>
                <p><strong>Privacy Policy:</strong> <Link to="/privacy-policy" className="text-primary underline">View Privacy Policy</Link></p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Questions?</h2>
              <p>
                If you have any questions about the data deletion process or need assistance, 
                please don't hesitate to contact us. We're here to help and will respond to your inquiry within 24-48 hours.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataDeletion;
