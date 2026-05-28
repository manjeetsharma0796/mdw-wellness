import type { LegalDocument } from "./types";
import { legalContact } from "./contact";

export const termsDocument: LegalDocument = {
  title: "Terms & Conditions",
  effectiveDate: "1st June, 2026",
  intro: [
    'These Terms & Conditions ("Terms") govern access to and use of services offered by SwiftMeds Pharma Pvt Ltd, operating under the brand name MDW Wellness / My DawaiWala Wellness ("MDW Wellness", "Company", "we", "our", or "us") through its website, booking forms, WhatsApp channels, telephonic communication, mobile interfaces, executives, therapists, and associated digital or offline systems.',
    'By accessing the website, submitting a booking request, scheduling an appointment, purchasing a package, making payment, participating in a video consultation, or availing any service, you ("User", "Customer", "Patient", "Guardian") agree to these Terms.',
  ],
  sections: [
    {
      number: 1,
      title: "Nature of Services",
      body: [
        {
          kind: "paragraph",
          text: "MDW Wellness provides wellness, rehabilitation-support, mobility-support, and therapist-assisted services, including but not limited to:",
        },
        {
          kind: "list",
          items: [
            "Home physiotherapy support",
            "Rehabilitation support sessions",
            "Wellness massage services",
            "Blood pressure and wellness vitals monitoring",
            "Therapist-led video consultations",
            "Exercise and mobility guidance",
            "Dry cupping and fire cupping wellness services",
            "Appointment scheduling with therapists",
            "Subscription or wellness support plans",
          ],
        },
        {
          kind: "paragraph",
          text: "MDW Wellness does not provide emergency medical care, physician consultation, hospital services, ambulance-linked treatment, medical diagnosis, prescription medication, or medical emergency intervention.",
        },
        {
          kind: "paragraph",
          text: "Any therapist interaction shall be limited to wellness, rehabilitation-support, functional assessment, therapy suitability assessment, mobility evaluation, exercise recommendation, and supportive wellness guidance within professional scope.",
        },
      ],
    },
    {
      number: 2,
      title: "Eligibility",
      body: [
        { kind: "paragraph", text: "Users must:" },
        {
          kind: "list",
          items: [
            "Be at least 18 years of age; or",
            "Use the service through a lawful parent, guardian, or authorized caregiver.",
          ],
        },
        {
          kind: "paragraph",
          text: "For minors, elderly persons, or dependent patients, a responsible adult may be required to remain present during service delivery.",
        },
      ],
    },
    {
      number: 3,
      title: "Booking Process",
      body: [
        { kind: "paragraph", text: "The general workflow may include:" },
        {
          kind: "list",
          ordered: true,
          items: [
            "User submits booking request;",
            "User may complete advance payment (where applicable);",
            "MDW Wellness executive contacts the user;",
            "Therapist consultation or scheduling discussion occurs;",
            "Therapist assignment is completed;",
            "Session is scheduled;",
            "Therapist visits or virtual session takes place;",
            "Wellness or therapy assessment notes may be uploaded to internal systems;",
            "Follow-up recommendations or packages may be offered.",
          ],
        },
        {
          kind: "paragraph",
          text: "Submission of a booking request does not guarantee therapist availability or service confirmation.",
        },
        {
          kind: "paragraph",
          text: "MDW Wellness reserves the right to refuse, postpone, or reschedule appointments.",
        },
      ],
    },
    {
      number: 4,
      title: "OTP-Based Session Commencement",
      body: [
        {
          kind: "paragraph",
          text: 'For applicable home visits, MDW Wellness may use a One-Time Password ("OTP") verification mechanism.',
        },
        {
          kind: "paragraph",
          text: "By voluntarily sharing the OTP with the therapist or executive, the User acknowledges that:",
        },
        {
          kind: "list",
          items: [
            "the therapist has arrived;",
            "the scheduled service has commenced;",
            "attendance has been accepted;",
            "applicable session charges become payable and/or non-refundable subject to policy.",
          ],
        },
        {
          kind: "paragraph",
          text: "Once OTP verification is completed, the session shall ordinarily be considered initiated.",
        },
      ],
    },
    {
      number: 5,
      title: "Payments",
      body: [
        { kind: "paragraph", text: "Payments may be collected through:" },
        {
          kind: "list",
          items: [
            "Cashfree payment gateway;",
            "UPI;",
            "approved digital payment systems;",
            "cash payments where expressly permitted.",
          ],
        },
        {
          kind: "paragraph",
          text: "Video consultations are prepaid unless otherwise specified.",
        },
        {
          kind: "paragraph",
          text: "The Company shall not be liable for interruptions, payment failures, banking delays, gateway downtime, or third-party payment processing issues.",
        },
      ],
    },
    {
      number: 6,
      title: "Cancellation, Rescheduling & Refunds",
      body: [
        {
          kind: "paragraph",
          text: "Users may cancel scheduled appointments subject to the following:",
        },
        {
          kind: "paragraph",
          text: "Cancellations requested at least 4 to 6 hours before the scheduled session may be eligible for refund or rescheduling, subject to operational feasibility.",
        },
        {
          kind: "paragraph",
          text: "Cancellations requested less than 4 hours before the scheduled session may attract a cancellation charge of up to 25% of the applicable session fee.",
        },
        {
          kind: "paragraph",
          text: "Rescheduling requests should ordinarily be made at least 4 to 8 hours prior to the scheduled appointment.",
        },
        {
          kind: "paragraph",
          text: "Refunds, where approved, may be processed within up to 7 working days.",
        },
        {
          kind: "paragraph",
          text: "No partial refund shall ordinarily be permitted where:",
        },
        {
          kind: "list",
          items: [
            "the therapist has reached the service location; OR",
            "OTP verification has been completed.",
          ],
        },
        {
          kind: "paragraph",
          text: "Detailed terms may additionally be governed by the separate Cancellation & Refund Policy.",
        },
      ],
    },
    {
      number: 7,
      title: "Therapist Delays and No-Show Situations",
      body: [
        {
          kind: "paragraph",
          text: "MDW Wellness shall make commercially reasonable efforts to ensure therapist punctuality.",
        },
        {
          kind: "paragraph",
          text: "In the event of a therapist non-attendance:",
        },
        {
          kind: "list",
          items: [
            "alternative scheduling may be offered;",
            "replacement therapist assignment may be attempted;",
            "compensation, credits, refunds, or internal corrective action may be considered on a case-by-case basis.",
          ],
        },
        {
          kind: "paragraph",
          text: "The Company reserves discretion regarding therapist disciplinary measures.",
        },
      ],
    },
    {
      number: 8,
      title: "User Responsibilities",
      body: [
        { kind: "paragraph", text: "Users agree to:" },
        {
          kind: "list",
          items: [
            "provide accurate personal and health-related information;",
            "disclose relevant injuries, allergies, pain conditions, surgeries, medications, or medical limitations;",
            "maintain a safe and appropriate environment for service delivery;",
            "avoid abusive, threatening, discriminatory, unsafe, or inappropriate conduct;",
            "ensure suitable adult supervision for minors or dependent patients.",
          ],
        },
        {
          kind: "paragraph",
          text: "Users acknowledge that withholding relevant medical or wellness information may affect service suitability and outcomes.",
        },
      ],
    },
    {
      number: 9,
      title: "Scope Limitation & Wellness Positioning",
      body: [
        {
          kind: "paragraph",
          text: "MDW Wellness services are intended to support wellness, mobility, rehabilitation support, functional improvement, comfort, and guided therapeutic exercise.",
        },
        {
          kind: "paragraph",
          text: "MDW Wellness does not guarantee:",
        },
        {
          kind: "list",
          items: [
            "pain elimination;",
            "permanent improvement;",
            "cure;",
            "medical outcomes;",
            "recovery timelines;",
            "disease treatment;",
            "prevention of future injury.",
          ],
        },
        {
          kind: "paragraph",
          text: "Any exercise recommendations, rehabilitation guidance, or wellness suggestions are supportive in nature and should not be interpreted as physician advice or medical prescription.",
        },
      ],
    },
    {
      number: 10,
      title: "Emergency Situations",
      body: [
        {
          kind: "paragraph",
          text: "MDW Wellness does not provide emergency medical services.",
        },
        {
          kind: "paragraph",
          text: "Users must immediately seek emergency care, hospital care, or physician intervention for situations including but not limited to:",
        },
        {
          kind: "list",
          items: [
            "chest pain;",
            "stroke symptoms;",
            "breathing difficulty;",
            "severe trauma;",
            "fractures;",
            "seizures;",
            "loss of consciousness;",
            "uncontrolled bleeding;",
            "paralysis;",
            "medical emergencies.",
          ],
        },
        {
          kind: "paragraph",
          text: "MDW Wellness reserves the right to refuse or discontinue services where emergency care appears necessary.",
        },
      ],
    },
    {
      number: 11,
      title: "Health Information & Consent",
      body: [
        {
          kind: "paragraph",
          text: "Users voluntarily consent to providing personal and wellness-related information for service coordination, therapist assignment, session planning, safety assessment, and follow-up.",
        },
        {
          kind: "paragraph",
          text: "Such information may include:",
        },
        {
          kind: "list",
          items: [
            "name;",
            "mobile number;",
            "address;",
            "age;",
            "gender;",
            "symptoms;",
            "wellness concerns;",
            "prescriptions uploaded by users;",
            "reports;",
            "wellness vitals;",
            "blood pressure;",
            "pulse;",
            "oxygen saturation;",
            "blood sugar readings;",
            "weight;",
            "ECG-related information.",
          ],
        },
        {
          kind: "paragraph",
          text: "Processing of such information shall be governed by the Privacy Policy.",
        },
      ],
    },
    {
      number: 12,
      title: "Therapist Relationship",
      body: [
        {
          kind: "paragraph",
          text: "Therapists engaged through MDW Wellness may operate on a contractual basis.",
        },
        {
          kind: "paragraph",
          text: "While commercially reasonable verification measures may be undertaken, including professional verification, KYC, experience checks, and police verification, MDW Wellness does not guarantee specific outcomes or uninterrupted therapist availability.",
        },
      ],
    },
    {
      number: 13,
      title: "Limitation of Liability",
      body: [
        {
          kind: "paragraph",
          text: "To the maximum extent permitted by law, SwiftMeds Pharma Pvt Ltd, its directors, employees, executives, therapists, affiliates, and representatives shall not be liable for:",
        },
        {
          kind: "list",
          items: [
            "dissatisfaction with results;",
            "delayed recovery;",
            "worsening of undisclosed pre-existing conditions;",
            "allergic or physical sensitivity reactions;",
            "service interruptions;",
            "scheduling delays;",
            "third-party payment failures;",
            "consequences arising from incomplete disclosure by users.",
          ],
        },
        {
          kind: "paragraph",
          text: "Nothing in these Terms shall exclude liability where exclusion is prohibited under applicable law.",
        },
      ],
    },
    {
      number: 14,
      title: "Suspension or Refusal of Service",
      body: [
        {
          kind: "paragraph",
          text: "MDW Wellness may refuse, suspend, postpone, or terminate services where:",
        },
        {
          kind: "list",
          items: [
            "safety concerns arise;",
            "abuse or misconduct occurs;",
            "emergency medical intervention appears necessary;",
            "false information is suspected;",
            "unsafe premises exist;",
            "payment obligations remain pending.",
          ],
        },
      ],
    },
    {
      number: 15,
      title: "Intellectual Property",
      body: [
        {
          kind: "paragraph",
          text: "All website content, trademarks, logos, processes, materials, software interfaces, designs, and branding related to MDW Wellness remain the intellectual property of SwiftMeds Pharma Pvt Ltd.",
        },
      ],
    },
    {
      number: 16,
      title: "Governing Law & Jurisdiction",
      body: [
        {
          kind: "paragraph",
          text: "These Terms shall be governed by laws applicable in India.",
        },
        {
          kind: "paragraph",
          text: "Any disputes shall be subject to the exclusive jurisdiction of competent courts located in Kolkata, West Bengal.",
        },
      ],
    },
  ],
  contact: legalContact,
};
