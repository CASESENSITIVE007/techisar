import type { Metadata } from "next";
import { PagePlaceholder } from "../components/page-placeholder";

export const metadata: Metadata = { title: "Process · Techisar" };

export default function Page() {
  return <PagePlaceholder title="Process" intro="From first sketch to live in weeks: how we plan, design, build and launch." />;
}
