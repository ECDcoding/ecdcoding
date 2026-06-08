import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ArrowLeft, FileText, ChevronDown, CalendarIcon, Gift, Sparkles, Zap } from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { DebitCardPaymentDialog } from "@/components/DebitCardPaymentDialog";
import { countryCodes } from "@/lib/countryCodes";
import { cn } from "@/lib/utils";

// Comprehensive country list
const countries = [
  { code: "AF", name: "Afghanistan" },
  { code: "AL", name: "Albania" },
  { code: "DZ", name: "Algeria" },
  { code: "AS", name: "American Samoa" },
  { code: "AD", name: "Andorra" },
  { code: "AO", name: "Angola" },
  { code: "AI", name: "Anguilla" },
  { code: "AQ", name: "Antarctica" },
  { code: "AG", name: "Antigua and Barbuda" },
  { code: "AR", name: "Argentina" },
  { code: "AM", name: "Armenia" },
  { code: "AW", name: "Aruba" },
  { code: "AU", name: "Australia" },
  { code: "AT", name: "Austria" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BS", name: "Bahamas" },
  { code: "BH", name: "Bahrain" },
  { code: "BD", name: "Bangladesh" },
  { code: "BB", name: "Barbados" },
  { code: "BY", name: "Belarus" },
  { code: "BE", name: "Belgium" },
  { code: "BZ", name: "Belize" },
  { code: "BJ", name: "Benin" },
  { code: "BM", name: "Bermuda" },
  { code: "BT", name: "Bhutan" },
  { code: "BO", name: "Bolivia" },
  { code: "BA", name: "Bosnia and Herzegovina" },
  { code: "BW", name: "Botswana" },
  { code: "BV", name: "Bouvet Island" },
  { code: "BR", name: "Brazil" },
  { code: "IO", name: "British Indian Ocean Territory" },
  { code: "BN", name: "Brunei Darussalam" },
  { code: "BG", name: "Bulgaria" },
  { code: "BF", name: "Burkina Faso" },
  { code: "BI", name: "Burundi" },
  { code: "KH", name: "Cambodia" },
  { code: "CM", name: "Cameroon" },
  { code: "CA", name: "Canada" },
  { code: "CV", name: "Cape Verde" },
  { code: "KY", name: "Cayman Islands" },
  { code: "CF", name: "Central African Republic" },
  { code: "TD", name: "Chad" },
  { code: "CL", name: "Chile" },
  { code: "CN", name: "China" },
  { code: "CX", name: "Christmas Island" },
  { code: "CC", name: "Cocos (Keeling) Islands" },
  { code: "CO", name: "Colombia" },
  { code: "KM", name: "Comoros" },
  { code: "CG", name: "Congo" },
  { code: "CD", name: "Congo, Democratic Republic" },
  { code: "CK", name: "Cook Islands" },
  { code: "CR", name: "Costa Rica" },
  { code: "CI", name: "Cote D'Ivoire" },
  { code: "HR", name: "Croatia" },
  { code: "CU", name: "Cuba" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czech Republic" },
  { code: "DK", name: "Denmark" },
  { code: "DJ", name: "Djibouti" },
  { code: "DM", name: "Dominica" },
  { code: "DO", name: "Dominican Republic" },
  { code: "EC", name: "Ecuador" },
  { code: "EG", name: "Egypt" },
  { code: "SV", name: "El Salvador" },
  { code: "GQ", name: "Equatorial Guinea" },
  { code: "ER", name: "Eritrea" },
  { code: "EE", name: "Estonia" },
  { code: "ET", name: "Ethiopia" },
  { code: "FK", name: "Falkland Islands (Malvinas)" },
  { code: "FO", name: "Faroe Islands" },
  { code: "FJ", name: "Fiji" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "GF", name: "French Guiana" },
  { code: "PF", name: "French Polynesia" },
  { code: "TF", name: "French Southern Territories" },
  { code: "GA", name: "Gabon" },
  { code: "GM", name: "Gambia" },
  { code: "GE", name: "Georgia" },
  { code: "DE", name: "Germany" },
  { code: "GH", name: "Ghana" },
  { code: "GI", name: "Gibraltar" },
  { code: "GR", name: "Greece" },
  { code: "GL", name: "Greenland" },
  { code: "GD", name: "Grenada" },
  { code: "GP", name: "Guadeloupe" },
  { code: "GU", name: "Guam" },
  { code: "GT", name: "Guatemala" },
  { code: "GG", name: "Guernsey" },
  { code: "GN", name: "Guinea" },
  { code: "GW", name: "Guinea-Bissau" },
  { code: "GY", name: "Guyana" },
  { code: "HT", name: "Haiti" },
  { code: "HM", name: "Heard Island & Mcdonald Islands" },
  { code: "VA", name: "Holy See (Vatican City State)" },
  { code: "HN", name: "Honduras" },
  { code: "HK", name: "Hong Kong" },
  { code: "HU", name: "Hungary" },
  { code: "IS", name: "Iceland" },
  { code: "IN", name: "India" },
  { code: "ID", name: "Indonesia" },
  { code: "IR", name: "Iran, Islamic Republic Of" },
  { code: "IQ", name: "Iraq" },
  { code: "IE", name: "Ireland" },
  { code: "IM", name: "Isle Of Man" },
  { code: "IL", name: "Israel" },
  { code: "IT", name: "Italy" },
  { code: "JM", name: "Jamaica" },
  { code: "JP", name: "Japan" },
  { code: "JE", name: "Jersey" },
  { code: "JO", name: "Jordan" },
  { code: "KZ", name: "Kazakhstan" },
  { code: "KE", name: "Kenya" },
  { code: "KI", name: "Kiribati" },
  { code: "KR", name: "Korea" },
  { code: "KP", name: "Korea, Democratic People's Republic of" },
  { code: "KW", name: "Kuwait" },
  { code: "KG", name: "Kyrgyzstan" },
  { code: "LA", name: "Lao People's Democratic Republic" },
  { code: "LV", name: "Latvia" },
  { code: "LB", name: "Lebanon" },
  { code: "LS", name: "Lesotho" },
  { code: "LR", name: "Liberia" },
  { code: "LY", name: "Libyan Arab Jamahiriya" },
  { code: "LI", name: "Liechtenstein" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MO", name: "Macao" },
  { code: "MK", name: "Macedonia" },
  { code: "MG", name: "Madagascar" },
  { code: "MW", name: "Malawi" },
  { code: "MY", name: "Malaysia" },
  { code: "MV", name: "Maldives" },
  { code: "ML", name: "Mali" },
  { code: "MT", name: "Malta" },
  { code: "MH", name: "Marshall Islands" },
  { code: "MQ", name: "Martinique" },
  { code: "MR", name: "Mauritania" },
  { code: "MU", name: "Mauritius" },
  { code: "YT", name: "Mayotte" },
  { code: "MX", name: "Mexico" },
  { code: "FM", name: "Micronesia, Federated States Of" },
  { code: "MD", name: "Moldova" },
  { code: "MC", name: "Monaco" },
  { code: "MN", name: "Mongolia" },
  { code: "ME", name: "Montenegro" },
  { code: "MS", name: "Montserrat" },
  { code: "MA", name: "Morocco" },
  { code: "MZ", name: "Mozambique" },
  { code: "MM", name: "Myanmar" },
  { code: "NA", name: "Namibia" },
  { code: "NR", name: "Nauru" },
  { code: "NP", name: "Nepal" },
  { code: "NL", name: "Netherlands" },
  { code: "AN", name: "Netherlands Antilles" },
  { code: "NC", name: "New Caledonia" },
  { code: "NZ", name: "New Zealand" },
  { code: "NI", name: "Nicaragua" },
  { code: "NE", name: "Niger" },
  { code: "NG", name: "Nigeria" },
  { code: "NU", name: "Niue" },
  { code: "NF", name: "Norfolk Island" },
  { code: "MP", name: "Northern Mariana Islands" },
  { code: "NO", name: "Norway" },
  { code: "OM", name: "Oman" },
  { code: "PK", name: "Pakistan" },
  { code: "PW", name: "Palau" },
  { code: "PS", name: "Palestinian Territory, Occupied" },
  { code: "PA", name: "Panama" },
  { code: "PG", name: "Papua New Guinea" },
  { code: "PY", name: "Paraguay" },
  { code: "PE", name: "Peru" },
  { code: "PH", name: "Philippines" },
  { code: "PN", name: "Pitcairn" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "PR", name: "Puerto Rico" },
  { code: "QA", name: "Qatar" },
  { code: "RE", name: "Reunion" },
  { code: "RO", name: "Romania" },
  { code: "RU", name: "Russian Federation" },
  { code: "RW", name: "Rwanda" },
  { code: "BL", name: "Saint Barthelemy" },
  { code: "SH", name: "Saint Helena" },
  { code: "KN", name: "Saint Kitts And Nevis" },
  { code: "LC", name: "Saint Lucia" },
  { code: "MF", name: "Saint Martin" },
  { code: "PM", name: "Saint Pierre And Miquelon" },
  { code: "VC", name: "Saint Vincent And Grenadines" },
  { code: "WS", name: "Samoa" },
  { code: "SM", name: "San Marino" },
  { code: "ST", name: "Sao Tome And Principe" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "SN", name: "Senegal" },
  { code: "RS", name: "Serbia" },
  { code: "SC", name: "Seychelles" },
  { code: "SL", name: "Sierra Leone" },
  { code: "SG", name: "Singapore" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "SB", name: "Solomon Islands" },
  { code: "SO", name: "Somalia" },
  { code: "ZA", name: "South Africa" },
  { code: "GS", name: "South Georgia And Sandwich Isl." },
  { code: "ES", name: "Spain" },
  { code: "LK", name: "Sri Lanka" },
  { code: "SD", name: "Sudan" },
  { code: "SR", name: "Suriname" },
  { code: "SJ", name: "Svalbard And Jan Mayen" },
  { code: "SZ", name: "Swaziland" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "SY", name: "Syrian Arab Republic" },
  { code: "TW", name: "Taiwan" },
  { code: "TJ", name: "Tajikistan" },
  { code: "TZ", name: "Tanzania" },
  { code: "TH", name: "Thailand" },
  { code: "TL", name: "Timor-Leste" },
  { code: "TG", name: "Togo" },
  { code: "TK", name: "Tokelau" },
  { code: "TO", name: "Tonga" },
  { code: "TT", name: "Trinidad And Tobago" },
  { code: "TN", name: "Tunisia" },
  { code: "TR", name: "Turkey" },
  { code: "TM", name: "Turkmenistan" },
  { code: "TC", name: "Turks And Caicos Islands" },
  { code: "TV", name: "Tuvalu" },
  { code: "UG", name: "Uganda" },
  { code: "UA", name: "Ukraine" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" },
  { code: "UM", name: "United States Outlying Islands" },
  { code: "UY", name: "Uruguay" },
  { code: "UZ", name: "Uzbekistan" },
  { code: "VU", name: "Vanuatu" },
  { code: "VE", name: "Venezuela" },
  { code: "VN", name: "Viet Nam" },
  { code: "VG", name: "Virgin Islands, British" },
  { code: "VI", name: "Virgin Islands, U.S." },
  { code: "WF", name: "Wallis And Futuna" },
  { code: "EH", name: "Western Sahara" },
  { code: "YE", name: "Yemen" },
  { code: "ZM", name: "Zambia" },
  { code: "ZW", name: "Zimbabwe" }
];

const Register = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const typeParam = searchParams.get('type');
  const registrationType = typeParam || 'parent';
  const showChooser = !typeParam;
  const { signUp, completeProfile, user } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [debitCardDialogOpen, setDebitCardDialogOpen] = useState(false);
  const [selectedPaymentAmount, setSelectedPaymentAmount] = useState(500);
  const [selectedPaymentType, setSelectedPaymentType] = useState("annual");
  const [promoOpen, setPromoOpen] = useState(showChooser);

  useEffect(() => {
    if (showChooser) setPromoOpen(true);
  }, [showChooser]);

  // If a Google-authed user already has a profile, send them straight into the app.
  useEffect(() => {
    if (!profileLoading && user && profile?.registration_type) {
      navigate('/lesson-vault-04-06', { replace: true });
    }
  }, [user, profile, profileLoading, navigate]);

  // Pre-fill email from authenticated session (Google sign-in)
  useEffect(() => {
    if (user?.email) {
      setFormData(prev => ({
        ...prev,
        email: prev.email || user.email || '',
        firstName: prev.firstName || (user.user_metadata?.given_name ?? user.user_metadata?.full_name?.split(' ')?.[0] ?? ''),
        lastName: prev.lastName || (user.user_metadata?.family_name ?? user.user_metadata?.full_name?.split(' ')?.slice(1).join(' ') ?? ''),
      }));
    }
  }, [user]);
   
  // Check if registration type is tech-teacher (only one that pays during registration)
  const requiresPayment = registrationType === 'tech-teacher';
  
  // Initial empty form state - used for resetting
  const getInitialFormData = () => ({
    // Common fields
    firstName: "",
    lastName: "",
    email: "",
    phoneCountryCode: "+27",
    phone1: "",
    phone2: "",
    phone3: "",
    state: "",
    country: "",
    username: "",
    password: "",
    confirmPassword: "",
    ecdPhoneCountryCode: "+27",
    
    // Parent/Learner specific
    institution: "",
    registrationStatus: "",
    numberOfKids: "",
    hearAbout: "",
    aspiration: "",
    learnerFirstName: "",
    learnerLastName: "",
    learnerGender: "",
    relationship: "",
    ecdPhone1: "",
    ecdPhone2: "",
    ecdPhone3: "",
    ecdEmail: "",
    
    // ECD Manager specific
    facilityName: "",
    facilityType: "",
    numberOfLearners: "",
    ageGroups: "",
    currentPrograms: "",
    techGoals: "",
    
    // Tech Teacher specific
    qualifications: "",
    experience: "",
    techSkills: "",
    programmingLanguages: "",
    teachingPhilosophy: "",
    availability: "",
    availableHours: "",
    salary: "",
    startDate: "",
    
    // Motivation
    otherMotivation: false,
    otherMotivationReason: "",
    
    // Terms agreement
    agreeToTerms: false,
  });
  
  const [formData, setFormData] = useState(getInitialFormData());
  
  // SECURITY: Clear all form data when component mounts or registration type changes
  // This ensures no previous user's data persists between registration attempts
  useEffect(() => {
    setFormData(getInitialFormData());
    setDebitCardDialogOpen(false);
  }, [registrationType]);

  const validatePassword = (pwd: string) => {
    const hasMinLength = pwd.length >= 7;
    const hasNumber = /\d/.test(pwd);
    const hasSpecial = /[_!$#]/.test(pwd);
    return { valid: hasMinLength && hasNumber && hasSpecial, hasMinLength, hasNumber, hasSpecial };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // For email/password sign-ups, enforce password rules
      if (!user) {
        const { valid } = validatePassword(formData.password);
        if (!valid) {
          setIsSubmitting(false);
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          setIsSubmitting(false);
          return;
        }
      }

      let success = false;
      if (user) {
        // Already authenticated (e.g. via Google) — just create the profile records
        const { error } = await completeProfile({ ...formData, registrationType });
        success = !error;
      } else {
        const { data, error } = await signUp(
          formData.email,
          formData.password,
          { ...formData, registrationType }
        );
        success = !!data && !error;
      }

      if (success) {
        if (registrationType === 'parent' || registrationType === 'ecd-manager' || registrationType === 'ecd') {
          navigate('/lesson-vault-04-06', { replace: true });
        } else {
          navigate('/', {
            state: {
              message: 'Registration successful! Please check your email to verify your account.'
            }
          });
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getFormTitle = () => {
    switch (registrationType) {
      case 'parent':
        return 'Parent / Guardian Registration Form';
      case 'ecd-manager':
      case 'ecd':
        return '';
      case 'tech-teacher':
        return 'Tech Teacher Mentorship Form';
      default:
        return 'Registration Form';
    }
  };

  const getFormSubtitle = () => {
    switch (registrationType) {
      case 'parent':
        return 'Register your child for our learning programs';
      case 'ecd-manager':
      case 'ecd':
        return 'Join our network of Early Childhood Development partners';
      case 'tech-teacher':
        return 'Apply to attend our ECD tech teacher mentorship events for 2026';
      default:
        return '';
    }
  };

  const renderParentForm = () => (
    <>
      {/* Registration Form */}
      <div className="space-y-6">
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">Province / State / Region *</Label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country *</Label>
          <Select onValueChange={(value) => handleInputChange("country", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.code} value={country.code}>{country.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            required
            readOnly={!!user}
          />
        </div>


        {/* Username and Password Creation */}
        <div className="space-y-4">
          {!user && <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">Create Password *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password || ''}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Min 7 chars, number & special char"
                required
              />
              <div className="text-xs space-y-0.5">
                <p className={validatePassword(formData.password).hasMinLength ? "text-green-600" : "text-gray-600"}>
                  {validatePassword(formData.password).hasMinLength ? "✓" : "○"} At least 7 characters
                </p>
                <p className={validatePassword(formData.password).hasNumber ? "text-green-600" : "text-gray-600"}>
                  {validatePassword(formData.password).hasNumber ? "✓" : "○"} Contains a number
                </p>
                <p className={validatePassword(formData.password).hasSpecial ? "text-green-600" : "text-gray-600"}>
                  {validatePassword(formData.password).hasSpecial ? "✓" : "○"} Contains _, !, $, or #
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword || ''}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                placeholder="Re-enter your password"
                required
              />
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-xs text-red-600">Passwords do not match</p>
              )}
            </div>
          </div>}
        </div>
      </div>


    </>
  );

  const renderECDManagerForm = () => (
    <>
      {/* ECD Manager Registration Form Header */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-primary">ECD Manager Registration Form</h2>
        <p className="text-sm text-muted-foreground mt-1">ECD Centers | Pre-Schools | Creches | Primary Schools and Other</p>
      </div>

      {/* Personal Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Manager Information</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className="text-black bg-green-50"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className="text-black bg-green-50"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="text-black bg-green-50"
            required
            readOnly={!!user}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">Province / State / Region *</Label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
            className="text-black bg-green-50"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country *</Label>
          <Select onValueChange={(value) => handleInputChange("country", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.code} value={country.code}>{country.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Username and Password Creation */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username-ecd">Create Username *</Label>
            <Input
              id="username-ecd"
              value={formData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              placeholder="Enter desired username"
              className="text-black bg-green-50"
              required
            />
          </div>
          {!user && <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password-ecd">Create Password *</Label>
              <Input
                id="password-ecd"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Min 7 chars, number & special char"
                className="text-black bg-green-50"
                required
              />
              <div className="text-xs space-y-0.5">
                <p className={validatePassword(formData.password).hasMinLength ? "text-green-600" : "text-gray-600"}>
                  {validatePassword(formData.password).hasMinLength ? "✓" : "○"} At least 7 characters
                </p>
                <p className={validatePassword(formData.password).hasNumber ? "text-green-600" : "text-gray-600"}>
                  {validatePassword(formData.password).hasNumber ? "✓" : "○"} Contains a number
                </p>
                <p className={validatePassword(formData.password).hasSpecial ? "text-green-600" : "text-gray-600"}>
                  {validatePassword(formData.password).hasSpecial ? "✓" : "○"} Contains _, !, $, or #
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword-ecd">Confirm Password *</Label>
              <Input
                id="confirmPassword-ecd"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                placeholder="Re-enter your password"
                className="text-black bg-green-50"
                required
              />
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-xs text-red-600">Passwords do not match</p>
              )}
            </div>
          </div>}
        </div>
      </div>

      <Separator />

      {/* Motivation for Tech Lessons */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Motivation for Tech Lessons</h3>

        <div className="space-y-4">
          <Label>Motivation for Participation *</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="introduce-tech" className="rounded border-border" />
              <Label htmlFor="introduce-tech">Introduce Tech Lessons at My School</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="hire-teachers" className="rounded border-border" />
              <Label htmlFor="hire-teachers">Hire Tech Teachers</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="adaptation" className="rounded border-border" />
              <Label htmlFor="adaptation">Adaptation</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="other-motivation"
                className="rounded border-border"
                checked={formData.otherMotivation}
                onChange={(e) => handleInputChange("otherMotivation", e.target.checked)}
              />
              <Label htmlFor="other-motivation">Other</Label>
            </div>
            {formData.otherMotivation && (
              <div className="space-y-2 pt-1 pl-6">
                <Label htmlFor="other-motivation-reason">Please specify your reason *</Label>
                <Input
                  id="other-motivation-reason"
                  value={formData.otherMotivationReason}
                  onChange={(e) => handleInputChange("otherMotivationReason", e.target.value)}
                  placeholder="Enter your reason"
                  className="text-black bg-green-50"
                  required
                />
              </div>
            )}
          </div>
        </div>
      </div>
      
    </>
  );

  const renderTechTeacherForm = () => (
    <>
      {/* Personal Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Personal Information</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className="text-black bg-green-50"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className="text-black bg-green-50"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="text-black bg-green-50"
            required
            readOnly={!!user}
          />
        </div>

        <div className="space-y-2">
          <Label>Phone Number (Whatsapp) *</Label>
          <div className="flex gap-2">
            <Select value={formData.phoneCountryCode} onValueChange={(value) => handleInputChange("phoneCountryCode", value)}>
              <SelectTrigger className="w-32 text-black bg-green-50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {countryCodes.map((country) => (
                  <SelectItem key={country.code} value={country.dialCode}>
                    {country.dialCode}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              className="w-20 text-black bg-green-50"
              placeholder="###"
              maxLength={3}
              value={formData.phone1}
              onChange={(e) => handleInputChange("phone1", e.target.value)}
              required
            />
            <span className="flex items-center">-</span>
            <Input
              className="w-20 text-black bg-green-50"
              placeholder="###"
              maxLength={3}
              value={formData.phone2}
              onChange={(e) => handleInputChange("phone2", e.target.value)}
              required
            />
            <span className="flex items-center">-</span>
            <Input
              className="w-24 text-black bg-green-50"
              placeholder="####"
              maxLength={4}
              value={formData.phone3}
              onChange={(e) => handleInputChange("phone3", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="state-tech">Province / State / Region *</Label>
          <Input
            id="state-tech"
            value={formData.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
            className="text-black bg-green-50"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="country-tech">Country *</Label>
          <Select onValueChange={(value) => handleInputChange("country", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.code} value={country.code}>{country.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Username and Password Creation */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username-tech">Create Username *</Label>
            <Input
              id="username-tech"
              value={formData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              placeholder="Enter desired username"
              className="text-black bg-green-50"
              required
            />
          </div>
          {!user && <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password-tech">Create Password *</Label>
              <Input
                id="password-tech"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Min 7 chars, number & special char"
                className="text-black bg-green-50"
                required
              />
              <div className="text-xs space-y-0.5">
                <p className={validatePassword(formData.password).hasMinLength ? "text-green-600" : "text-gray-600"}>
                  {validatePassword(formData.password).hasMinLength ? "✓" : "○"} At least 7 characters
                </p>
                <p className={validatePassword(formData.password).hasNumber ? "text-green-600" : "text-gray-600"}>
                  {validatePassword(formData.password).hasNumber ? "✓" : "○"} Contains a number
                </p>
                <p className={validatePassword(formData.password).hasSpecial ? "text-green-600" : "text-gray-600"}>
                  {validatePassword(formData.password).hasSpecial ? "✓" : "○"} Contains _, !, $, or #
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword-tech">Confirm Password *</Label>
              <Input
                id="confirmPassword-tech"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                placeholder="Re-enter your password"
                className="text-black bg-green-50"
                required
              />
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-xs text-red-600">Passwords do not match</p>
              )}
            </div>
          </div>}
        </div>
      </div>

      <Separator />

      {/* Professional Qualifications */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Professional Qualifications</h3>
        
        <div className="space-y-2">
          <Label htmlFor="qualifications">Educational Qualifications *</Label>
          <Textarea
            id="qualifications"
            rows={4}
            value={formData.qualifications}
            onChange={(e) => handleInputChange("qualifications", e.target.value)}
            placeholder="List your degrees, certifications, and relevant qualifications..."
            className="text-black bg-green-50"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience">Teaching Experience *</Label>
          <Textarea
            id="experience"
            rows={4}
            value={formData.experience}
            onChange={(e) => handleInputChange("experience", e.target.value)}
            placeholder="Describe your teaching experience, especially with children..."
            className="text-black bg-green-50"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="techSkills">Technology Skills *</Label>
          <Textarea
            id="techSkills"
            rows={4}
            value={formData.techSkills}
            onChange={(e) => handleInputChange("techSkills", e.target.value)}
            placeholder="List your technical skills relevant to teaching kids..."
            className="text-black bg-green-50"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="resume">Upload One Page Resume *</Label>
          <Input
            id="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            className="w-full p-3 border rounded-md"
            required
          />
          <p className="text-sm text-gray-600">Please upload your resume (PDF, DOC, or DOCX format, max 1 page)</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="programmingLanguages">Programming Languages Known</Label>
          <Input
            id="programmingLanguages"
            value={formData.programmingLanguages}
            onChange={(e) => handleInputChange("programmingLanguages", e.target.value)}
            placeholder="e.g., Scratch, Python, JavaScript, HTML/CSS"
            className="text-black bg-green-50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="teachingPhilosophy">Teaching Philosophy *</Label>
          <Textarea
            id="teachingPhilosophy"
            rows={4}
            value={formData.teachingPhilosophy}
            onChange={(e) => handleInputChange("teachingPhilosophy", e.target.value)}
            placeholder="Describe your approach to teaching technology to young learners..."
            className="text-black bg-green-50"
            required
          />
        </div>
      </div>

      <Separator />

      {/* Employment Details */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Employment Conditions</h3>
        
        <div className="space-y-2">
          <Label htmlFor="availability">Availability *</Label>
          <Select onValueChange={(value) => handleInputChange("availability", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="on-site">On Site</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="availableHours">Hours Per Week *</Label>
          <Select onValueChange={(value) => handleInputChange("availableHours", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select hours per week" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="part-time">Part-time (10-20 hours)</SelectItem>
              <SelectItem value="full-time">Full-time (40+ hours)</SelectItem>
              <SelectItem value="flexible">Flexible/Contract</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="salary">Expected Salary Range *</Label>
          <Select onValueChange={(value) => handleInputChange("salary", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select salary range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15000-25000">R15,000 - R25,000</SelectItem>
              <SelectItem value="25000-35000">R25,000 - R35,000</SelectItem>
              <SelectItem value="35000-50000">R35,000 - R50,000</SelectItem>
              <SelectItem value="50000+">R50,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="startDate">Available Start Date *</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => handleInputChange("startDate", e.target.value)}
            className="text-black bg-green-50"
            required
          />
        </div>
      </div>
    </>
  );

  const renderForm = () => {
    switch (registrationType) {
      case 'parent':
        return renderParentForm();
      case 'ecd-manager':
      case 'ecd':
        return renderECDManagerForm();
      case 'tech-teacher':
        return renderTechTeacherForm();
      default:
        return renderParentForm();
    }
  };

  if (showChooser) {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <Dialog open={promoOpen} onOpenChange={setPromoOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl flex items-center justify-center gap-2">
                <Sparkles className="h-6 w-6 text-lime-500" />
                Welcome to ECDcoding!
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="rounded-lg border-2 border-lime-400 bg-lime-50 p-4">
                <div className="flex items-center gap-3">
                  <Gift className="h-8 w-8 text-lime-600 shrink-0" />
                  <div>
                    <p className="font-bold text-lime-900">30 Day Free Trial</p>
                    <p className="text-sm text-lime-800">
                      Get full access to the My Lesson Vault — free for 30 days, no payment required.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border-2 border-blue-400 bg-blue-50 p-4">
                <div className="flex items-center gap-3">
                  <Zap className="h-8 w-8 text-blue-600 shrink-0" />
                  <div>
                    <p className="font-bold text-blue-900">Reload Credits Anytime</p>
                    <p className="text-sm text-blue-800">
                      Top up credits via PayFast (R100) to keep learning beyond your daily free credits.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground pt-2">
                Continue to register as a Parent / Guardian or ECD Manager.
              </p>
              <Button className="w-full" onClick={() => setPromoOpen(false)}>
                Continue to Registration
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Card className="border-2 border-foreground max-w-lg w-full">
          <CardHeader className="text-center">
            <div className="mb-6">
              <img
                src="/lovable-uploads/6f846a04-7251-473a-8a8d-adf8aa1bb9c1.png"
                alt="ECDcoding Logo"
                className="mx-auto h-24 w-auto"
              />
            </div>
            <CardTitle className="text-2xl">Get Started — Register</CardTitle>
            <p className="text-muted-foreground mt-2">Choose how you'd like to register to access your 04 - 07 My Lesson Vault.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              type="button"
              className="w-full h-14 text-base"
              onClick={() => navigate('/register?type=parent')}
            >
              Parent / Guardian
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full h-14 text-base"
              onClick={() => navigate('/register?type=ecd-manager')}
            >
              ECD Manager
            </Button>
            <div className="text-center pt-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <Card className="border-2 border-foreground">
          <CardHeader className="text-center">
            <div className="mb-6">
              <img 
                src="/lovable-uploads/6f846a04-7251-473a-8a8d-adf8aa1bb9c1.png" 
                alt="ECDcoding Logo - Empowering Tech Savvy Kids" 
                className="mx-auto h-32 w-auto"
              />
            </div>
            <CardTitle className="text-2xl">{getFormTitle()}</CardTitle>
            {registrationType !== 'parent' && registrationType !== 'ecd-manager' && registrationType !== 'ecd' && (
              <p className="text-muted-foreground">
                {getFormSubtitle()}
              </p>
            )}
          </CardHeader>
          
          <CardContent className="register-form-theme">
            <form onSubmit={handleSubmit} className="space-y-8 text-foreground font-semibold">
              {renderForm()}

              {/* Payment Section */}
              {registrationType === 'tech-teacher' && (
                <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200 text-center">
                  <h3 className="text-lg font-semibold mb-2">Registration Fee</h3>
                  <p className="text-xl font-bold text-blue-600 mb-4">R500.00 /annual</p>
                  <Button 
                    type="button" 
                    className="bg-[#132a13] hover:bg-[#132a13]/90 text-yellow-400 hover:text-yellow-300"
                    onClick={() => { setSelectedPaymentAmount(500); setSelectedPaymentType("annual"); setDebitCardDialogOpen(true); }}
                  >
                    Pay with PayFast
                  </Button>
                </div>
              )}


              {/* Terms and Policy Agreement */}
              <div className="flex items-start space-x-3 p-4 border rounded-lg bg-muted/50">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                  className="mt-1"
                />
                <div className="space-y-1">
                  <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                    I agree to the{" "}
                    <Dialog>
                      <DialogTrigger asChild>
                        <span className="text-primary underline cursor-pointer hover:text-primary/80">
                          Terms and Policy
                        </span>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            ECDcoding Terms and Policy
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 text-sm">
                          <section>
                            <h3 className="font-semibold text-base mb-2">1. Terms of Service</h3>
                            <p className="mb-2">
                              By registering with ECDcoding, you agree to comply with these terms and conditions. 
                              Our platform provides technology education services for early childhood development.
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                              <li>All users must provide accurate information during registration</li>
                              <li>Services are subject to availability and may change without notice</li>
                              <li>Users are responsible for maintaining account security</li>
                            </ul>
                          </section>

                          <section>
                            <h3 className="font-semibold text-base mb-2">2. Privacy Policy</h3>
                            <p className="mb-2">
                              We are committed to protecting your privacy and the privacy of the children in our programs.
                              <br />
                              <Link to="/privacy-policy" className="text-primary underline hover:text-primary/80" target="_blank">
                                Read Full Privacy Policy →
                              </Link>
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                              <li>Personal information is collected only for educational and administrative purposes</li>
                              <li>Child data is protected according to applicable child protection laws</li>
                              <li>Information is not shared with third parties without consent</li>
                              <li>Parents have the right to access and update their child's information</li>
                              <li>You can request data deletion at any time - <Link to="/data-deletion" className="text-primary underline hover:text-primary/80" target="_blank">View Instructions</Link></li>
                            </ul>
                          </section>

                          <section>
                            <h3 className="font-semibold text-base mb-2">3. Payment Terms</h3>
                            <p className="mb-2">
                              Registration fees are required to access our services:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                              <li>Parent/Guardian: R250/month or R3000/annual</li>
                              <li>ECD Managers: R250/month or R3000/annual</li>
                              <li>Tech Teacher: R500/annual</li>
                              <li>Early bird registrations receive 24-month payment exemptions</li>
                              <li>Refunds are subject to our refund policy terms</li>
                            </ul>
                          </section>

                          <section>
                            <h3 className="font-semibold text-base mb-2">4. Educational Content</h3>
                            <p className="mb-2">
                              Our educational materials and programs are designed for children aged 4-10:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                              <li>Content is age-appropriate and pedagogically sound</li>
                              <li>All materials are the intellectual property of ECDcoding</li>
                              <li>Unauthorized reproduction or distribution is prohibited</li>
                            </ul>
                          </section>

                          <section>
                            <h3 className="font-semibold text-base mb-2">5. Child Safety</h3>
                            <p className="mb-2">
                              Child safety is our top priority:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                              <li>All staff and teachers undergo background checks</li>
                              <li>Online sessions are monitored and recorded for quality assurance</li>
                              <li>Inappropriate behavior will result in immediate suspension</li>
                              <li>Parents must supervise children during online activities</li>
                            </ul>
                          </section>

                          <section>
                            <h3 className="font-semibold text-base mb-2">6. Limitation of Liability</h3>
                            <p className="mb-2">
                              ECDcoding's liability is limited to the extent permitted by law. We are not responsible for:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                              <li>Technical issues beyond our control</li>
                              <li>Individual learning outcomes</li>
                              <li>Third-party content or services</li>
                            </ul>
                          </section>

                          <section>
                            <h3 className="font-semibold text-base mb-2">7. Contact Information</h3>
                            <p>
                              For questions about these terms or our services, please contact us through our website 
                              or email support. We are committed to addressing your concerns promptly.
                            </p>
                          </section>
                        </div>
                      </DialogContent>
                    </Dialog>
                    {" "}of ECDcoding *
                  </Label>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 pt-6">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full max-w-md"
                  disabled={!formData.agreeToTerms || isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 
                   registrationType === 'tech-teacher' ? 'Submit Application' : 'Submit Registration'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Payment Dialog */}
      <DebitCardPaymentDialog 
        open={debitCardDialogOpen} 
        onOpenChange={setDebitCardDialogOpen}
        onPaymentComplete={() => setDebitCardDialogOpen(false)}
        amount={selectedPaymentAmount}
        paymentType={selectedPaymentType}
      />
    </div>
  );
};

export default Register;