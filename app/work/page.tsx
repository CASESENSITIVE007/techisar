import type { Metadata } from "next";
import { PagePlaceholder } from "../components/page-placeholder";

export const metadata: Metadata = { title: "Work · Techisar" };

export default function Page() {
  return <PagePlaceholder title="Work" intro="A selection of products we have designed, built and launched." />;
}
