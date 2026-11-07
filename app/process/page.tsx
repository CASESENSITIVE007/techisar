import type { Metadata } from "next";
import { PageHero } from "../components/page-hero";
import { Process } from "../components/process";

export const metadata: Metadata = { title: "Process · Techisar" };

export default function Page() {
  return (
    <main className="flex-1">
      <PageHero title="Process" intro="From first sketch to live in weeks: how we plan, design, build and launch." />
      <Process standalone />
    </main>
  );
}
