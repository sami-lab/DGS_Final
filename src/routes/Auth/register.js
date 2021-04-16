import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Alert,
  KeyboardAvoidingView,
  TextInput,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import {
  Card,
  Button,
  withTheme,
  Modal,
  Portal,
  Title,
} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GlobalContext } from '../../context/GlobalContext';
import * as actionTypes from '../../context/actions';
import axios from '../../../axios';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import SearchableDropdown from 'react-native-searchable-dropdown';
import countries from '../../assets/dev/geo.json';
import Spinner from '../../components/spinner';

import countriesData from '../../assets/dev/countries.json';
import states from '../../assets/dev/states.json';

let privacy = `Please read these Terms of Use (the “Terms”) carefully & thoroughly! BY ACCESSING, VIEWING, OR USING THE MOBILE APPLICATION OR SERVICES DESCRIBED BELOW, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTAND, AND AGREE WITH THESE TERMS AND THIS AGREEMENT. IF YOU DO NOT WISH TO BE BOUND BY THESE TERMS AND THIS AGREEMENT, PLEASE DO NOT USE THE MOBILE APPLICATION OR SERVICES. Acknowledgment & Changes These Terms, which constitute a license that governs your use of the "Divorced Girl Smiling" mobile application ("Mobile Application" or "Service") and any of the other related products and services offered by Divorced Girl Smiling, LLC, including but not limited to its podcasts, YouTube videos, websites and/or other social media presence (collectively referred to as the "Services") and any transactions that you engage in through the Mobile Application and the Services represent an agreement (the “Agreement”) between the customer (also referred to as   "User", "you" or "your") and  Divorced Girl Smiling, LLC (also referred to as “Divorced Girl Smiling”, “DGS”, "we", "us" or "our"). Users agree to be bound by the Terms and the Agreement when using any area of the Mobile Application and the Services.  If we make a change to the Terms or the Agreement, the updated Terms and/or the Agreement will be available on the Mobile Application, DivorcedGirlSmiling.com and/or our other websites (the Mobile Application, the Services and any websites are collectively referred to as the “Sites”), and they will become effective upon posting to the Sites. The act of accessing or using the Sites or Services signifies your consent to these Terms  and the Agreement without limitation or qualification.   It is your responsibility to return to these Terms  and the Agreement from time to time to review the most current terms and conditions. DGS does not and will not assume any obligation to notify you of changes to this Agreement.  If you do not agree to these Terms and the Agreement, you should not use the Sites. DGS reserves the right to modify these Terms, the Agreement and the contents of the Sites, including the features, availability, or operation of the Sites, at any time in our sole and absolute discretion. The Sites may contain links to third-party websites, these links are provided only as a convenience and as an additional avenue of access to the subject matter available at the linked location. DGS is not responsible for the content of those websites. 
You affirm that you are of legal age, can form legally binding agreements under applicable law, and are fully able and competent to enter into the terms, conditions, obligations, affirmations, representations, and warranties set forth in these Terms and the Agreement, and to qualify under, abide by, and comply with these Terms and the Agreement. If you are entering into this Agreement on behalf of a business or other legal entity, you represent that you have the authority to bind such entity to this Agreement, in which case the terms "User", "you" or "your" shall refer to such entity. If you do not have such authority, or if you do not agree with the terms of this Agreement, you must not accept this Agreement and may not access and use the Mobile Application and Services. You acknowledge that this Agreement is a contract between you and DGS, even though it is electronic and is not physically signed by you, and it governs your use of the Mobile Application and Services.  You are also providing your express consent to our Privacy Policy as part of this Agreement.  
Accounts and membership
You must be at least 18 years of age to use the Mobile Application and Services. By using the Mobile Application and Services and by agreeing to this Agreement you warrant and represent that you are at least 18 years of age. If you create an account in the Mobile Application, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it. We may monitor and review new accounts before you may sign in and start using the Services. Providing false contact information of any kind may result in the termination of your account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security. We will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions. We may suspend, disable, or delete your account (or any part thereof) if we determine that you have violated any provision of this Agreement or that your conduct or content would tend to damage our reputation and goodwill. If we delete your account for the foregoing reasons, you may not re-register for our Services. We may block your email address and Internet protocol address to prevent further registration. User content
We do not own any data, information or material (collectively, "Content") that you submit in the Mobile Application or the Services in the course of using the Mobile Application or the Services. You shall have sole responsibility for the accuracy, quality, integrity, legality, reliability, appropriateness, and intellectual property ownership or right to use of all submitted Content. We may monitor and review the Content in the Mobile Application or the Services submitted or created using our Mobile Application or Services by you. You grant us permission to access, copy, distribute, store, transmit, reformat, display and perform the Content of your user account solely as required for the purpose of providing the Mobile Application and Services to you. Without limiting any of those representations or warranties, we have the right, though not the obligation, to, in our own sole discretion, refuse or remove any Content that, in our reasonable opinion, violates any of our policies or is in any way harmful or objectionable. You also grant us the license to use, reproduce, adapt, modify, publish or distribute the Content created by you or stored in your user account for commercial, marketing or any similar purpose.
Adult content Please be aware that there may be certain adult or mature content available in the Mobile Application and Services. Where there is mature or adult content, individuals who are less than 18 years of age or are not permitted to access such content under the laws of any applicable jurisdiction may not access such content. If we learn that anyone under the age of 18 seeks to conduct a transaction through the Services, we will require verified parental consent, in accordance with the Children's Online Privacy Protection Act of 1998 ("COPPA"). Certain areas of the Mobile Application and Services and Services may not be available to children under 18 under any circumstances.
Billing and payments You shall pay all fees or charges to your account in accordance with the fees, charges, and billing terms in effect at the time a fee or charge is due and payable. Where Services are offered on a free trial basis, payment may be required after the free trial period ends, and not when you enter your billing details (which may be required prior to the commencement of the free trial period). If auto-renewal is enabled for the Services you have subscribed for, you will be charged automatically in accordance with the term you selected. If, in our judgment, your purchase constitutes a high-risk transaction, we will require you to provide us with a copy of your valid government-issued photo identification, and possibly a copy of a recent bank statement for the credit or debit card used for the purchase. We reserve the right to change products and product pricing at any time. We also reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made.
Accuracy of information Occasionally there may be information in the Mobile Application and Services that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing, availability, promotions and offers. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information in the Mobile Application and Services is inaccurate at any time without prior notice (including after you have submitted your order). We undertake no obligation to update, amend or clarify information in the Mobile Application and Services including, without limitation, pricing information, except as required by law. No specified update or refresh date applied in the Mobile Application and Services should be taken to indicate that all information in the Mobile Application and  Services has been modified or updated. Third party services
If you decide to enable, access or use third party services, be advised that your access and use of such other services are governed solely by the terms and conditions of such other services, and we do not endorse, are not responsible or liable for, and make no representations as to any aspect of such other services, including, without limitation, their content or the manner in which they handle data (including your data) or any interaction between you and the provider of such other services. You irrevocably waive any claim against DGS with respect to such other services. DGS is not liable for any damage or loss caused or alleged to be caused by or in connection with your enablement, access or use of any such other services, or your reliance on the privacy practices, data security processes or other policies of such other services. You may be required to register for or log into such other services on their respective platforms. By enabling any other services, you are expressly permitting DGS to disclose your data as necessary to facilitate the use or enablement of such other service.
Backups
We are not responsible for the Content residing in the Mobile Application and Services. In no event shall we be held liable for any loss of any Content. It is your sole responsibility to maintain appropriate backup of your Content. Notwithstanding the foregoing, on some occasions and in certain circumstances, with absolutely no obligation, we may be able to restore some or all of your data that has been deleted as of a certain date and time when we may have backed up data for our own purposes. We make no guarantee that the data you need will be available.
Podcasts
DGS provides podcasts (the "DGS Podcasts") consisting of selected audio content from the Sites that is provided over the Internet using an XML feed and an associated audio file so that the audio file may be downloaded and played from a user's computer or transferred to a portable listening device. DGS Podcasts are protected by U.S. and international copyright laws. All rights in and to the DGS Podcasts are reserved to DGS or the content provider. DGS Podcasts are available for personal, noncommercial use only. You may download, copy and/or transfer to a portable listening device the DGS Podcasts for your personal, noncommercial use only, provided that you do not modify the content. You also may link to DGS Podcasts from your website, weblog or similar application, as long as the linking does not (a) suggest that DGS promotes or endorses any third party's causes, ideas, Web sites, products or services, or (b) use DGS content for inappropriate commercial purposes. DGS reserves the right to discontinue providing DGS Podcasts and to require that you cease accessing or using the DGS Podcasts, or any content contained in the DGS Podcasts, at any time for any reason.
Advertisements
During your use of the Mobile Application and Services, you may enter into correspondence with or participate in promotions of advertisers or sponsors showing their goods or services through the Mobile Application and Services. Any such activity, and any terms, conditions, warranties or representations associated with such activity, is solely between you and the applicable third party. We shall have no liability, obligation or responsibility for any such correspondence, purchase or promotion between you and any such third party.

Links to other resources

Although the Mobile Application and Services may link to other resources (such as websites, mobile applications, etc.), we are not, directly or indirectly, implying any approval, association, sponsorship, endorsement, or affiliation with any linked resource, unless specifically stated herein. We are not responsible for examining or evaluating, and we do not warrant the offerings of, any businesses or individuals or the content of their resources. We do not assume any responsibility or liability for the actions, products, services, and content of any other third parties. You should carefully review the legal statements and other conditions of use of any resource which you access through a link in the Mobile Application and Services. Your linking to any other off-site resources is at your own risk.

Prohibited uses

In addition to other terms as set forth in the Agreement, you are prohibited from using the Mobile Application and Services or Content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Mobile Application and Services, third party products and services, or the Internet; (h) to spam, phish, pharm, pretext, spider, crawl, or scrape; (i) for any obscene or immoral purpose; or (j) to interfere with or circumvent the security features of the Mobile Application and Services, third party products and services, or the Internet. We reserve the right to terminate your use of the Mobile Application and Services for violating any of the prohibited uses.

Intellectual property rights

"Intellectual Property Rights" means all present and future rights conferred by statute, common law or equity in or in relation to any copyright and related rights, trademarks, designs, patents, inventions, goodwill and the right to sue for passing off, rights to inventions, rights to use, and all other intellectual property rights, in each case whether registered or unregistered and including all applications and rights to apply for and be granted, rights to claim priority from, such rights and all similar or equivalent rights or forms of protection and any other results of intellectual activity which subsist or will subsist now or in the future in any part of the world. This Agreement does not transfer to you any intellectual property owned by DGS or third parties, and all rights, titles, and interests in and to such property will remain (as between the parties) solely with DGS. All trademarks, service marks, graphics and logos used in connection with the Mobile Application and Services, are trademarks or registered trademarks of DGS or its licensors. Other trademarks, service marks, graphics and logos used in connection with the Mobile Application and Services may be the trademarks of other third parties. Your use of the Mobile Application and Services grants you no right or license to reproduce or otherwise use any of DGS or third party trademarks.

Limitation of liability

YOU AGREE THAT DIVORCED GIRL SMILING AND ITS PROVIDERS SHALL NOT BE LIABLE FOR ANY DAMAGE, LOSS, OR EXPENSE OF ANY KIND ARISING OUT OF OR RESULTING FROM YOUR POSSESSION OR USE OF THE MATERIALS, CONTENT, OR INFORMATION ON THE SITES, REGARDLESS OF WHETHER SUCH LIABILITY IS BASED IN TORT, CONTRACT, OR OTHERWISE.

IN NO EVENT, INCLUDING, WITHOUT LIMITATION, A NEGLIGENT ACT, SHALL DIVORCED GIRL SMILING OR PROVIDERS BE LIABLE TO YOU FOR ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES (INCLUDING, WITHOUT LIMITATION, LOSS OF PROFITS, LOSS OR CORRUPTION OF DATA, LOSS OF GOODWILL, WORK STOPPAGE, COMPUTER FAILURE OR MALFUNCTION, OR INTERRUPTION OF BUSINESS), ARISING OUT OF OR IN ANY WAY RELATED TO THE MATERIALS, CONTENT, OR INFORMATION ON THE SITES OR ANY OTHER PRODUCTS, SERVICES, OR INFORMATION OFFERED, SOLD, OR DISPLAYED ON THE SITES, YOUR USE OF, OR INABILITY TO USE, THE SITES GENERALLY, OR OTHERWISE IN CONNECTION WITH THIS AGREEMENT, REGARDLESS OF WHETHER DIVORCED GIRL SMILING OR ANY OF ITS PROVIDERS HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. BECAUSE SOME STATES DO NOT ALLOW THE LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, THE ABOVE LIMITATION MAY NOT APPLY TO YOU.

DGS, its Providers, or any third parties mentioned on the Sites shall be liable only to the extent of actual damages incurred by you related to your use of the Sites, not to exceed the amounts you have paid DGS for services, products or content made available to you on the Sites. 

Indemnification

You agree to indemnify and hold DGS and its affiliates, directors, officers, employees, agents, suppliers and licensors harmless from and against any liabilities, losses, damages or costs, including reasonable attorneys' fees, incurred in connection with or arising from any third party allegations, claims, actions, disputes, or demands asserted against any of them as a result of or relating to your Content, your use of the Mobile Application and Services or any willful misconduct on your part.

DMCA Policy/Copyright Policy

This Digital Millennium Copyright Act policy ("DCMA Policy") may apply in whole or in part to the Mobile Application and the  Services and outlines how DGS addresses copyright infringement notifications and how you may submit a copyright infringement complaint. Protection of intellectual property is of utmost importance to us and we ask our users and their authorized agents to do the same. It is our policy to expeditiously respond to clear notifications of alleged copyright infringement that comply with the United States Digital Millennium Copyright Act ("DMCA") of 1998, the text of which can be found at the U.S. Copyright Office website. 

What to consider before submitting a copyright complaint

Before submitting a copyright complaint to us, consider whether the use could be considered fair use. Fair use states that brief excerpts of copyrighted material may, under certain circumstances, be quoted verbatim for purposes such as criticism, news reporting, teaching, and research, without the need for permission from or payment to the copyright holder. If you have considered fair use, and you still wish to continue with a copyright complaint, you may want to first reach out to the user in question to see if you can resolve the matter directly with the user.  Please note that under 17 U.S.C. § 512(f), you may be liable for any damages, including costs and attorneys’ fees incurred by us or our users, if you knowingly misrepresent that the material or activity is infringing. If you are unsure whether the material you are reporting is in fact infringing, you may wish to contact an attorney before filing a notification with us.  We may, at our discretion or as required by law, share a copy of your notification or counter-notification with third parties. This may include sharing the information with the account holder engaged in the allegedly infringing activity or for publication. If you are concerned about your information being forwarded, you may wish to hire an agent to report infringing material for you.

Notifications of infringement

If you are a copyright owner or an agent thereof, and you believe that any material available on our Services infringes your copyrights, then you may submit a written copyright infringement notification ("Notification") using the contact details below pursuant to the DMCA by providing us with the following information:

•	Identification of the copyrighted work that you claim has been infringed, or, if multiple copyrighted works are covered by this Notification, you may provide a representative list of the copyrighted works that you claim have been infringed.
•	Identification of the infringing material and information you claim is infringing (or the subject of infringing activity), including at a minimum, if applicable, the URL or URLs of the web pages where the allegedly infringing material may be found.
•	Information reasonably sufficient to permit us to contact you, such as an address, telephone number, and, if available, an e-mail address.
•	A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, the copyright owner's agent, or the law.
•	A statement that the information in the notification is accurate, and under penalty of perjury that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.
•	A physical or electronic signature (typing your full name will suffice) of the copyright owner or a person authorized to act on their behalf.

All such Notifications must comply with the DMCA requirements. You may refer to a DMCA takedown notice generator or other similar services to avoid making mistake and ensure compliance of your Notification.

Filing a DMCA complaint is the start of a pre-defined legal process. Your complaint will be reviewed for accuracy, validity, and completeness. If your complaint has satisfied these requirements, our response may include the removal or restriction of access to allegedly infringing material as well as a permanent termination of repeat infringers’ accounts. We may also require a court order from a court of competent jurisdiction, as determined by us in our sole discretion, before we take any action. A backup of the terminated account’s data may be requested, however it may be subject to certain penalty fees imposed. The final penalty fee will be determined by the severity and frequency of the violations.

If we remove or restrict access to materials or terminate an account in response to a Notification of alleged infringement, we will make a good faith effort to contact the affected user with information concerning the removal or restriction of access, which may include a full copy of your Notification (including your name, address, phone, and email address).  Notwithstanding anything to the contrary contained in any portion of this Policy, DGS reserves the right to take no action upon receipt of a DMCA copyright infringement notification if it fails to comply with all the requirements of the DMCA for such notifications.

The process described in this DMCA Policy does not limit our ability to pursue any other remedies we may have to address suspected infringement.

If you would like to notify us of the infringing material or activity, you may send an email to Jackie@divorcedgirlsmiling.com

DISCLAIMERS

Use of the Mobile Application and Services is at your sole risk.   The Mobile Application and Services are provided on an “as is” and “as available” basis.  We reserve the right to restrict or terminate access to the Mobile Application and Services or any feature or part thereof at any time.  Neither DGS, its affiliates, nor any of their officers, directors, employees, agents, third-party content providers, or licensors (collectively, “Providers”), or the like, warrant that the Mobile Application and Services will be uninterrupted or error-free; nor do they make any warranty as to the results that may be obtained from the use of the Mobile Application and Services, or as to the accuracy, completeness, reliability, security, or currency of the images, designs, photographs, writings, graphs, data, courses, programs, and other content (the “Materials”).

DIVORCED GIRL SMILING EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESSED OR IMPLIED INCLUDING, BUT NOT LIMITED TO: ANY WARRANTIES THAT MATERIALS ON THE SITES ARE NON-INFRINGING; AS WELL AS WARRANTIES IMPLIED FROM A COURSE OF PERFORMANCE; THAT THE SITES OR THE CONTENT THEREOF WILL CONTINUE TO BE AVAILABLE; THAT THE SITES WILL BE SECURE; THAT THE SITES AND/OR THE SERVER THAT MAKES THE SITES AVAILABLE WILL BE VIRUS-FREE: OR THAT INFORMATION ON THE SITES WILL BE COMPLETE OR ACCURATE; THAT ACCESS TO THE SITES WILL BE UNINTERRUPTED OR ERROR-FREE; THAT ANY DEFECTS WILL BE CORRECTED.  BY YOUR USE OF THE SITES, YOU HEREBY ACKNOWLEDGE THAT ANY INFORMATION SENT OR RECEIVED DURING USE OF THE SITES MAY NOT BE SECURE AND MAY BE INTERCEPTED BY UNAUTHORIZED PARTIES. NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED FROM THE SITES SHALL CREATE ANY WARRANTY OF ANY KIND. DIVORCED GIRL SMILING DOES NOT MAKE ANY WARRANTIES OR REPRESENTATIONS REGARDING THE USE OF THE CONTENT ON THE SITES IN TERMS OF THEIR COMPLETENESS, CORRECTNESS, ACCURACY, ADEQUACY, USEFULNESS, TIMELINESS, RELIABILITY OR OTHERWISE.
SOME JURISDICTIONS LIMIT OR DO NOT ALLOW THE DISCLAIMER OF IMPLIED OR OTHER WARRANTIES, SO THE ABOVE DISCLAIMER MAY NOT APPLY TO THE EXTENT SUCH JURISDICTION’S LAW APPLIES TO THIS AGREEMENT.

Representation
Any views or opinions represented in the Mobile Application and Services belong solely to the content creators and do not represent those of people, institutions or organizations that DGS or creators may or may not be associated with in professional or personal capacity, unless explicitly stated. Any views or opinions are not intended to malign any religion, ethnic group, club, organization, company, or individual.
Content and postings
You may not modify, print or copy any part of the Mobile Application and Services. Inclusion of any part of the Mobile Application and Services in another work, whether in printed or electronic or another form or inclusion of any part of the Mobile Application and Services on another resource by embedding, framing or otherwise without the express permission of DGS is prohibited.
You may submit new content in the Mobile Application and Services. By uploading or otherwise making available any information to DGS, you grant DGS the unlimited, perpetual right to distribute, display, publish, reproduce, reuse and copy the information contained therein. You may not impersonate any other person through the Mobile Application and Services. You may not post content that is defamatory, fraudulent, obscene, threatening, invasive of another person's privacy rights or that is otherwise unlawful. You may not post content that infringes on the intellectual property rights of any other person or entity. You may not post any content that includes any computer virus or other code designed to disrupt, damage, or limit the functioning of any computer software or hardware. By submitting or posting content in the Mobile Application and Services, you grant DGS the right to edit and, if necessary, remove any content at any time and for any reason.
Compensation and sponsorship
The Mobile Application and Services may contain forms of advertising, sponsorship, paid insertions or other forms of compensation. On certain occasions DGS may be compensated to provide opinions on products, services, or various other topics. The compensation received may influence such opinions of the advertised content or topics available in the Mobile Application and Services. Note that sponsored content and advertising space may not always be identified as paid or sponsored. Some of the links in the Mobile Application and Services may be "affiliate links". This means if you click on the link and purchase an item, DGS will receive an affiliate commission. Furthermore, DGS is a participant in the Amazon Associates program, an affiliate advertising program designed to provide a means to earn advertising fees by advertising and linking to Amazon properties.
Fitness and medical disclaimer
The information available in the Mobile Application and Services is for general health information only and is not intended to be a substitute for professional medical advice, diagnosis or treatment. You should not rely exclusively on information provided in the Mobile Application and Services for your health needs. All specific medical questions should be presented to your own health care provider and you should seek medical advice regarding your health and before starting any nutrition, weight loss or any other type of workout program.
If you choose to use the information available in the Mobile Application and Services without prior consultation with and consent of your physician, you are agreeing to accept full responsibility for your decisions and agreeing to hold harmless DGS, its agents, employees, contractors, and any affiliated companies from any liability with respect to injury or illness to you or your property arising out of or connected with your use of this information.
There may be risks associated with participating in activities presented in the Mobile Application and Services for people in good or poor health or with pre-existing physical or mental health conditions. If you choose to participate in these risks, you do so of your own free will and accord, knowingly and voluntarily assuming all risks associated with such activities.
The results obtained from the information available in the Mobile Application and Services may vary, and will be based on your individual background, physical health, previous experience, capacity, ability to act, motivation and other variables. There are no guarantees concerning the level of success you may experience.
Not legal advice
The information provided in the Mobile Application and Services is for general information purposes only and is not an alternative to legal advice from your lawyer, other professional services provider, or expert. It is not intended to provide legal advice or opinions of any kind. You should not act, or refrain from acting, based solely upon the information provided in the Mobile Application and Services without first seeking appropriate legal or other professional advice. If you have any specific questions about any legal matter, you should consult your lawyer, other professional services provider, or expert. You should never delay seeking legal advice, disregard legal advice, or commence or discontinue any legal action because of the information in the Mobile Application and Services.
The information in the Mobile Application and Services is provided for your convenience only. This information may have no evidentiary value and should be checked against official sources before it is used for any purposes. It is your responsibility to determine whether this information is admissible in a given judicial or administrative proceeding and whether there are any other evidentiary or filing requirements. Your use of this information is at your own risk.
Not financial advice
The information in the Mobile Application and Services is provided for your convenience only and is not intended to be treated as financial, investment, tax, or other advice. Nothing contained in the Mobile Application and Services constitutes a solicitation, recommendation, endorsement, or offer by DGS, its agents, employees, contractors, and any affiliated companies to buy or sell any securities or other financial instruments.
All content on this site is the information of a general nature and does not address the circumstances of any particular individual or entity. Nothing in the Mobile Application and Services constitutes professional and/or financial advice, nor does any information in the Mobile Application and Services constitute a comprehensive or complete statement of the matters discussed or the law relating thereto. You alone assume the sole responsibility of evaluating the merits and risks associated with the use of any information or other content in the Mobile Application and Services before making any decisions based on such information. You agree not to hold DGS, its agents, employees, contractors, and any affiliated companies liable for any possible claim for damages arising from any decision you make based on the information made available to you through the Sites.
Not investment advice
All investments are highly speculative in nature and involve substantial risk of loss. We encourage everyone to invest very carefully. We also encourage investors to get personal advice from your professional investment advisor and to make independent investigations before acting on information found in the Mobile Application and Services. We do not in any way whatsoever warrant or guarantee the success of any action you take in reliance on statements or information available in the Mobile Application and Services.
Past performance is not necessarily indicative of future results. All investments carry significant risk and all investment decisions of an individual remain the specific responsibility of that individual. There is no guarantee that systems, indicators, or signals will result in profits or that they will not result in full or partial losses. All investors are advised to fully understand all risks associated with any kind of investing they choose to do.
Not licensed specialty advice
Neither DGS nor Jackie Pilossoph (“Pilossoph”) are licensed therapists and Pilossoph does not have any formal education in psychology or social work, financial consulting, law, or any other specialty field. She holds no degrees, certificates or other credentials in therapy, social work or psychology, or financial consulting or law. DGS, through its agents and contributor writers involves listening to how you’re feeling and gives advice and offers non-judgmental answers to your questions based on Pilossoph’s personal divorce, dating and marriage experiences, as well as 8 + years of helping others either through personal advice and/or from the interviews of professionals for the articles she has written, including, but not limited to, therapists, divorce attorneys, life coaches and divorce mediators, and financial advisors. 

Reviews and testimonials
Testimonials are received in various forms through a variety of submission methods. They are individual experiences, reflecting experiences of those who have used the Mobile Application and Services in some way or another. However, they are individual results and results do vary. We do not claim that they are typical results that consumers will generally achieve. The testimonials are not necessarily representative of all of those who will use Mobile Application and Services, and DGS is not responsible for the opinions or comments available in the Mobile Application and Services, and does not necessarily share them. All opinions expressed are strictly the views of the reviewers.
Some testimonials may have been edited for clarity, or shortened in cases where the original testimonial included extraneous information of no relevance to the general public. Testimonials may be reviewed for authenticity before they are available for public viewing.
Indemnification and warranties
While we have made every attempt to ensure that the information contained in the Mobile Application and Services is correct, DGS is not responsible for any errors or omissions, or for the results obtained from the use of this information. All information in the Mobile Application and Services is provided "as is", with no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of this information, and without warranty of any kind, express or implied. In no event will DGS, or its partners, employees or agents, be liable to you or anyone else for any decision made or action taken in reliance on the information in the Mobile Application and Services, or for any consequential, special or similar damages, even if advised of the possibility of such damages.
Furthermore, as with any business, your results may vary and will be based on your individual capacity, experience, expertise, and level of desire. There are no guarantees concerning the level of success you may experience. There is no guarantee that you will make any income at all and you accept the risk that the earnings and income statements differ by individual. Each individual’s success depends on his or her background, dedication, desire and motivation. The use of the information in the Mobile Application and Services and Services should be based on your own due diligence and you agree that DGS is not liable for any success or failure of your business that is directly or indirectly related to the purchase and use of our information, products, and services reviewed or advertised in the Mobile Application and Services. Information contained in the Mobile Application and Services are subject to change at any time and without warning.
Acceptance of these disclaimers
You acknowledge that you have read these DISCLAIMERS and agree to all its terms and conditions. By accessing and using the Mobile Application and Services you agree to be bound by these Disclaimers. If you do not agree to abide by the terms of this Disclaimer, you are not authorized to access or use the Mobile Application and Services.
COOKIE POLICY
This cookie policy describes what cookies are and how and they're being used by the Sites. It is important to understand the types of cookies we use, the information we collect using cookies and how that information is used. This policy also describes the choices available to you regarding accepting or declining the use of cookies. For further information on how we use, store and keep your personal data secure, see our Privacy Policy. 

What are cookies?
Cookies are small pieces of data stored in text files that are saved on your computer or other devices when websites are loaded in a browser. They are widely used to remember you and your preferences, either for a single visit (through a "session cookie") or for multiple repeat visits (using a "persistent cookie").
Session cookies are temporary cookies that are used during the course of your visit to the Sites, and they expire when you close the web browser.
Persistent cookies are used to remember your preferences within the Sites and remain on your desktop or mobile device even after you close your browser or restart your computer. They ensure a consistent and efficient experience for you while visiting the Sites.
Cookies may be set by the Sites ("first-party cookies"), or by third parties, such as those who serve content or provide advertising or analytics services on the Sites ("third party cookies"). These third parties can recognize you when you visit our website and also when you visit certain other websites.
What type of cookies do we use?
Necessary cookies
Necessary cookies allow us to offer you the best possible experience when accessing and navigating through the Sites and using its features. For example, these cookies let us recognize that you have created an account and have logged into that account to access the content.
Functionality cookies
Functionality cookies let us operate the Sites in accordance with the choices you make. For example, we will recognize your username and remember how you customized the Sites during future visits.
Analytical cookies
These cookies enable us and third party services to collect aggregated data for statistical purposes on how our visitors use the Sites. These cookies do not contain personal information such as names and email addresses and are used to help us improve your user experience of the Sites.
Social media cookies
Third party cookies from social media sites (such as Facebook, Twitter, etc) let us track social network users when they visit or use the Website and Services, or share content, by using a tagging mechanism provided by those social networks.
These cookies are also used for event tracking and remarketing purposes. Any data collected with these tags will be used in accordance with our and social networks’ privacy policies. We will not collect or share any personally identifiable information from the user.
What are your cookie options?
If you don't like the idea of cookies or certain types of cookies, you can change your browser's settings to delete cookies that have already been set and to not accept new cookies. To learn more about how to do this or to learn more about cookies, visit internetcookies.org.  Please note, however, that if you delete cookies or do not accept them, you might not be able to use all of the features the Sites offer.

Entire agreement
This Agreement constitutes the entire agreement between DGS and you with respect to these Terms and the Sites, and it supersedes all prior or contemporaneous communications and proposals, whether electronic, oral, or written, between you and DGS with respect to the Sites.

A printed version of these Terms and this Agreement and of any notice given in electronic form shall be admissible in judicial or administrative proceedings based on or relating to this Agreement to the same extent and subject to the same conditions as other business documents and records originally generated and maintained in printed form.  

If for any reason a court of competent jurisdiction finds any provision of this Agreement or portion of it to be unenforceable, that provision shall be enforced to the maximum extent permissible so as to affect the intent of this Agreement, and the remainder of this Agreement shall continue in full force and effect. No waiver by either party of any breach or default hereunder shall be deemed to be a waiver of any preceding or subsequent breach or default.

Electronic communications and electronic signatures
You agree to be bound by any affirmation, assent, or agreement you transmit through the Sites, including but not limited to any consent you give to receive communications from DGS solely through electronic transmission. You agree that when in the future you click on an “I agree,” “I consent,” or other similarly worded “button” or entry field with your mouse, keystroke, or other computer device, your agreement or consent will be legally binding and enforceable and the legal equivalent of your handwritten signature.
 
Severability

All rights and restrictions contained in this Agreement may be exercised and shall be applicable and binding only to the extent that they do not violate any applicable laws and are intended to be limited to the extent necessary so that they will not render this Agreement illegal, invalid or unenforceable. If any provision or portion of any provision of this Agreement shall be held to be illegal, invalid or unenforceable by a court of competent jurisdiction, it is the intention of the parties that the remaining provisions or portions thereof shall constitute their agreement with respect to the subject matter hereof, and all such remaining provisions or portions thereof shall remain in full force and effect.

Dispute resolution

The formation, interpretation, and performance of this Agreement and any disputes arising out of it shall be governed by the substantive and procedural laws of Illinois, United States without regard to its rules on conflicts or choice of law and, to the extent applicable, the laws of United States. The exclusive jurisdiction and venue for actions related to the subject matter hereof shall be the courts located in Illinois, United States, and you hereby submit to the personal jurisdiction of such courts. You hereby waive any right to a jury trial in any proceeding arising out of or related to this Agreement. In addition, you and DGS agree that each may bring claims against the other only in your or its individual capacity and not as a s plaintiff or class member in any purported class or representative action. Unless you or DGS agree, no judge may consolidate more than one person’s claims or otherwise preside over any form of a representative or class proceeding. The United Nations Convention on Contracts for the International Sale of Goods does not apply to this Agreement.

Changes and amendments

We reserve the right to modify this Agreement or its terms relating to the Mobile Application and Services at any time, effective upon posting of an updated version of this Agreement in the Mobile Application or any of the Sites. When we do, we will revise the updated date at the top of this page. Continued use of the Mobile Application and Services after any such changes shall constitute your consent to such changes.

CONTACTING US

If you would like to contact us to understand more about this Agreement or wish to contact us concerning any matter relating to it, you may send an email to Jackie@divorcedgirlsmiling.com. 
`;
//This is to validate that we can move to next step
//this will return false if validation fail
async function validateSteps(
  step,
  username,
  name,
  email,
  password,
  confirmPassword,
  divorseStatus,
  country,
  city,
  gender,
  age
) {
  console.log(
    'from validations',
    step,
    username,
    name,
    email,
    password,
    confirmPassword,
    divorseStatus,
    country,
    city,
    gender,
    age
  );
  let status = false;
  let message = '';
  switch (step) {
    //verify for username,
    case 1:
      if (username && name) {
        try {
          const res = await axios.post('/users/validateUsername', {
            username,
          });
          status = true;
          message = 'success';
        } catch (err) {
          console.log(err.message);
          status = false;
          message = err.response.data.message;
        }
      } else {
        status = false;
        message = 'Usernname cannot be empty';
      }

      break;
    //verify for email
    case 2:
      status = true;
      if (
        !password ||
        !confirmPassword ||
        (password !== confirmPassword && status == true)
      ) {
        status = false;
        message = 'Password and confirm does not match';
        break;
      }
      if (password.length <= 5 && status == true) {
        status = false;
        message = 'A User Password must have more or equal then 5 characters';
        break;
      }
      if (
        email &&
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/gim.test(
          email
        ) &&
        status === true
      ) {
        try {
          await axios.post('/users/validateEmail', {
            email,
          });

          status = true;
        } catch (error) {
          console.log(error);
          status = false;
          message = error.response.data.message;
        }
      } else {
        status = false;
        message = 'Invalid Email';
      }
      break;
    //verify for divorse status
    case 3:
      if (!divorseStatus || divorseStatus == null) {
        status = false;
        message = 'Please Select one option';
      } else {
        status = true;
        break;
      }
      break;
    case 4:
      if (country && country != null) {
        if (city && city != null) {
          status = true;
          break;
        } else {
          status = false;
          message = 'Please Select City';
        }
      } else {
        status = false;
        message = 'Please Select country';
      }
      break;
    case 5:
      if (gender && gender != null) {
        status = true;
        break;
      } else {
        status = false;
        message = 'Please Select your Gender';
      }
      break;
    case 6:
      if (age && age != null) {
        status = true;
        break;
      } else {
        status = false;
        message = 'Please Select your Age';
      }
      break;
    case 7:
      status = true;
      break;
    default:
      status = false;
      break;
  }
  return { status, message };
}
function Register({ theme, navigation }) {
  const styles = StyleSheet.create({
    root: {
      flex: 1,
    },

    inputCard: {
      marginVertical: 15,
      width: Dimensions.get('screen').width * 0.8,
      shadowColor: '#000',
      alignSelf: 'center',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5, //for Andriod,
      borderRadius: 5,
      borderWidth: 0.6,
      borderColor: '#E5DDD5',
    },
    inputStyle: {
      paddingLeft: 30,
      borderRadius: 20,
      paddingVertical: 12,
    },
    buttonStyles: {
      display: 'flex',
      justifyContent: 'center',
      width: Dimensions.get('screen').width * 0.4,
      backgroundColor: theme.colors.darkPink,
      marginVertical: 15,
      color: '#fff',
      borderRadius: 50,
    },
    buttonText: {
      fontFamily: theme.fonts.bold.fontFamily,
      fontSize: 19,
      textTransform: 'capitalize',
      paddingVertical: 5,
    },
    title: {
      fontSize: 25,
      paddingVertical: 15,
      fontFamily: theme.fonts.bold.fontFamily,
      textAlign: 'center',
    },
    text: {
      fontFamily: theme.fonts.regular.fontFamily,
      textAlign: 'center',
      marginVertical: 5,
    },
    dropdownIconContainer: {
      width: Dimensions.get('screen').height * 0.05,
      height: Dimensions.get('screen').height * 0.05,
      backgroundColor: theme.colors.darkPink,
      borderRadius: Dimensions.get('screen').height * 0.04,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modal: {
      alignSelf: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      width: '80%',
      paddingBottom: 15,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    privacyTitle: {
      fontSize: 20,
      textAlign: 'center',
      marginTop: 10,
      marginBottom: 5,
      fontWeight: 'bold',
      fontFamily: theme.fonts.bold.fontFamily,
      marginBottom: 5,
    },
    privacyText: {
      fontFamily: theme.fonts.regular.fontFamily,
      fontSize: 12,
      fontWeight: '200',
      marginBottom: 5,
      textAlign: 'center',
      color: theme.colors.grey,
    },
  });
  const { state, dispatch } = useContext(GlobalContext);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const usernameRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef();
  const [confirmPassword, setConfirmPassword] = useState('');
  const confirmPasswordRef = useRef();
  const [divorseStatus, setDivorseStatus] = useState('');
  const [countryName, setCountryName] = useState('');
  const [countryId, setCountryId] = useState('');
  const [availalbleStates, setAvailableStates] = useState([]);
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');

  const [enableshift, setenableShift] = useState(false);
  //Logic states
  const [step, setStep] = useState(1);
  const [Ecountry, setEcountry] = useState('');
  const handleBackStep = () => {
    setStep((previousStep) => previousStep - 1);
  };
  const handleNextStep = async () => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    let status = false,
      err = '',
      res = {};
    switch (step) {
      // case 1:
      //   res = await validateSteps(step);
      //   status = res.status;
      //   break;
      case 1:
        res = await validateSteps(step, username, name);
        status = res.status;
        err = res.message;
        break;
      case 2:
        res = await validateSteps(
          step,
          null,
          null,
          email,
          password,
          confirmPassword
        );
        status = res.status;
        err = res.message;
        break;
      case 3:
        res = await validateSteps(
          step,
          null,
          null,
          null,
          null,
          null,
          divorseStatus
        );
        status = res.status;
        err = res.message;
        break;
      case 4:
        res = await validateSteps(
          step,
          null,
          null,
          null,
          null,
          null,
          null,
          countryName,
          city
        );
        status = res.status;
        err = res.message;
        break;
      case 5:
        res = await validateSteps(
          step,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          gender
        );
        status = res.status;
        err = res.message;
        break;
      case 6:
        res = await validateSteps(
          step,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          age
        );
        status = res.status;
        err = res.message;
        break;
      case 7:
        res = await validateSteps(
          step,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        );
        status = res.status;
        err = res.message;
        break;
      default:
        break;
    }
    if (status) {
      if (step === 7) {
        await submitData();
      } else {
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
        setStep((previousStep) => previousStep + 1);
      }
    } else {
      dispatch({ type: actionTypes.SET_LOADING, payload: false });
      Alert.alert('Fail', err);
    }
  };

  useEffect(() => {
    if (countryId > 0) {
      setCity('');
      const state = states.filter((item) => +item.country_id === countryId);
      setAvailableStates(state);
    }
  }, [countryId]);
  //Final Submission
  const submitData = async (e) => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    // //apply validation here first
    axios
      .post('/users/signup', {
        name,
        username,
        email,
        divorseStatus,
        country: countryName,
        city,
        gender,
        age,
        password,
        confirmPassword,
      })
      .then((response) => {
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
        setStep(1);
        navigation.navigate('RegisterationSuccess', {
          user: response.data.data.user,
          token: response.data.token,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
        Alert.alert(
          'Fail',
          error.response ? error.response.data.message : error.message
        );
      });
  };

  const firstscreen = (
    <>
      <ImageBackground
        source={require('../../assets/dev/dottile.png')}
        resizeMode="repeat"
        style={{
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').height * 0.9,
          justifyContent: 'flex-end',
        }}
      >
        <Card style={{ ...styles.card, ...styles.card1, marginBottom: 10 }}>
          <Card.Actions style={{ marginLeft: 5 }}>
            <MaterialCommunityIcons
              style={{
                marginLeft: 3,
                backgroundColor: '#fff',
                borderRadius: 50,
              }}
              name="arrow-left-circle"
              size={35}
              color={theme.colors.primary}
              onPress={() => navigation.goBack()}
            />
          </Card.Actions>
        </Card>
        <View style={{ justifyContent: 'center', flex: 1 }}>
          <Card
            style={{
              ...styles.card,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              paddingVertical: 30,
            }}
          >
            <Card.Cover
              resizeMode="center"
              source={require('../../assets/dev/logo.png')}
              style={{
                borderRadius: 4,
                elevation: 5,
                marginBottom: 10,
                width: Dimensions.get('screen').width * 0.9,
                height: 185,
                marginTop: 10,
                alignSelf: 'center',
              }}
            />
            <Card.Content>
              <Text style={styles.title}>
                Register by answering 6 quick questions.
              </Text>
            </Card.Content>
            <Card.Actions style={{ justifyContent: 'center' }}>
              <Button
                style={styles.buttonStyles}
                theme={{ fonts: { regular: 'Apple Color Emoji' } }}
                onPress={handleNextStep}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: theme.colors.light,
                  }}
                >
                  {' '}
                  Continue
                </Text>
              </Button>
            </Card.Actions>
          </Card>
        </View>
      </ImageBackground>
    </>
  );
  const firstSection = (
    <>
      <View style={styles.root}>
        <Spinner visible={state.loading} />
        <View>
          <Image
            resizeMode="stretch"
            source={require('../../assets/dev/forgetPasswordTopCurve.png')}
            style={{
              width: Dimensions.get('screen').width,
              height:
                Platform.OS === 'android'
                  ? Dimensions.get('screen').height * 0.2
                  : Dimensions.get('screen').height * 0.28,
            }}
          />
        </View>

        <KeyboardAvoidingView
          behavior="position"
          enabled={enableshift}
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            width: Dimensions.get('screen').width,
            height:
              Platform.OS === 'android'
                ? Dimensions.get('screen').height * 0.53
                : Dimensions.get('screen').height * 0.53,
          }}
        >
          <Card.Content>
            <Text style={styles.title}>Choose a username.</Text>
          </Card.Content>
          <Card elevation={2} style={styles.inputCard}>
            <TextInput
              placeholder="Full name"
              placeholderTextColor="#C7C7CD"
              style={styles.inputStyle}
              value={name}
              onSubmitEditing={() => usernameRef.current.focus()}
              blurOnSubmit={false}
              onFocus={() => setenableShift(true)}
              onChangeText={(text) => setName(text)}
            />
          </Card>
          <Card style={styles.inputCard}>
            <TextInput
              placeholderTextColor="#C7C7CD"
              placeholder="Username"
              ref={usernameRef}
              style={styles.inputStyle}
              value={username}
              onFocus={() => setenableShift(true)}
              onChangeText={(text) => setUsername(text.trim())}
            />
          </Card>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <Button
              color="#fff"
              disabled={state.loading}
              style={styles.buttonStyles}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonText}> Previous</Text>{' '}
            </Button>
            <Button
              color="#fff"
              disabled={state.loading}
              style={styles.buttonStyles}
              onPress={handleNextStep}
            >
              <Text style={styles.buttonText}> Continue</Text>{' '}
            </Button>
          </View>
        </KeyboardAvoidingView>

        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: 0,
            margin: 0,
          }}
        >
          <Image
            resizeMode="stretch"
            source={require('../../assets/dev/loginBottomCurve.png')}
            style={{
              width: Dimensions.get('screen').width,
              height: Dimensions.get('screen').height * 0.2,
            }}
          />
        </View>
      </View>
    </>
  );
  const secondSection = (
    <>
      <View style={styles.root}>
        <Spinner visible={state.loading} />
        <View>
          <Image
            resizeMode="stretch"
            source={require('../../assets/dev/loginTopCurve.png')}
            style={{
              width: Dimensions.get('screen').width,
              height:
                Platform.OS === 'android'
                  ? Dimensions.get('screen').height * 0.2
                  : Dimensions.get('screen').height * 0.28,
            }}
          />
        </View>

        <KeyboardAvoidingView
          behavior="position"
          enabled={enableshift}
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height * 0.53,
          }}
        >
          <Card.Content>
            <Text style={styles.title}> Enter your Email and Password </Text>
          </Card.Content>
          <Card style={styles.inputCard}>
            <TextInput
              placeholder="Email"
              style={styles.inputStyle}
              placeholderTextColor="#C7C7CD"
              value={email}
              onSubmitEditing={() => passwordRef.current.focus()}
              blurOnSubmit={false}
              onFocus={() => setenableShift(true)}
              onChangeText={(text) => setEmail(text.trim())}
            />
          </Card>
          <Card style={styles.inputCard}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#C7C7CD"
              style={styles.inputStyle}
              value={password}
              ref={passwordRef}
              onSubmitEditing={() => confirmPasswordRef.current.focus()}
              blurOnSubmit={false}
              secureTextEntry={true}
              onFocus={() => setenableShift(true)}
              onChangeText={(text) => setPassword(text.trim())}
            />
          </Card>
          <Card style={styles.inputCard}>
            <TextInput
              placeholderTextColor="#C7C7CD"
              placeholder="Confirm Password"
              style={styles.inputStyle}
              ref={confirmPasswordRef}
              value={confirmPassword}
              secureTextEntry={true}
              onFocus={() => setenableShift(true)}
              onChangeText={(text) => setConfirmPassword(text.trim())}
            />
          </Card>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <Button
              color="#fff"
              disabled={state.loading}
              style={styles.buttonStyles}
              onPress={handleBackStep}
            >
              <Text style={styles.buttonText}> Previous</Text>{' '}
            </Button>
            <Button
              color="#fff"
              disabled={state.loading}
              style={styles.buttonStyles}
              onPress={handleNextStep}
            >
              <Text style={styles.buttonText}> Continue</Text>{' '}
            </Button>
          </View>
        </KeyboardAvoidingView>

        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: 0,
            margin: 0,
          }}
        >
          <Image
            resizeMode="stretch"
            source={require('../../assets/dev/resetPasswordBottomCurve.png')}
            style={{
              width: Dimensions.get('screen').width,
              height: Dimensions.get('screen').height * 0.2,
            }}
          />
        </View>
      </View>
    </>
  );
  const thirdSection = (
    <>
      <View style={styles.root}>
        <Spinner visible={state.loading} />
        <View>
          <Image
            resizeMode="stretch"
            source={require('../../assets/dev/forgetPasswordTopCurve.png')}
            style={{
              width: Dimensions.get('screen').width,
              height:
                Platform.OS === 'android'
                  ? Dimensions.get('screen').height * 0.2
                  : Dimensions.get('screen').height * 0.28,
            }}
          />
        </View>
        <KeyboardAvoidingView
          behavior="position"
          enabled={enableshift}
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            flex: 1,
            width: Dimensions.get('screen').width * 0.9,
          }}
        >
          <View
            style={{
              height: Dimensions.get('screen').height * 0.5,
              justifyContent: 'center',
            }}
          >
            <Card.Content>
              <Text style={styles.title}> Which one are you?</Text>
            </Card.Content>
            <View
              style={{
                height: Dimensions.get('screen').height * 0.35,
                justifyContent: 'space-between',
              }}
            >
              <DropDownPicker
                customArrowUp={() => (
                  <View style={styles.dropdownIconContainer}>
                    <MaterialIcons
                      name="keyboard-arrow-up"
                      size={36}
                      color={theme.colors.light}
                    />
                  </View>
                )}
                customArrowDown={() => (
                  <View style={styles.dropdownIconContainer}>
                    <MaterialIcons
                      name="keyboard-arrow-down"
                      size={36}
                      color={theme.colors.light}
                    />
                  </View>
                )}
                defaultValue={divorseStatus}
                items={[
                  {
                    label: 'Thinking of separating',
                    value: 'Thinking of separating',
                    icon: () => {},
                  },
                  {
                    label: 'I’m going through a divorce',
                    value: 'I’m going through a divorce',
                    icon: () => {},
                  },
                  {
                    label: 'I’m already divorced',
                    value: 'I’m already divorced',
                    icon: () => {},
                  },
                ]}
                placeholder="Choose one"
                placeholderStyle={{
                  justifyContent: 'flex-start',
                  paddingHorizontal: 10,
                  fontSize: 16,
                  fontFamily: theme.fonts.regular.fontFamily,
                  color: theme.colors.grey,
                }}
                style={{
                  ...styles.inputStyle,
                  borderTopLeftRadius: 40,
                  borderTopRightRadius: 40,
                  borderBottomLeftRadius: 40,
                  borderBottomRightRadius: 40,
                }}
                containerStyle={{
                  height: 55,
                  width: Dimensions.get('screen').width * 0.89,
                  alignSelf: 'center',
                }}
                renderSeperator={() => (
                  <View
                    style={{
                      height: 1,
                      borderBottomWidth: 1,
                      width: '80%',
                      alignSelf: 'center',
                      borderBottomColor: theme.colors.grey,
                    }}
                  ></View>
                )}
                itemStyle={{
                  justifyContent: 'flex-start',
                  paddingLeft: 20,
                  paddingVertical: 10,
                }}
                labelStyle={{
                  color: theme.colors.grey,
                  fontFamily: theme.fonts.regular.fontFamily,
                  fontSize: 16,
                }}
                dropDownStyle={{
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                }}
                onChangeItem={(item) => setDivorseStatus(item.value)}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}
              >
                <Button
                  color="#fff"
                  disabled={state.loading}
                  style={styles.buttonStyles}
                  onPress={handleBackStep}
                >
                  <Text style={styles.buttonText}> Previous</Text>{' '}
                </Button>
                <Button
                  color="#fff"
                  disabled={state.loading}
                  style={styles.buttonStyles}
                  onPress={handleNextStep}
                >
                  <Text style={styles.buttonText}> Continue</Text>{' '}
                </Button>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>

        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: 0,
            margin: 0,
          }}
        >
          <Image
            resizeMode="stretch"
            source={require('../../assets/dev/forgetPasswordBottomCurve.png')}
            style={{
              width: Dimensions.get('screen').width,
              height: Dimensions.get('screen').height * 0.2,
            }}
          />
        </View>
      </View>
    </>
  );
  const fourthSection = (
    <>
      <View style={styles.root}>
        <Spinner visible={state.loading} />
        <View>
          <Image
            resizeMode="stretch"
            source={require('../../assets/dev/loginTopCurve.png')}
            style={{
              width: Dimensions.get('screen').width,
              height:
                Platform.OS === 'android'
                  ? Dimensions.get('screen').height * 0.2
                  : Dimensions.get('screen').height * 0.28,
            }}
          />
        </View>

        <KeyboardAvoidingView
          behavior="position"
          enabled={enableshift}
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height * 0.53,
          }}
        >
          <Card.Content>
            <Text style={styles.title}> Select Your Location</Text>
          </Card.Content>
          {/* <Card style={styles.inputCard}>
            <DropDownPicker
              items={[
                {
                  label: 'USA',
                  value: 'usa',
                  icon: () => <Icon name="flag" size={18} color="#900" />,
                  hidden: true,
                },
                {
                  label: 'UK',
                  value: 'uk',
                  icon: () => <Icon name="flag" size={18} color="#900" />,
                },
                {
                  label: 'France',
                  value: 'france',
                  icon: () => <Icon name="flag" size={18} color="#900" />,
                },
              ]}
              searchTextInputProps={{onFocus: () => setenableShift(true)}}
              placeholder="Select Country"
              defaultValue={Ecountry}
              containerStyle={{height: 55, zIndex: 200}}
              style={{backgroundColor: '#fafafa'}}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{backgroundColor: '#fafafa', zIndex: 200}}
              onChangeItem={(item) => setEcountry(item.value)}
              searchable={true}
              searchablePlaceholder="Search for an item"
              searchablePlaceholderTextColor="gray"
              seachableStyle={{}}
              searchableError={() => <Text>Not Found</Text>}
            />
          </Card>
          <View style={styles.inputCard}>
            <DropDownPicker
              items={[
                {
                  label: 'USA',
                  value: 'usa',
                  icon: () => <Icon name="flag" size={18} color="#900" />,
                  hidden: true,
                },
                {
                  label: 'UK',
                  value: 'uk',
                  icon: () => <Icon name="flag" size={18} color="#900" />,
                },
                {
                  label: 'France',
                  value: 'france',
                  icon: () => <Icon name="flag" size={18} color="#900" />,
                },
              ]}
              searchTextInputProps={{onFocus: () => setenableShift(true)}}
              placeholder="Select an item"
              defaultValue={Ecountry}
              containerStyle={{height: 50, zIndex: 100}}
              style={{backgroundColor: '#fafafa'}}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={(item) => setEcountry(item.value)}
              searchable={true}
              searchablePlaceholder="Search for an item"
              searchablePlaceholderTextColor="gray"
              seachableStyle={{}}
              searchableError={() => <Text>Not Found</Text>}
            />
          </View> */}
          <Card style={styles.inputCard}>
            <SearchableDropdown
              resetValue={false}
              onFocus={() => setenableShift(true)}
              onTextChange={(text) => console.log(text)}
              //On text change listner on the searchable input
              onItemSelect={(item) => {
                setCountryId(item.id);
                setCountryName(item.name);
              }}
              //onItemSelect called after the selection from the dropdown
              //containerStyle={{padding: 5}}
              //suggestion container style
              textInputStyle={{
                //inserted text style
                padding: 12,
              }}
              itemStyle={{
                //single dropdown item style
                padding: 10,
                marginTop: 2,
                backgroundColor: '#FAF9F8',
                borderColor: '#bbb',
                borderWidth: 1,
              }}
              itemTextStyle={{
                //text style of a single dropdown item
                color: '#222',
              }}
              itemsContainerStyle={{
                //items container style you can pass maxHeight
                //to restrict the items dropdown hieght
                maxHeight: '60%',
              }}
              items={countriesData.map((item, i) => {
                const obj = {
                  id: item.id,
                  name: item.name,
                };
                return obj;
              })}
              //mapping of item array
              defaultIndex={countryName}
              //default selected item index
              placeholder="Select Country"
              //place holder for the search input
              //reset textInput Value with true and false state
              underlineColorAndroid="transparent"
              //To remove the underline from the android input
            />
          </Card>
          <Card style={styles.inputCard}>
            <SearchableDropdown
              onFocus={() => setenableShift(true)}
              //On text change listner on the searchable input
              onTextChange={(text) => console.log(text)}
              onItemSelect={(item) => setCity(item.name)}
              //onItemSelect called after the selection from the dropdown
              //containerStyle={{padding: 5}}
              //suggestion container style
              textInputStyle={{
                //inserted text style
                padding: 12,
              }}
              itemStyle={{
                //single dropdown item style
                padding: 10,
                marginTop: 2,
                backgroundColor: '#FAF9F8',
                borderColor: '#bbb',
                borderWidth: 1,
              }}
              itemTextStyle={{
                //text style of a single dropdown item
                color: '#222',
              }}
              itemsContainerStyle={{
                //items container style you can pass maxHeight
                //to restrict the items dropdown hieght
                maxHeight: '80%',
              }}
              setSort={(item, searchedText) =>
                item.name.toLowerCase().startsWith(searchedText.toLowerCase())
              }
              items={
                availalbleStates
                  ? availalbleStates.length > 0 &&
                    availalbleStates.map((item, i) => {
                      const obj = {
                        id: item.id,
                        name: item.name,
                      };
                      return obj;
                    })
                  : []
              }
              //mapping of item array
              defaultIndex={city}
              //default selected item index
              placeholder="Select State"
              //place holder for the search input
              resetValue={false}
              //reset textInput Value with true and false state
              underlineColorAndroid="transparent"
              //To remove the underline from the android input
            />
          </Card>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <Button
              color="#fff"
              disabled={state.loading}
              style={styles.buttonStyles}
              onPress={handleBackStep}
            >
              <Text style={styles.buttonText}> Previous</Text>{' '}
            </Button>
            <Button
              color="#fff"
              disabled={state.loading}
              style={styles.buttonStyles}
              onPress={handleNextStep}
            >
              <Text style={styles.buttonText}> Continue</Text>{' '}
            </Button>
          </View>
        </KeyboardAvoidingView>
        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: 0,
            margin: 0,
          }}
        >
          <Image
            resizeMode="stretch"
            source={require('../../assets/dev/resetPasswordBottomCurve.png')}
            style={{
              width: Dimensions.get('screen').width,
              height: Dimensions.get('screen').height * 0.2,
            }}
          />
        </View>
      </View>
    </>
  );
  const fifthSection = (
    <>
      <View style={styles.root}>
        <Spinner visible={state.loading} />
        <View>
          <Image
            resizeMode="stretch"
            source={require('../../assets/dev/forgetPasswordTopCurve.png')}
            style={{
              width: Dimensions.get('screen').width,
              height:
                Platform.OS === 'android'
                  ? Dimensions.get('screen').height * 0.25
                  : Dimensions.get('screen').height * 0.31,
            }}
          />
        </View>

        <KeyboardAvoidingView
          behavior="position"
          enabled={enableshift}
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            flex: 1,
            width: Dimensions.get('screen').width,
          }}
        >
          <Card.Content>
            <Text style={styles.title}> Select Your Gender</Text>
          </Card.Content>

          <View
            style={{
              height: Dimensions.get('screen').height * 0.4,
              justifyContent: 'space-around',
            }}
          >
            <DropDownPicker
              customArrowUp={() => (
                <View style={styles.dropdownIconContainer}>
                  <MaterialIcons
                    name="keyboard-arrow-up"
                    size={36}
                    color={theme.colors.light}
                  />
                </View>
              )}
              customArrowDown={() => (
                <View style={styles.dropdownIconContainer}>
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={36}
                    color={theme.colors.light}
                  />
                </View>
              )}
              items={[
                { label: 'Male', value: 'Male', icon: () => {} },
                { label: 'Female', value: 'Female', icon: () => {} },
              ]}
              placeholder="Choose one"
              placeholder="Choose one"
              placeholderStyle={{
                justifyContent: 'flex-start',
                paddingHorizontal: 10,
                fontSize: 16,
                fontFamily: theme.fonts.regular.fontFamily,
                color: theme.colors.grey,
              }}
              style={{
                ...styles.inputStyle,
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
                borderBottomLeftRadius: 40,
                borderBottomRightRadius: 40,
              }}
              containerStyle={{
                height: 55,
                width: Dimensions.get('screen').width * 0.89,
                alignSelf: 'center',
              }}
              renderSeperator={() => (
                <View
                  style={{
                    height: 1,
                    borderBottomWidth: 1,
                    width: '80%',
                    alignSelf: 'center',
                    borderBottomColor: theme.colors.grey,
                  }}
                ></View>
              )}
              itemStyle={{
                justifyContent: 'flex-start',
                paddingLeft: 20,
                paddingVertical: 10,
              }}
              labelStyle={{
                color: theme.colors.grey,
                fontFamily: theme.fonts.regular.fontFamily,
                fontSize: 16,
              }}
              dropDownStyle={{
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}
              defaultValue={gender}
              onChangeItem={(item) => setGender(item.value)}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}
            >
              <Button
                color="#fff"
                disabled={state.loading}
                style={styles.buttonStyles}
                onPress={handleBackStep}
              >
                <Text style={styles.buttonText}> Previous</Text>{' '}
              </Button>
              <Button
                color="#fff"
                disabled={state.loading}
                style={styles.buttonStyles}
                onPress={handleNextStep}
              >
                <Text style={styles.buttonText}> Continue</Text>{' '}
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>

        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: 0,
            margin: 0,
          }}
        >
          <Image
            resizeMode="stretch"
            source={require('../../assets/dev/resetPasswordBottomCurve.png')}
            style={{
              width: Dimensions.get('screen').width,
              height: Dimensions.get('screen').height * 0.25,
            }}
          />
        </View>
      </View>
    </>
  );
  const sixSection = (
    <>
      <View style={styles.root}>
        <Spinner visible={state.loading} />
        <View>
          <Image
            resizeMode="stretch"
            source={require('../../assets/dev/resetPasswordTopCurve.png')}
            style={{
              width: Dimensions.get('screen').width,
              height:
                Platform.OS === 'android'
                  ? Dimensions.get('screen').height * 0.25
                  : Dimensions.get('screen').height * 0.31,
            }}
          />
        </View>

        <KeyboardAvoidingView
          behavior="position"
          enabled={enableshift}
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            flex: 1,
            width: Dimensions.get('screen').width * 0.9,
          }}
        >
          <View
            style={{
              height: Dimensions.get('screen').height * 0.5,
              justifyContent: 'center',
            }}
          >
            <Text style={styles.title}> How old are you? </Text>

            <View
              style={{
                height: Dimensions.get('screen').height * 0.35,
                justifyContent: 'space-between',
              }}
            >
              <DropDownPicker
                customArrowUp={() => (
                  <View style={styles.dropdownIconContainer}>
                    <MaterialIcons
                      name="keyboard-arrow-up"
                      size={36}
                      color={theme.colors.light}
                    />
                  </View>
                )}
                customArrowDown={() => (
                  <View style={styles.dropdownIconContainer}>
                    <MaterialIcons
                      name="keyboard-arrow-down"
                      size={36}
                      color={theme.colors.light}
                    />
                  </View>
                )}
                items={[
                  {
                    label: '30 or under',
                    value: '30 or under',
                    icon: () => {},
                  },
                  { label: '31-40', value: '31-40', icon: () => {} },
                  { label: '41-50', value: '41-50', icon: () => {} },
                  { label: '51-60', value: '51-60', icon: () => {} },
                  { label: 'over 60', value: 'over 60', icon: () => {} },
                ]}
                style={{
                  ...styles.inputStyle,
                  borderTopLeftRadius: 40,
                  borderTopRightRadius: 40,
                  borderBottomLeftRadius: 40,
                  borderBottomRightRadius: 40,
                }}
                placeholder="Choose one"
                placeholderStyle={{
                  justifyContent: 'flex-start',
                  paddingHorizontal: 10,
                  fontSize: 16,
                  fontFamily: theme.fonts.regular.fontFamily,
                  color: theme.colors.grey,
                }}
                renderSeperator={() => (
                  <View
                    style={{
                      height: 1,
                      borderBottomWidth: 1,
                      width: '80%',
                      alignSelf: 'center',
                      borderBottomColor: theme.colors.grey,
                    }}
                  ></View>
                )}
                itemStyle={{
                  justifyContent: 'flex-start',
                  paddingLeft: 20,
                  paddingVertical: 10,
                }}
                containerStyle={{
                  height: 55,
                  width: Dimensions.get('screen').width * 0.89,
                  alignSelf: 'center',
                }}
                labelStyle={{
                  color: theme.colors.grey,
                  fontFamily: theme.fonts.regular.fontFamily,
                  fontSize: 16,
                }}
                dropDownStyle={{
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                }}
                defaultValue={age}
                onChangeItem={(item) => setAge(item.value)}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}
              >
                <Button
                  color="#fff"
                  disabled={state.loading}
                  style={styles.buttonStyles}
                  onPress={handleBackStep}
                >
                  <Text style={styles.buttonText}> Previous</Text>{' '}
                </Button>
                <Button
                  color="#fff"
                  disabled={state.loading}
                  style={styles.buttonStyles}
                  onPress={handleNextStep}
                >
                  <Text style={styles.buttonText}> Submit</Text>{' '}
                </Button>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>

        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: 0,
            margin: 0,
          }}
        >
          <Image
            resizeMode="stretch"
            source={require('../../assets/dev/forgetPasswordBottomCurve.png')}
            style={{
              width: Dimensions.get('screen').width,
              height: Dimensions.get('screen').height * 0.25,
            }}
          />
        </View>
      </View>
    </>
  );

  const sevenSection = (
    <Portal>
      <Modal
        visible={step === 7}
        onDismiss={() => console.log('dismiss')}
        contentContainerStyle={{
          ...styles.modal,
          height: '90%',
          padding: 3,
        }}
      >
        <>
          <Text style={styles.privacyTitle}> Privacy policy</Text>
          <View
            style={{
              borderBottomColor: theme.colors.grey,
              borderBottomWidth: 1,
              marginVertical: 7,
              width: '50%',
            }}
          />
          <ScrollView>
            <Text style={styles.privacyText}>{privacy}</Text>
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginVertical: 10,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}
          >
            <TouchableOpacity
              style={{
                width: '70%',
                padding: 5,
                backgroundColor: theme.colors.darkPink,
                borderRadius: 50,
              }}
              onPress={handleNextStep}
            >
              <Text style={{ textAlign: 'center', padding: 5, color: '#fff' }}>
                Accept
              </Text>
            </TouchableOpacity>
          </View>
        </>
      </Modal>
    </Portal>
  );
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.root}>
        {step === 1 ? firstSection : null}
        {step === 2 ? secondSection : null}
        {step === 3 ? thirdSection : null}
        {step == 4 ? fourthSection : null}
        {step == 5 ? fifthSection : null}
        {step == 6 ? sixSection : null}
        {step == 7 ? sevenSection : null}
      </View>
    </TouchableWithoutFeedback>
  );
}
export default withTheme(Register);
