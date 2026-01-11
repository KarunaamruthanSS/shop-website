import "./globals.css";
import Script from "next/script";
import Navbar from "../components/navbar";
import ThemeToggle from "../components/theme-toggle";
import Footer from "../components/footer";
import { CartProvider } from "../lib/cartContext";
import { TranslationProvider } from "../lib/translationContext";
import { ToastProvider } from "../lib/toastContext";
import { SessionProvider } from "../lib/sessionContext";
import { ThemeProvider } from "../lib/themeContext";
import ToastContainer from "../components/toast-container";

export const metadata = {
  title: "Sathya Hardwares",
  description: "Hardware shop website",
  other: {
    "monetag": "675a111ad604a704dab475c0a57f5fd0"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="monetag" content="675a111ad604a704dab475c0a57f5fd0" />
      </head>
      <body>
        <Script 
          src="https://quge5.com/88/tag.min.js"
          data-zone="200963"
          strategy="afterInteractive"
          data-cfasync="false"
        />
        <ThemeProvider>
          <ToastProvider>
            <TranslationProvider>
              <SessionProvider>
                <CartProvider>
                  <Navbar />
                  <ThemeToggle />
                  {children}
                  <Footer />
                  <ToastContainer />
                </CartProvider>
              </SessionProvider>
            </TranslationProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
