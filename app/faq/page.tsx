import type { Metadata } from "next";
import { PageHero } from "../components/page-hero";
import { Faq } from "../components/faq";

export const metadata: Metadata = { title: "FAQ · Techisar" };

export default function Page() {
  return (
    <main className="flex-1">
      <PageHero title="FAQ" intro="Answers to the questions we hear most often." />
      <Faq />
    </main>
  );
}
