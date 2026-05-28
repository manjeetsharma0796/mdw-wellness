import type { LegalDocument } from "./types";
import { legalContact } from "./contact";

export const privacyDocument: LegalDocument = {
  title: "Privacy Policy",
  effectiveDate: "1st June, 2026",
  intro: [
    'This Privacy Policy ("Policy") describes how SwiftMeds Pharma Pvt Ltd, operating under the brand name MDW Wellness / My DawaiWala Wellness ("MDW Wellness", "Company", "we", "our", or "us"), collects, stores, uses, processes, shares, and protects personal information and wellness-related information of users.',
    "By accessing the website, submitting booking requests, making payments, interacting through WhatsApp, participating in therapist consultations, uploading reports, or availing services, you consent to the practices described in this Policy.",
  ],
  sections: [
    {
      number: 1,
      title: "Scope",
      body: [
        { kind: "paragraph", text: "This Policy applies to:" },
        {
          kind: "list",
          items: [
            "website visitors;",
            "booking form submissions;",
            "therapist consultation requests;",
            "wellness service bookings;",
            "subscription plans;",
            "WhatsApp communication;",
            "telephonic communication;",
            "payment interactions;",
            "uploaded reports and wellness-related information.",
          ],
        },
      ],
    },
    {
      number: 2,
      title: "Information We Collect",
      body: [
        {
          kind: "paragraph",
          text: "We may collect the following categories of information:",
        },
        {
          kind: "subsection",
          label: "A",
          title: "Personal Information",
          body: [
            { kind: "paragraph", text: "Including but not limited to:" },
            {
              kind: "list",
              items: [
                "full name;",
                "mobile number;",
                "email address;",
                "home or service address;",
                "age;",
                "gender;",
                "emergency contact information (where required);",
                "location information necessary for service coordination.",
              ],
            },
          ],
        },
        {
          kind: "subsection",
          label: "B",
          title: "Wellness & Health-Related Information",
          body: [
            {
              kind: "paragraph",
              text: "Users may voluntarily provide wellness-related information including:",
            },
            {
              kind: "list",
              items: [
                "symptoms;",
                "pain concerns;",
                "mobility concerns;",
                "rehabilitation requirements;",
                "wellness history;",
                "medical history voluntarily disclosed;",
                "uploaded prescriptions;",
                "reports;",
                "blood pressure data;",
                "blood sugar readings;",
                "pulse rate;",
                "oxygen saturation (SpO2);",
                "ECG-related information;",
                "weight-related information;",
                "wellness assessment notes.",
              ],
            },
            {
              kind: "paragraph",
              text: "Such information is collected only for wellness coordination, therapy suitability assessment, therapist assignment, session planning, service continuity, and safety purposes.",
            },
          ],
        },
        {
          kind: "subsection",
          label: "C",
          title: "Payment Information",
          body: [
            {
              kind: "paragraph",
              text: "Payments may be processed through third-party payment processors including Cashfree.",
            },
            {
              kind: "paragraph",
              text: "MDW Wellness does not ordinarily store full card details, banking passwords, OTPs, CVV information, or highly sensitive payment credentials.",
            },
            {
              kind: "paragraph",
              text: "Payment processing remains subject to the privacy and security practices of relevant payment providers.",
            },
          ],
        },
        {
          kind: "subsection",
          label: "D",
          title: "Technical Information",
          body: [
            { kind: "paragraph", text: "We may automatically collect:" },
            {
              kind: "list",
              items: [
                "browser type;",
                "device information;",
                "IP address;",
                "session information;",
                "website interaction information;",
                "usage logs.",
              ],
            },
            {
              kind: "paragraph",
              text: "This information may be used to improve performance, security, troubleshooting, and user experience.",
            },
          ],
        },
      ],
    },
    {
      number: 3,
      title: "Purpose of Collection",
      body: [
        {
          kind: "paragraph",
          text: "We may collect and process information for purposes including:",
        },
        {
          kind: "list",
          items: [
            "booking coordination;",
            "therapist assignment;",
            "scheduling appointments;",
            "conducting therapist consultations;",
            "wellness assessment support;",
            "session planning;",
            "follow-up support;",
            "package or subscription management;",
            "payment processing;",
            "fraud prevention;",
            "safety verification;",
            "service quality monitoring;",
            "internal documentation;",
            "customer support;",
            "grievance handling;",
            "operational compliance.",
          ],
        },
      ],
    },
    {
      number: 4,
      title: "Consent",
      body: [
        {
          kind: "paragraph",
          text: "By voluntarily providing information through forms, calls, WhatsApp, uploads, website interactions, therapist consultations, or service booking, users acknowledge and consent that:",
        },
        {
          kind: "list",
          items: [
            "information provided is accurate to the best of their knowledge;",
            "wellness-related information may be reviewed internally for service coordination;",
            "therapists may access relevant information necessary to safely provide services;",
            "executives may contact users regarding appointments, scheduling, follow-up, packages, support, or operational coordination.",
          ],
        },
        {
          kind: "paragraph",
          text: "Users may choose not to provide certain information; however, this may limit service availability or suitability.",
        },
      ],
    },
    {
      number: 5,
      title: "WhatsApp & Communication Consent",
      body: [
        {
          kind: "paragraph",
          text: "By submitting a booking request or contacting MDW Wellness, users consent to receiving:",
        },
        {
          kind: "list",
          items: [
            "appointment confirmations;",
            "scheduling communication;",
            "therapist coordination messages;",
            "payment reminders;",
            "service updates;",
            "follow-up communication;",
            "wellness-related service notifications.",
          ],
        },
        { kind: "paragraph", text: "Communication may occur through:" },
        {
          kind: "list",
          items: [
            "WhatsApp;",
            "telephone calls;",
            "SMS;",
            "email;",
            "internal support channels.",
          ],
        },
        {
          kind: "paragraph",
          text: "Users may request communication preferences where operationally feasible.",
        },
      ],
    },
    {
      number: 6,
      title: "Sharing of Information",
      body: [
        {
          kind: "paragraph",
          text: "We may share limited information on a need-to-know basis with:",
        },
        {
          kind: "subsection",
          label: "A",
          title: "Therapists",
          body: [
            {
              kind: "paragraph",
              text: "Relevant information necessary for safe and suitable session delivery.",
            },
          ],
        },
        {
          kind: "subsection",
          label: "B",
          title: "Employees & Executives",
          body: [
            {
              kind: "paragraph",
              text: "Authorized personnel responsible for:",
            },
            {
              kind: "list",
              items: [
                "scheduling;",
                "operations;",
                "customer support;",
                "quality checks;",
                "safety monitoring.",
              ],
            },
          ],
        },
        {
          kind: "subsection",
          label: "C",
          title: "Service Providers",
          body: [
            {
              kind: "paragraph",
              text: "Third-party vendors assisting with:",
            },
            {
              kind: "list",
              items: [
                "payment processing;",
                "technology systems;",
                "dashboard management;",
                "messaging services;",
                "communication infrastructure.",
              ],
            },
          ],
        },
        {
          kind: "subsection",
          label: "D",
          title: "Legal or Compliance Situations",
          body: [
            { kind: "paragraph", text: "Where required by:" },
            {
              kind: "list",
              items: [
                "applicable law;",
                "lawful governmental requests;",
                "court orders;",
                "fraud investigation;",
                "safety concerns.",
              ],
            },
          ],
        },
        {
          kind: "paragraph",
          text: "We do not sell user personal information to third parties.",
        },
      ],
    },
    {
      number: 7,
      title: "Data Storage & Security",
      body: [
        {
          kind: "paragraph",
          text: "MDW Wellness seeks to maintain commercially reasonable administrative, technical, and organizational safeguards to protect information.",
        },
        {
          kind: "paragraph",
          text: "However, no online transmission, storage system, website, or digital platform can be guaranteed completely secure.",
        },
        {
          kind: "paragraph",
          text: "Users acknowledge inherent cybersecurity and internet-related risks.",
        },
      ],
    },
    {
      number: 8,
      title: "User Responsibilities",
      body: [
        { kind: "paragraph", text: "Users are responsible for:" },
        {
          kind: "list",
          items: [
            "submitting accurate information;",
            "ensuring uploaded documents belong to them or are lawfully shared;",
            "safeguarding personal devices;",
            "maintaining confidentiality of login or access information where applicable.",
          ],
        },
        {
          kind: "paragraph",
          text: "Users must not upload false, fraudulent, misleading, or unauthorized medical or wellness information.",
        },
      ],
    },
    {
      number: 9,
      title: "Data Retention",
      body: [
        {
          kind: "paragraph",
          text: "Information may be retained for reasonable periods necessary for:",
        },
        {
          kind: "list",
          items: [
            "continuity of services;",
            "customer support;",
            "quality review;",
            "internal operational requirements;",
            "grievance handling;",
            "legal, safety, or compliance obligations.",
          ],
        },
        {
          kind: "paragraph",
          text: "MDW Wellness reserves the right to retain records where reasonably necessary to protect lawful business interests or comply with legal obligations.",
        },
      ],
    },
    {
      number: 10,
      title: "User Rights & Requests",
      body: [
        {
          kind: "paragraph",
          text: "Users may request, subject to operational feasibility and legal limitations:",
        },
        {
          kind: "list",
          items: [
            "correction of inaccurate information;",
            "updating personal information;",
            "deletion requests;",
            "communication preference modifications.",
          ],
        },
        {
          kind: "paragraph",
          text: "Requests may be reviewed and processed within a commercially reasonable timeframe.",
        },
        {
          kind: "paragraph",
          text: "Certain records may be retained where legally, operationally, or safety necessary.",
        },
      ],
    },
    {
      number: 11,
      title: "Minors & Dependents",
      body: [
        {
          kind: "paragraph",
          text: "Services for minors, elderly persons, or dependent individuals may require parent, guardian, caregiver, or authorized representative supervision and consent.",
        },
        {
          kind: "paragraph",
          text: "MDW Wellness does not knowingly collect information from minors without appropriate supervision or authorization.",
        },
      ],
    },
    {
      number: 12,
      title: "Third-Party Services",
      body: [
        {
          kind: "paragraph",
          text: "The website or services may involve third-party systems including payment processors, communication systems, dashboards, or integrations.",
        },
        {
          kind: "paragraph",
          text: "MDW Wellness is not responsible for independent privacy practices of third-party platforms.",
        },
        {
          kind: "paragraph",
          text: "Users are encouraged to review applicable third-party policies.",
        },
      ],
    },
    {
      number: 13,
      title: "Cookies & Technical Tracking",
      body: [
        {
          kind: "paragraph",
          text: "The website may use cookies or related technologies to:",
        },
        {
          kind: "list",
          items: [
            "improve user experience;",
            "improve performance;",
            "analyze website usage;",
            "enhance functionality;",
            "maintain platform security.",
          ],
        },
        {
          kind: "paragraph",
          text: "Users may modify browser settings to restrict cookies, though certain website functions may be affected.",
        },
      ],
    },
    {
      number: 14,
      title: "Limitation of Liability",
      body: [
        {
          kind: "paragraph",
          text: "While MDW Wellness seeks to maintain reasonable safeguards, the Company does not warrant uninterrupted, error-free, or completely secure data transmission.",
        },
        {
          kind: "paragraph",
          text: "To the extent permitted by law, the Company shall not be liable for unauthorized access, cyber incidents, third-party breaches, or circumstances beyond reasonable control.",
        },
      ],
    },
    {
      number: 15,
      title: "Policy Updates",
      body: [
        {
          kind: "paragraph",
          text: "MDW Wellness reserves the right to revise or update this Privacy Policy periodically.",
        },
        {
          kind: "paragraph",
          text: "Updated versions may be published on the website and become effective upon publication unless otherwise stated.",
        },
        {
          kind: "paragraph",
          text: "Continued use of services after updates may constitute acceptance of revised terms.",
        },
      ],
    },
  ],
  contact: legalContact,
};
