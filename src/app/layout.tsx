import { Providers } from "@/providers/providers";
import "./globals.css";
import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Confugio",
  description: "Mgt Services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Providers>
          <div className="flex flex-col min-h-full">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
