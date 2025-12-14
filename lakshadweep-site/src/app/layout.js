import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import LoginModal from "@/components/features/LoginModal";
import BookingModal from "@/components/features/BookingModal";
import SearchModal from "@/components/features/SearchModal"; // <--- 1. IMPORT THIS

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Lakshadweep Tourism",
  description: "Discover the Coral Paradise",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={jakarta.className}>
        <AppProvider>
          {children}
          <LoginModal />
          <BookingModal />
          <SearchModal /> {/* <--- 2. ADD THIS TAG */}
        </AppProvider>
      </body>
    </html>
  );
}