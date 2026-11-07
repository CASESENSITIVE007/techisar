import type { Metadata } from "next";
import { PageHero } from "../components/page-hero";
import { Expertise } from "../components/expertise";
import { WhatWeBuild } from "../components/what-we-build";

export const metadata: Metadata = { title: "Services · Techisar" };

export default function Page() {
  return (
    <main className="flex-1">
      <PageHero title="Services" intro="Websites, mobile apps, AI features and design systems, built end to end." />
      <Expertise standalone />
      <WhatWeBuild />
    </main>
  );
}
