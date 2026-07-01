import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with FlinkFreight Logistics for a free quote or any questions about our freight and logistics services.",
};

export default function ContactPage() {
  return <ContactContent />;
}
