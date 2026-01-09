import "./globals.css";
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <TranslationProvider>
            <ToastProvider>
              <SessionProvider>
                <CartProvider>
                  <Navbar />
                  <ThemeToggle />
                  {children}
                  <Footer />
                  <ToastContainer />
                </CartProvider>
              </SessionProvider>
            </ToastProvider>
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
