import { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import Link from "next/link";
import "../globals.css";
import Navbar from "./components/navbar";
import { getSiteSettings } from "@/sanity/lib/site-settings";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#8B19E6",
};

export const metadata: Metadata = {
  title: "EL Bethel Global Harvest Church",
  description: "A community of faith, hope, and love, dedicated to transforming lives.",
};

// CMS content should reflect Sanity Studio changes on the live site without waiting for a rebuild.
export const dynamic = "force-dynamic";
export const revalidate = 0;

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} antialiased min-h-screen flex flex-col bg-[#F8F9FE]`}
        suppressHydrationWarning
      >
        <Navbar settings={settings} />

        <main className="flex-grow">{children}</main>

        <footer className="bg-[#0F172A] text-white pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-800 pb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#8B19E6] text-white font-bold rounded-lg w-10 h-10 flex items-center justify-center">
                  EB
                </div>
                <span className="font-bold text-lg">{settings.churchShortName}</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {settings.footerDescription}
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/sermons" className="hover:text-white transition-colors">
                    Sermons
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="hover:text-white transition-colors">
                    Events
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Service Times</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                {settings.serviceTimes.slice(0, 2).map((service, index) => (
                  <li key={index}>
                    <span className="block text-white font-medium">{service.label}</span> {service.time}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Contact Us</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li>{settings.address}</li>
                <li>{settings.phone}</li>
                <li>{settings.email}</li>
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 pt-8 text-center text-gray-500 text-xs">
            &copy; 2026 {settings.churchName}. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
