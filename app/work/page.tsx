import type { Metadata } from "next";
import { PageHero } from "../components/page-hero";
import { RecentWork } from "../components/recent-work";

export const metadata: Metadata = { title: "Work · Techisar" };

export default function Page() {
  return (
    <main className="flex-1">
      <PageHero title="Work" intro="A selection of products we have designed, built and launched." />
      <RecentWork standalone />
    </main>
  );
}
