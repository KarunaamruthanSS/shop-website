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
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6241972269720165"
            crossorigin="anonymous">

        </script>
      </head>
      <head>
        <script src="https://quge5.com/88/tag.min.js" data-zone="200963" async data-cfasync="false"></script>
      </head>
      <head>
        <meta name="monetag" content="675a111ad604a704dab475c0a57f5fd0">
        </meta>
      </head>
      <body>
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
