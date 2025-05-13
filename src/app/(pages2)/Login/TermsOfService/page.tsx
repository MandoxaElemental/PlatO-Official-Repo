'use client'
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Button } from 'flowbite-react'

const TermsAndConditions = () => {
    const [date, setDate] = useState("")
    useEffect(() => {
      setDate(format(new Date(), 'MM-dd-yyyy'))
  
      const onPopState = () => {
        window.close()
      }
  
      window.addEventListener('popstate', onPopState)
  
      return () => {
        window.removeEventListener('popstate', onPopState)
      }
    }, [])

  return (
    <div className='min-w-screen flex justify-center bg-blue-200'>
    <div className='max-w-[600px] m-5 p-5 bg-white'>
        <div>
            <h1 className="text-3xl font-bold mb-4 pb-2 border-b-1">PlatO Terms of Service</h1>
            <p className="mb-6 border-bottom">Effective Date: {date}</p>
            <p className="mb-6">
                Welcome to PlatO! These Terms of Service (&quot;Terms&quot;) govern your access to and use of the PlatO mobile application, website, and all related services (collectively, the “Platform”), owned and operated by PlatO Unlimited Inc. Please read these Terms carefully. By accessing or using PlatO, you agree to be bound by these Terms and all applicable laws and regulations.
            </p>
            <p className="mb-6">
                If you do not agree with any of these Terms, you may not use the Platform.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">1. Eligibility</h2>
            <p className="mb-6">To use PlatO, you must:</p>
            <ul className="list-disc ml-6 mb-4">
                <li>Be at least 13 years old, or the minimum legal age in your jurisdiction;</li>
                <li>Have the legal capacity to enter into a binding agreement;</li>
                <li>Not be prohibited from using our Platform under any applicable laws.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-2">2. Account Registration</h2>
            <p className="mb-6">You may need to create an account to use certain features of PlatO. When creating your account:</p>
            <ul className="list-disc ml-6 mb-4">
                <li>Provide accurate and complete information;</li>
                <li>Keep your login credentials secure;</li>
                <li>Notify us immediately if you suspect unauthorized access to your account.</li>
            </ul>
            <p className="mb-6">You are responsible for all activity on your account.</p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">3. User Content</h2>
            <p className="mb-6">PlatO allows you to post and share content, including but not limited to photos, videos, recipes, comments, and other materials (&quot;User Content&quot;). You retain all rights to your User Content, but by posting it on PlatO, you grant us the following:</p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-2">3.1. License to Use</h2>
            <p className="mb-6">You grant PlatO a non-exclusive, royalty-free, worldwide, transferable, sublicensable license to host, use, distribute, modify, display, reproduce, and create derivative works of your User Content for the purposes of operating, developing, and promoting the Platform.</p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">3.2. Content Standards</h2>
            <p className="mb-6">By submitting content to PlatO, you agree that it must not:</p>
            <ul className="list-disc ml-6 mb-4">
                <li>Be false, misleading, or infringe on any third-party rights;</li>
                <li>Contain hate speech, harassment, or offensive materials;</li>
                <li>Include sexually explicit or violent content;</li>
                <li>Violate any local, national, or international law.</li>
            </ul>
            <p className="mb-6">We reserve the right to remove or moderate any content at our discretion.</p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">4. Intellectual Property</h2>
            <p className="mb-6">All intellectual property on the Platform (excluding User Content), including trademarks, logos, software, and visual elements, are owned by or licensed to PlatO and are protected by applicable intellectual property laws.</p>
            <p className="mb-6">You agree not to copy, distribute, reverse engineer, or create derivative works from any part of the Platform without explicit permission.</p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">5. Community Guidelines</h2>
            <p className="mb-6">To foster a safe and welcoming environment, all users must follow our community guidelines:</p>
            <ul className="list-disc ml-6 mb-4">
                <li>Respect other users and their content;</li>
                <li>Avoid spamming or misleading behavior;</li>
                <li>Refrain from promoting unsafe cooking practices;</li>
                <li>Report inappropriate or harmful content using the reporting tools.</li>
            </ul>
            <p className="mb-6">Violations may result in content removal, account suspension, or permanent bans.</p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">6. Third-Party Services and Links</h2>
            <p className="mb-6">PlatO may contain links to third-party websites or services. We are not responsible for the content, policies, or practices of any third-party platforms.</p>
            <p className="mb-6">You use third-party services at your own risk and should review their terms and policies before using them.</p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">7. Privacy</h2>
            <p className="mb-6">Your privacy is important to us. Our collection and use of your personal data is governed by our Privacy Policy, which is incorporated into these Terms. By using PlatO, you consent to the processing of your information as outlined in the Privacy Policy.</p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">8. Termination</h2>
            <p className="mb-6">We may suspend or terminate your account and access to PlatO at our sole discretion, with or without notice, if you:</p>
            <ul className="list-disc ml-6 mb-4">
                <li>Breach these Terms;</li>
                <li>Violate our community guidelines;</li>
                <li>Engage in illegal or harmful behavior on the Platform.</li>
            </ul>
            <p className="mb-6">Upon termination, your right to use the Platform ceases immediately, and any content you&apos;ve submitted may be removed.</p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">9. Disclaimers</h2>
            <p className="mb-6">PlatO is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied, including but not limited to:</p>
            <ul className="list-disc ml-6 mb-4">
                <li>Warranties of merchantability, fitness for a particular purpose, or non-infringement;</li>
                <li>That the Platform will be secure or available at any particular time or location;</li>
                <li>That any defects or errors will be corrected.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-2">10. Limitation of Liability</h2>
            <p className="mb-6">To the fullest extent permitted by law, PlatO, its officers, directors, employees, and agents will not be liable for any indirect, incidental, special, consequential, or punitive damages, including:</p>
            <ul className="list-disc ml-6 mb-4">
                <li>Loss of profits, data, or goodwill;</li>
                <li>Service interruptions or data breaches;</li>
                <li>Food allergies, improper cooking techniques, or health-related issues resulting from content on the Platform.</li>
            </ul>
            <p className="mb-6">You use recipes and cooking techniques shared on the Platform at your own risk. Always consult with professionals regarding allergies or food safety.</p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">11. Indemnification</h2>
            <p className="mb-6">You agree to indemnify and hold harmless PlatO, its affiliates, and personnel from and against any claims, damages, obligations, losses, liabilities, costs, and expenses (including legal fees) arising from:</p>
            <ul className="list-disc ml-6 mb-4">
                <li>Your use of the Platform;</li>
                <li>Your User Content;</li>
                <li>Your violation of these Terms.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-2">12. Modifications to the Terms</h2>
            <p className="mb-6">PlatO may update these Terms from time to time. We will notify you of significant changes via email or within the app. Continued use of the Platform after such changes constitutes acceptance of the new Terms.</p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">13. Governing Law and Dispute Resolution</h2>
            <p className="mb-6">These Terms are governed by the laws of California, without regard to its conflict of laws principles.</p>
            <p className="mb-6">You agree to first attempt to resolve any disputes informally with us. If resolution is not achieved, disputes will be resolved through binding arbitration or in a court of competent jurisdiction in California, unless otherwise required by applicable law.</p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">14. Contact Us</h2>
            <p className="mb-6">For questions or concerns regarding these Terms, please contact us at:</p>
            <p className="mb-6">
                PlatO Support Team<br/>
                Email: support@platoapp.com<br/>
                Address: 123ABC Plae Grownd Stret
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">15. Entire Agreement</h2>
            <p className="mb-6">These Terms, together with our Privacy Policy and Community Guidelines, constitute the entire agreement between you and PlatO concerning the Platform.</p>
        </div>

        <div>
            <h1 className="text-3xl font-bold mb-4 pb-2 border-b-1">PlatO Privacy Policy</h1>
            <p className="mb-6">Effective Date: {date}</p>
            <p className="mb-6">
                PlatO is committed to protecting your privacy. This Privacy Policy explains how we collect, use, share, and protect your personal data when you use the PlatO mobile application and website (collectively, the “Platform”).
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
            <h3 className="font-semibold">1.1. Information You Provide</h3>
            <ul className="list-disc ml-6 mb-4">
                <li>Account Info: Name, email, username, password, profile photo, bio.</li>
                <li>User Content: Recipes, photos, videos, comments, messages.</li>
                <li>Feedback & Support Requests: Any communications with us.</li>
            </ul>

            <h3 className="font-semibold">1.2. Automatically Collected Data</h3>
            <ul className="list-disc ml-6 mb-4">
                <li>Device Info: IP address, browser type, device identifiers.</li>
                <li>Usage Data: Pages visited, features used, actions taken.</li>
                <li>Location Data: With your permission, we may access your location.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-2">2. How We Use Your Data</h2>
            <p className="mb-6">We use your data to:</p>
            <ul className="list-disc ml-6 mb-4">
                <li>Operate and improve PlatO;</li>
                <li>Personalize your user experience;</li>
                <li>Facilitate interactions with others;</li>
                <li>Send you updates, newsletters, and support responses;</li>
                <li>Enforce our Terms and detect fraud or misuse.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-2">3. How We Share Your Data</h2>
            <p className="mb-6">We do not sell your personal data. We may share data with:</p>
            <ul className="list-disc ml-6 mb-4">
                <li>Service Providers: Cloud hosting, analytics, email services;</li>
                <li>Legal Authorities: When required by law or to protect rights;</li>
                <li>Third Parties with Consent: Only when you&apos;ve approved.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-2">4. Data Security</h2>
            <p className="mb-6">We use reasonable security measures to protect your data. However, no system is 100% secure. We encourage strong passwords and caution when sharing personal details on your profile.</p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">5. Your Rights</h2>
            <p className="mb-6">You have rights regarding your personal data, including:</p>
            <ul className="list-disc ml-6 mb-4">
                <li>Access to your data;</li>
                <li>Requesting correction or deletion;</li>
                <li>Withdrawing consent at any time;</li>
                <li>Opt-out of marketing communications.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-2">6. Changes to Privacy Policy</h2>
            <p className="mb-6">We may update this Privacy Policy to reflect changes in our practices or for legal reasons. We will notify you of material changes via email or app notification.</p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">7. Contact Us</h2>
            <p className="mb-6">If you have any questions or concerns about this Privacy Policy, please contact us:</p>
            <p className="mb-6">
                PlatO Support Team<br/>
                Email: support@platoapp.com<br/>
                Address: 123ABC Plae Grownd Stret
            </p>
        </div>
        <div>
        <h1 className="text-3xl font-bold mb-4 pb-2 border-b-1">PlatO Community Guidelines</h1>
      <p className="mb-6">
        Welcome to the PlatO community! To keep this a safe, welcoming, and inspiring space for all food lovers, all users must follow these guidelines:
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Be Respectful</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Treat others kindly.</li>
        <li>Respect different cultures, cuisines, and backgrounds.</li>
        <li>No harassment, hate speech, or abusive behavior.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Keep It Food-Focused</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Share original recipes, photos, or videos related to food and cooking.</li>
        <li>Avoid off-topic or irrelevant content.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. No Inappropriate Content</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>No nudity, sexually explicit material, or extreme violence.</li>
        <li>No graphic images of harm, raw unsafe ingredients, or food waste glorification.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Give Credit</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Attribute recipes that are inspired by others.</li>
        <li>Do not plagiarize or repost someone else’s work as your own.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Keep it Safe</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Do not promote unsafe food handling or raw food consumption (where it poses health risks).</li>
        <li>Avoid dangerous or misleading cooking methods.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">6. No Spam or Self-Promotion</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Avoid excessive links or repetitive content.</li>
        <li>No advertising or multi-level marketing unless clearly disclosed and permitted by PlatO.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Respect Intellectual Property</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Share only what you have the right to share.</li>
        <li>Report any content that you believe infringes on your rights.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">8. Report Problems</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Use in-app tools to report harmful or rule-breaking content.</li>
        <li>PlatO moderators may review and take action, including content removal or account suspension.</li>
      </ul>

        </div>
        <div>
        <h1 className="text-3xl font-bold mb-4 pb-2 border-b-1">PlatO Recipe Use Disclaimer</h1>
      <p className="mb-6">
        PlatO provides a platform for users to share their food-related content, but we do not test or verify every recipe posted. Please read and understand the following before trying any recipe:
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Use At Your Own Risk</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>All content shared on PlatO is user-generated.</li>
        <li>PlatO is not responsible for:
          <ul className="list-disc ml-6">
            <li>Recipe inaccuracies</li>
            <li>Undercooked or unsafe food preparation</li>
            <li>Foodborne illness</li>
            <li>Allergic reactions</li>
            <li>Incomplete or dangerous instructions</li>
          </ul>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Health and Allergy Warnings</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Check all ingredients for allergens.</li>
        <li>Consider dietary restrictions and health conditions.</li>
        <li>Consult a medical professional if unsure.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Food Safety Guidelines</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Wash hands, utensils, and surfaces.</li>
        <li>Use food thermometers where needed.</li>
        <li>Avoid cross-contamination of raw ingredients.</li>
        <li>Follow proper storage and cooking temperatures per health authorities.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Professional Advice</h2>
      <p className="ml-6 mb-4">
        Nothing on PlatO should be interpreted as professional medical, nutritional, or culinary advice. Please consult a qualified expert for such guidance.
      </p>
        </div>
        <div className='flex justify-center'>
        <Button onClick={() => {
      window.close()
    }} className="bg-blue-200 hover:bg-blue-400">Back</Button>
        </div>
    </div>
    </div>
  )
}

export default TermsAndConditions
