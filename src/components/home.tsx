import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";
import { Upload, Camera, Star, Shield, Clock, CheckCircle, User, Mail, Lock, Eye, EyeOff, Download, CreditCard, History, Image as ImageIcon, Globe } from "lucide-react";

interface UserImage {
  id: string;
  originalImage: string;
  lowResDemo?: string;
  highResImage?: string;
  uploadDate: string;
  status: 'processing' | 'demo-ready' | 'purchased';
  type: string;
}

interface PaymentRecord {
  id: string;
  imageId: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

const translations = {
  en: {
    // Navigation
    howItWorks: "How it Works",
    examples: "Examples",
    pricing: "Pricing",
    login: "Login",
    myAccount: "My Account",
    
    // Hero Section
    professionalPhotoEditing: "Professional Photo Editing",
    transformYour: "Transform Your",
    selfieInto: "Selfie Into",
    professional: "Professional",
    portraits: "Portraits",
    heroDescription: "Upload your selfie and our expert team will transform it into a stunning professional profile picture, application photo, or photoshoot-quality image.",
    uploadYourSnapshot: "Upload Your Snapshot",
    viewExamples: "View Examples",
    freeDemoIncluded: "Free demo included",
    delivery24h: "24h delivery",
    secure100: "100% secure",
    
    // How It Works
    howItWorksTitle: "How It Works",
    howItWorksSubtitle: "Three simple steps to get your professional portrait",
    step1Title: "1. Upload",
    step1Description: "Upload your selfie through our secure platform. Any smartphone photo works perfectly.",
    step2Title: "2. We Edit",
    step2Description: "Our professional team transforms your photo into a stunning professional portrait.",
    step3Title: "3. Receive",
    step3Description: "Get your free demo within 24 hours. Love it? Purchase the full resolution for CHF 29.",
    
    // Examples
    beforeAfter: "Before & After",
    examplesSubtitle: "See the incredible transformations our team creates",
    linkedinProfile: "LinkedIn Profile",
    professionalHeadshot: "Professional Headshot",
    businessPortrait: "Business Portrait",
    
    // Pricing
    simplePricing: "Simple Pricing",
    pricingSubtitle: "Choose the package that fits your needs",
    professionalEdit: "Professional Profile Picture",
    photoShootSet: "Professional Photo Shoot Set",
    freeDemo: "Free low-resolution demo",
    professionalEditing: "Professional editing by experts",
    highResolution: "High-resolution final image",
    delivery24hours: "24-hour delivery",
    multipleFormats: "Multiple format options",
    classicalProfiles: "2 classical profile pictures",
    expressiveHeadshots: "2 expressive headshots",
    creativePicture: "1 creative picture",
    startTransformation: "Start Your Transformation",
    
    // CTA
    readyForPortrait: "Ready for Your Professional Portrait?",
    ctaSubtitle: "Join thousands of professionals who trust Luminis for their profile pictures",
    uploadNow: "Upload Your Snapshot Now",
    noCommitment: "No commitment required • Free demo included • Secure upload",
    
    // Upload Dialog
    uploadDialogTitle: "Upload Your Photo",
    selectPhoto: "Select Photo",
    additionalComments: "Additional Comments (Optional)",
    commentsPlaceholder: "Any specific requirements or preferences for your professional photo...",
    uploadButton: "Upload Photo",
    
    // Auth
    loginToLuminis: "Login to Luminis",
    email: "Email",
    password: "Password",
    noAccountYet: "No account yet?",
    signUp: "Sign up",
    createAccount: "Create Account",
    fullName: "Full Name",
    
    // Account
    myImages: "My Images",
    paymentHistory: "Payment History",
    original: "Original",
    demoLowRes: "Demo (Low-res)",
    highResolution2: "High-resolution",
    buyHighRes: "Buy High-res",
    download: "Download",
    uploaded: "Uploaded:",
    processing: "Processing",
    demoReady: "Demo Ready",
    purchased: "Purchased",
    completed: "completed",
    
    // Footer
    footerDescription: "Professional photo editing service transforming selfies into stunning professional portraits.",
    service: "Service",
    faq: "FAQ",
    account: "Account",
    myPhotos: "My Photos",
    support: "Support",
    contactUs: "Contact Us",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    refundPolicy: "Refund Policy",
    allRightsReserved: "All rights reserved."
  },
  de: {
    // Navigation
    howItWorks: "So funktioniert's",
    examples: "Beispiele",
    pricing: "Preise",
    login: "Anmelden",
    myAccount: "Mein Konto",
    
    // Hero Section
    professionalPhotoEditing: "Professionelle Fotobearbeitung",
    transformYour: "Verwandeln Sie Ihr",
    selfieInto: "Selfie in",
    professional: "Professionelle",
    portraits: "Portraits",
    heroDescription: "Laden Sie Ihr Selfie hoch und unser Expertenteam verwandelt es in ein atemberaubendes professionelles Profilbild, Bewerbungsfoto oder Fotoshooting-Qualitätsbild.",
    uploadYourSnapshot: "Foto hochladen",
    viewExamples: "Beispiele ansehen",
    freeDemoIncluded: "Kostenlose Demo inklusive",
    delivery24h: "24h Lieferung",
    secure100: "100% sicher",
    
    // How It Works
    howItWorksTitle: "So funktioniert's",
    howItWorksSubtitle: "Drei einfache Schritte zu Ihrem professionellen Portrait",
    step1Title: "1. Hochladen",
    step1Description: "Laden Sie Ihr Selfie über unsere sichere Plattform hoch. Jedes Smartphone-Foto funktioniert perfekt.",
    step2Title: "2. Wir bearbeiten",
    step2Description: "Unser professionelles Team verwandelt Ihr Foto in ein atemberaubendes professionelles Portrait.",
    step3Title: "3. Erhalten",
    step3Description: "Erhalten Sie Ihre kostenlose Demo innerhalb von 24 Stunden. Gefällt es Ihnen? Kaufen Sie die volle Auflösung für CHF 29.",
    
    // Examples
    beforeAfter: "Vorher & Nachher",
    examplesSubtitle: "Sehen Sie die unglaublichen Transformationen, die unser Team erstellt",
    linkedinProfile: "LinkedIn Profil",
    professionalHeadshot: "Professionelles Headshot",
    businessPortrait: "Business Portrait",
    
    // Pricing
    simplePricing: "Einfache Preise",
    pricingSubtitle: "Wählen Sie das Paket, das zu Ihren Bedürfnissen passt",
    professionalEdit: "Professionelles Profilbild",
    photoShootSet: "Professionelles Fotoshooting-Set",
    freeDemo: "Kostenlose Demo in niedriger Auflösung",
    professionalEditing: "Professionelle Bearbeitung durch Experten",
    highResolution: "Hochauflösendes Endbild",
    delivery24hours: "24-Stunden-Lieferung",
    multipleFormats: "Mehrere Formatoptionen",
    classicalProfiles: "2 klassische Profilbilder",
    expressiveHeadshots: "2 ausdrucksstarke Headshots",
    creativePicture: "1 kreatives Bild",
    startTransformation: "Transformation starten",
    
    // CTA
    readyForPortrait: "Bereit für Ihr professionelles Portrait?",
    ctaSubtitle: "Schließen Sie sich Tausenden von Fachleuten an, die Luminis für ihre Profilbilder vertrauen",
    uploadNow: "Foto jetzt hochladen",
    noCommitment: "Keine Verpflichtung erforderlich • Kostenlose Demo inklusive • Sicherer Upload",
    
    // Upload Dialog
    uploadDialogTitle: "Foto hochladen",
    selectPhoto: "Foto auswählen",
    additionalComments: "Zusätzliche Kommentare (Optional)",
    commentsPlaceholder: "Spezielle Anforderungen oder Wünsche für Ihr professionelles Foto...",
    uploadButton: "Foto hochladen",
    
    // Auth
    loginToLuminis: "Bei Luminis anmelden",
    email: "E-Mail",
    password: "Passwort",
    noAccountYet: "Noch kein Konto?",
    signUp: "Registrieren",
    createAccount: "Konto erstellen",
    fullName: "Vollständiger Name",
    
    // Account
    myImages: "Meine Bilder",
    paymentHistory: "Zahlungshistorie",
    original: "Original",
    demoLowRes: "Demo (Niedrige Auflösung)",
    highResolution2: "Hohe Auflösung",
    buyHighRes: "Hohe Auflösung kaufen",
    download: "Herunterladen",
    uploaded: "Hochgeladen:",
    processing: "Wird bearbeitet",
    demoReady: "Demo bereit",
    purchased: "Gekauft",
    completed: "abgeschlossen",
    
    // Footer
    footerDescription: "Professioneller Fotobearbeitungsservice, der Selfies in atemberaubende professionelle Portraits verwandelt.",
    service: "Service",
    faq: "FAQ",
    account: "Konto",
    myPhotos: "Meine Fotos",
    support: "Support",
    contactUs: "Kontakt",
    privacyPolicy: "Datenschutzrichtlinie",
    termsOfService: "Nutzungsbedingungen",
    refundPolicy: "Rückerstattungsrichtlinie",
    allRightsReserved: "Alle Rechte vorbehalten."
  }
};

const Home = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showAccountDialog, setShowAccountDialog] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState<'en' | 'de'>('en');
  const [uploadComments, setUploadComments] = useState('');
  const [authForm, setAuthForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: ""
  });

  const t = translations[language];

  // Mock user data
  const [userImages] = useState<UserImage[]>([
    {
      id: "1",
      originalImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&q=60",
      lowResDemo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
      uploadDate: "2024-01-15",
      status: "demo-ready",
      type: t.linkedinProfile
    },
    {
      id: "2",
      originalImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=60",
      lowResDemo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&q=80",
      highResImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800&q=90",
      uploadDate: "2024-01-10",
      status: "purchased",
      type: t.professionalHeadshot
    },
    {
      id: "3",
      originalImage: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=300&q=60",
      uploadDate: "2024-01-20",
      status: "processing",
      type: t.businessPortrait
    }
  ]);

  const [paymentHistory] = useState<PaymentRecord[]>([
    {
      id: "pay_1",
      imageId: "2",
      amount: 29,
      date: "2024-01-11",
      status: "completed"
    }
  ]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setIsUploading(true);
      // Simulate upload process
      setTimeout(() => {
        setIsUploading(false);
        setShowUploadDialog(false);
        alert("Upload successful! You'll receive your demo within 24 hours.");
      }, 2000);
    }
  };

  const handleAuth = (type: 'signin' | 'signup') => {
    // Simulate authentication
    setIsLoggedIn(true);
    setShowAuthDialog(false);
    alert(`${type === 'signin' ? 'Signed in' : 'Account created'} successfully!`);
  };

  const triggerFileUpload = () => {
    if (!isLoggedIn) {
      setShowAuthDialog(true);
      return;
    }
    setShowUploadDialog(true);
  };

  const handleBuyImage = (imageId: string) => {
    // This will be replaced with actual Stripe integration
    alert(`Stripe payment dialog would open here for CHF 29 to purchase high-resolution image ${imageId}`);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'de' : 'en');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-sm border-b border-gray-200 transition-all duration-300">
        <div className="flex items-center group cursor-pointer">
          <img 
            src="/Logo_Short_black.png" 
            alt="Luminis Logo" 
            className="w-8 h-8 mr-2 transition-transform duration-300 group-hover:scale-110"
          />
          <h1 className="text-2xl font-bold text-black">Luminis</h1>
        </div>
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => scrollToSection('how-it-works')}
            className="text-sm font-medium text-gray-600 hover:text-black transition-all duration-300 hover:scale-105"
          >
            {t.howItWorks}
          </button>
          <button 
            onClick={() => scrollToSection('examples')}
            className="text-sm font-medium text-gray-600 hover:text-black transition-all duration-300 hover:scale-105"
          >
            {t.examples}
          </button>
          <button 
            onClick={() => scrollToSection('pricing')}
            className="text-sm font-medium text-gray-600 hover:text-black transition-all duration-300 hover:scale-105"
          >
            {t.pricing}
          </button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center space-x-1"
          >
            <Globe className="w-4 h-4" />
            <span>{language.toUpperCase()}</span>
          </Button>
          
          {isLoggedIn ? (
            <Dialog open={showAccountDialog} onOpenChange={setShowAccountDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                    <User className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-medium">{t.myAccount}</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">{t.myAccount}</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="images" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="images" className="flex items-center space-x-2">
                      <ImageIcon className="w-4 h-4" />
                      <span>{t.myImages}</span>
                    </TabsTrigger>
                    <TabsTrigger value="payments" className="flex items-center space-x-2">
                      <History className="w-4 h-4" />
                      <span>{t.paymentHistory}</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="images" className="space-y-6 mt-6">
                    <div className="grid gap-6">
                      {userImages.map((image) => (
                        <Card key={image.id} className="border-0 shadow-lg">
                          <CardHeader>
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-lg">{image.type}</CardTitle>
                              <Badge variant={
                                image.status === 'purchased' ? 'default' : 
                                image.status === 'demo-ready' ? 'secondary' : 
                                'outline'
                              }>
                                {image.status === 'purchased' ? t.purchased : 
                                 image.status === 'demo-ready' ? t.demoReady : 
                                 t.processing}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{t.uploaded} {new Date(image.uploadDate).toLocaleDateString()}</p>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {/* Original Image */}
                              <div className="space-y-2">
                                <h4 className="font-medium text-sm">{t.original}</h4>
                                <img
                                  src={image.originalImage}
                                  alt="Original upload"
                                  className="w-full h-32 object-cover rounded-lg"
                                />
                              </div>
                              
                              {/* Low-res Demo */}
                              {image.lowResDemo && (
                                <div className="space-y-2">
                                  <h4 className="font-medium text-sm">{t.demoLowRes}</h4>
                                  <img
                                    src={image.lowResDemo}
                                    alt="Low-res demo"
                                    className="w-full h-32 object-cover rounded-lg"
                                  />
                                  {image.status === 'demo-ready' && (
                                    <Button 
                                      onClick={() => handleBuyImage(image.id)}
                                      className="w-full bg-black hover:bg-gray-800 text-sm"
                                    >
                                      <CreditCard className="w-4 h-4 mr-2" />
                                      {t.buyHighRes} (CHF 29)
                                    </Button>
                                  )}
                                </div>
                              )}
                              
                              {/* High-res Image */}
                              {image.highResImage && (
                                <div className="space-y-2">
                                  <h4 className="font-medium text-sm">{t.highResolution2}</h4>
                                  <img
                                    src={image.highResImage}
                                    alt="High-res final"
                                    className="w-full h-32 object-cover rounded-lg"
                                  />
                                  <Button variant="outline" className="w-full text-sm">
                                    <Download className="w-4 h-4 mr-2" />
                                    {t.download}
                                  </Button>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="payments" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      {paymentHistory.map((payment) => {
                        const relatedImage = userImages.find(img => img.id === payment.imageId);
                        return (
                          <Card key={payment.id} className="border-0 shadow-lg">
                            <CardContent className="pt-6">
                              <div className="flex justify-between items-center">
                                <div>
                                  <h4 className="font-medium">{relatedImage?.type || t.professionalEdit}</h4>
                                  <p className="text-sm text-gray-600">
                                    {new Date(payment.date).toLocaleDateString()}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold">CHF {payment.amount}</p>
                                  <Badge variant={payment.status === 'completed' ? 'default' : 'outline'}>
                                    {payment.status === 'completed' ? t.completed : payment.status}
                                  </Badge>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          ) : (
            <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
              <DialogTrigger asChild>
                <Button className="text-sm bg-black hover:bg-gray-800 transition-all duration-300 hover:scale-105">
                  <User className="w-4 h-4 mr-2" />
                  {t.login}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-center text-2xl font-bold">{t.loginToLuminis}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">{t.email}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="your@email.com"
                        className="pl-10"
                        value={authForm.email}
                        onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">{t.password}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        value={authForm.password}
                        onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleAuth('signin')} 
                    className="w-full bg-black hover:bg-gray-800 transition-all duration-300"
                  >
                    {t.login}
                  </Button>
                  
                  <div className="text-center pt-4">
                    <p className="text-sm text-gray-600">
                      {t.noAccountYet}{" "}
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="text-black font-medium hover:underline">
                            {t.signUp}
                          </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle className="text-center text-2xl font-bold">{t.createAccount}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 mt-6">
                            <div className="space-y-2">
                              <Label htmlFor="signup-name">{t.fullName}</Label>
                              <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                  id="signup-name"
                                  type="text"
                                  placeholder="John Doe"
                                  className="pl-10"
                                  value={authForm.name}
                                  onChange={(e) => setAuthForm({...authForm, name: e.target.value})}
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="signup-email">{t.email}</Label>
                              <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                  id="signup-email"
                                  type="email"
                                  placeholder="your@email.com"
                                  className="pl-10"
                                  value={authForm.email}
                                  onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="signup-password">{t.password}</Label>
                              <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                  id="signup-password"
                                  type={showPassword ? "text" : "password"}
                                  placeholder="••••••••"
                                  className="pl-10 pr-10"
                                  value={authForm.password}
                                  onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                >
                                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                              </div>
                            </div>
                            <Button 
                              onClick={() => handleAuth('signup')} 
                              className="w-full bg-black hover:bg-gray-800 transition-all duration-300"
                            >
                              {t.createAccount}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </nav>

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">{t.uploadDialogTitle}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="photo-upload">{t.selectPhoto}</Label>
              <Input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="cursor-pointer"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="comments">{t.additionalComments}</Label>
              <Textarea
                id="comments"
                placeholder={t.commentsPlaceholder}
                value={uploadComments}
                onChange={(e) => setUploadComments(e.target.value)}
                rows={4}
              />
            </div>
            <Button 
              onClick={() => document.getElementById('photo-upload')?.click()}
              className="w-full bg-black hover:bg-gray-800 transition-all duration-300"
              disabled={isUploading}
            >
              <Upload className="w-4 h-4 mr-2" />
              {isUploading ? "Uploading..." : t.uploadButton}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <Badge className="mb-4 bg-gray-100 text-gray-800 hover:bg-gray-200 transition-all duration-300 hover:scale-105">
                {t.professionalPhotoEditing}
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
                {t.transformYour}
                <span className="block text-gray-600 animate-fade-in-up animation-delay-200">{t.selfieInto}</span>
                <span className="block animate-fade-in-up animation-delay-400">{t.professional}</span>
                <span className="block animate-fade-in-up animation-delay-600">{t.portraits}</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed animate-fade-in-up animation-delay-800">
                {t.heroDescription}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up animation-delay-1000">
                <Button 
                  size="lg" 
                  className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  disabled={isUploading}
                  onClick={triggerFileUpload}
                >
                  <Upload className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
                  {isUploading ? "Uploading..." : t.uploadYourSnapshot}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  onClick={() => scrollToSection('examples')}
                >
                  {t.viewExamples}
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600 animate-fade-in-up animation-delay-1200">
                <div className="flex items-center group">
                  <CheckCircle className="w-4 h-4 mr-1 text-green-600 transition-transform duration-300 group-hover:scale-110" />
                  {t.freeDemoIncluded}
                </div>
                <div className="flex items-center group">
                  <Clock className="w-4 h-4 mr-1 text-blue-600 transition-transform duration-300 group-hover:scale-110" />
                  {t.delivery24h}
                </div>
                <div className="flex items-center group">
                  <Shield className="w-4 h-4 mr-1 text-purple-600 transition-transform duration-300 group-hover:scale-110" />
                  {t.secure100}
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in-right">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80"
                    alt="Professional headshot example"
                    className="rounded-lg shadow-lg w-full transition-all duration-500 hover:scale-105 hover:shadow-xl"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&q=80"
                    alt="Professional portrait example"
                    className="rounded-lg shadow-lg w-full transition-all duration-500 hover:scale-105 hover:shadow-xl animation-delay-200"
                  />
                </div>
                <div className="space-y-4 mt-8">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80"
                    alt="Business portrait example"
                    className="rounded-lg shadow-lg w-full transition-all duration-500 hover:scale-105 hover:shadow-xl animation-delay-400"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80"
                    alt="Professional headshot example"
                    className="rounded-lg shadow-lg w-full transition-all duration-500 hover:scale-105 hover:shadow-xl animation-delay-600"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">{t.howItWorksTitle}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.howItWorksSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-0 shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-xl group">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-gray-800">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">{t.step1Title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {t.step1Description}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-xl group animation-delay-200">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-gray-800">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">{t.step2Title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {t.step2Description}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-xl group animation-delay-400">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-gray-800">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">{t.step3Title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {t.step3Description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Before/After Examples */}
      <section id="examples" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">{t.beforeAfter}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.examplesSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                before: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&q=60",
                after: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
                type: t.linkedinProfile
              },
              {
                before: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=60",
                after: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&q=80",
                type: t.professionalHeadshot
              },
              {
                before: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=300&q=60",
                after: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80",
                type: t.businessPortrait
              }
            ].map((example, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-xl group">
                <CardContent className="p-0">
                  <div className="grid grid-cols-2">
                    <div className="relative overflow-hidden">
                      <img
                        src={example.before}
                        alt="Before"
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute bottom-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                        Before
                      </div>
                    </div>
                    <div className="relative overflow-hidden">
                      <img
                        src={example.after}
                        alt="After"
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute bottom-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
                        After
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-black">{example.type}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-black mb-4">{t.simplePricing}</h2>
          <p className="text-xl text-gray-600 mb-12">
            {t.pricingSubtitle}
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Professional Profile Picture */}
            <Card className="border-0 shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-black mb-2">{t.professionalEdit}</h3>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-black">CHF 29</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8 text-left">
                    <li className="flex items-center group">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 transition-transform duration-300 group-hover:scale-110" />
                      <span className="text-gray-700">{t.freeDemo}</span>
                    </li>
                    <li className="flex items-center group">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 transition-transform duration-300 group-hover:scale-110" />
                      <span className="text-gray-700">{t.professionalEditing}</span>
                    </li>
                    <li className="flex items-center group">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 transition-transform duration-300 group-hover:scale-110" />
                      <span className="text-gray-700">{t.highResolution}</span>
                    </li>
                    <li className="flex items-center group">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 transition-transform duration-300 group-hover:scale-110" />
                      <span className="text-gray-700">{t.delivery24hours}</span>
                    </li>
                    <li className="flex items-center group">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 transition-transform duration-300 group-hover:scale-110" />
                      <span className="text-gray-700">{t.multipleFormats}</span>
                    </li>
                  </ul>

                  <Button 
                    className="w-full bg-black hover:bg-gray-800 text-white py-3 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    onClick={triggerFileUpload}
                  >
                    {t.startTransformation}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Professional Photo Shoot Set */}
            <Card className="border-0 shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-black mb-2">{t.photoShootSet}</h3>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-black">CHF 79</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8 text-left">
                    <li className="flex items-center group">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 transition-transform duration-300 group-hover:scale-110" />
                      <span className="text-gray-700">{t.freeDemo}</span>
                    </li>
                    <li className="flex items-center group">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 transition-transform duration-300 group-hover:scale-110" />
                      <span className="text-gray-700">{t.classicalProfiles}</span>
                    </li>
                    <li className="flex items-center group">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 transition-transform duration-300 group-hover:scale-110" />
                      <span className="text-gray-700">{t.expressiveHeadshots}</span>
                    </li>
                    <li className="flex items-center group">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 transition-transform duration-300 group-hover:scale-110" />
                      <span className="text-gray-700">{t.creativePicture}</span>
                    </li>
                    <li className="flex items-center group">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 transition-transform duration-300 group-hover:scale-110" />
                      <span className="text-gray-700">{t.delivery24hours}</span>
                    </li>
                  </ul>

                  <Button 
                    className="w-full bg-black hover:bg-gray-800 text-white py-3 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    onClick={triggerFileUpload}
                  >
                    {t.startTransformation}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-black mb-4">
            {t.readyForPortrait}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t.ctaSubtitle}
          </p>
          
          <Button 
            size="lg" 
            className="bg-black hover:bg-gray-800 text-white px-12 py-4 text-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
            disabled={isUploading}
            onClick={triggerFileUpload}
          >
            <Upload className="w-6 h-6 mr-3 transition-transform duration-300 group-hover:scale-110" />
            {isUploading ? "Uploading..." : t.uploadNow}
          </Button>
          
          <p className="text-sm text-gray-500 mt-4">
            {t.noCommitment}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4 group">
                <img 
                  src="/Logo_Short_black.png" 
                  alt="Luminis Logo" 
                  className="w-8 h-8 mr-2 transition-transform duration-300 group-hover:scale-110 filter invert"
                />
                <h3 className="text-2xl font-bold">Luminis</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                {t.footerDescription}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.service}</h3>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('how-it-works')} className="text-gray-400 hover:text-white transition-colors">{t.howItWorks}</button></li>
                <li><button onClick={() => scrollToSection('examples')} className="text-gray-400 hover:text-white transition-colors">{t.examples}</button></li>
                <li><button onClick={() => scrollToSection('pricing')} className="text-gray-400 hover:text-white transition-colors">{t.pricing}</button></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t.faq}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.account}</h3>
              <ul className="space-y-2">
                <li><button onClick={() => setShowAuthDialog(true)} className="text-gray-400 hover:text-white transition-colors">{t.login}</button></li>
                <li><button onClick={() => setShowAuthDialog(true)} className="text-gray-400 hover:text-white transition-colors">{t.signUp}</button></li>
                {isLoggedIn && (
                  <>
                    <li><button onClick={() => setShowAccountDialog(true)} className="text-gray-400 hover:text-white transition-colors">{t.myPhotos}</button></li>
                    <li><button onClick={() => setShowAccountDialog(true)} className="text-gray-400 hover:text-white transition-colors">{t.paymentHistory}</button></li>
                  </>
                )}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.support}</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t.contactUs}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t.privacyPolicy}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t.termsOfService}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t.refundPolicy}</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Luminis. {t.allRightsReserved}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;