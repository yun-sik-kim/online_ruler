import type { Metadata } from "next";
import { Open_Sans, Montserrat_Subrayada } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import "@/app/CSS/globals.css";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const open_sans = Open_Sans({ 
  subsets: ["latin"],
  variable: '--font-open_sans',
});

const montserrat_subrayada = Montserrat_Subrayada({ 
  subsets: ["latin"],
  weight: ['400', '700'],
  variable: '--font-montserrat_subrayada',
});

export const metadata: Metadata = {
  title: "Online Ruler",
  description: "Online Ruler, simplifying measurements with precision accuracy and ease at your fingertips. Both mm, cm, m metric and inch imperial measurement supported",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${open_sans.variable} 
                        ${montserrat_subrayada.variable} 
                        main-layout`}>
        <nav className='nav_bar'>
        <Image className="app_logo"
          src="/ys.svg"
          width={100}
          height={100}
          alt="Logo"
        />
        <Link href="/" style={{ textDecoration: 'none' }}>
          <h1>Online Ruler</h1>
        </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
