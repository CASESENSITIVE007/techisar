import type { Metadata } from "next";
import { PagePlaceholder } from "../components/page-placeholder";

export const metadata: Metadata = { title: "Services · Techisar" };

export default function Page() {
  return <PagePlaceholder title="Services" intro="Websites, mobile apps, AI features and design systems, built end to end." />;
}
