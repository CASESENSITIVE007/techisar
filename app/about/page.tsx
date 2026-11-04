import type { Metadata } from "next";
import { PagePlaceholder } from "../components/page-placeholder";

export const metadata: Metadata = { title: "About · Techisar" };

export default function Page() {
  return <PagePlaceholder title="About" intro="A small senior team that ships digital products for businesses." />;
}
