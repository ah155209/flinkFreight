import type { Metadata } from "next";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Ocean freight, air freight, ground transportation, warehousing, customs and supply chain management from FlinkFreight Logistics.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
