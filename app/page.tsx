import { Faq } from "./components/faq";
import { Hero } from "./components/hero";
import { Process } from "./components/process";
import { Expertise } from "./components/expertise";
import { RecentWork } from "./components/recent-work";
import { WhatWeBuild } from "./components/what-we-build";
import { WhoWeWorkWith } from "./components/who-we-work-with";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <RecentWork />
      <Expertise />
      <WhoWeWorkWith />
      <WhatWeBuild />
      <Process />
      <Faq />
    </main>
  );
}
