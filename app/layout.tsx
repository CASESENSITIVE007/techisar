import type { Metadata } from "next";
import { Bricolage_Grotesque, Caveat, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "./components/navbar";
import { PointerGlow } from "./components/reveal";
import { SiteFooter } from "./components/site-footer";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"], weight: ["600", "700"] });

export const metadata: Metadata = {
  title: "Techisar",
  description: "Techisar designs, builds and launches apps, websites and AI products.",
};

// Applies the saved theme before first paint, and marks that scripting is on so
// entrance states only ever hide content a script will show again.
const themeScript = `(function(){var r=document.documentElement;r.classList.add("js");try{var t=localStorage.getItem("theme");if(t)r.setAttribute("data-theme",t)}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${bricolage.variable} ${jakarta.variable} ${jetbrains.variable} ${caveat.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <div className="sky" aria-hidden="true">
          <span className="sky__blob sky__blob--a" />
          <span className="sky__blob sky__blob--b" />
          <span className="sky__blob sky__blob--c" />
          <span className="sky__dots" />
        </div>
        <PointerGlow />
        <Navbar />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
