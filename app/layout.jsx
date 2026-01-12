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
        <script src="https://pl28460520.effectivegatecpm.com/df/62/14/df62146910f7046600e4cf20a7d92523.js">
        </script>
      </head>
      <body>
        <script async="async" data-cfasync="false" src="https://pl28460603.effectivegatecpm.com/8a1718c0c7e6f4e1591b3589e98f522b/invoke.js">
        </script>
        <div id="container-8a1718c0c7e6f4e1591b3589e98f522b">
        </div>
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
