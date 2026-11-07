import type { Metadata } from "next";
import { PageHero } from "../components/page-hero";
import { Process } from "../components/process";

export const metadata: Metadata = { title: "Contact us · Techisar" };

export default function Page() {
  return (
    <main className="flex-1">
      <PageHero title="Contact us" intro="Tell us about your project and we will get back to you within a day." />
      <Process />
    </main>
  );
}
