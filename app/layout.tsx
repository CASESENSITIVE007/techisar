import type { Metadata } from "next";
import { Atkinson_Hyperlegible_Mono, Host_Grotesk } from "next/font/google";
import { Navbar } from "./components/navbar";
import { SiteFooter } from "./components/site-footer";
import "./globals.css";

const host = Host_Grotesk({
  variable: "--font-host",
  subsets: ["latin"],
});

const atkinsonMono = Atkinson_Hyperlegible_Mono({
  variable: "--font-atkinson-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Techisar",
  description: "Techisar designs, builds and launches apps, websites and AI products.",
};

// Applies the saved sheet before first paint, and marks that scripting is on so
// entrance states only ever hide content a script will show again.
const themeScript = `(function(){var r=document.documentElement;r.classList.add("js");try{var t=localStorage.getItem("theme");if(t)r.setAttribute("data-theme",t)}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${host.variable} ${atkinsonMono.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
