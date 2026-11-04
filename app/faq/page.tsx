import type { Metadata } from "next";
import { PagePlaceholder } from "../components/page-placeholder";

export const metadata: Metadata = { title: "FAQ · Techisar" };

export default function Page() {
  return <PagePlaceholder title="FAQ" intro="Answers to the questions we hear most often." />;
}
