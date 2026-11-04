import type { Metadata } from "next";
import { PagePlaceholder } from "../components/page-placeholder";

export const metadata: Metadata = { title: "Contact us · Techisar" };

export default function Page() {
  return <PagePlaceholder title="Contact us" intro="Tell us about your project and we will get back to you within a day." />;
}
