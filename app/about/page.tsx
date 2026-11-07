import type { Metadata } from "next";
import { PageHero } from "../components/page-hero";
import { WhoWeWorkWith } from "../components/who-we-work-with";
import { Expertise } from "../components/expertise";

export const metadata: Metadata = { title: "About · Techisar" };

export default function Page() {
  return (
    <main className="flex-1">
      <PageHero title="About" intro="A small senior team that ships digital products for businesses." />
      <WhoWeWorkWith />
      <Expertise />
    </main>
  );
}
