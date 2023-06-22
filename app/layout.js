import "./globals.css";

import FinanceContextProvider from "@/lib/store/FinanceContext";
import Nav from "@/components/Navigation";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthContextProvider from "@/lib/store/auth-context";

export const metadata = {
  title: "JQ Finances Tracker | Online Expenses Manager",
  description:
    "A simple application to help management your expenses to help minimize impulse buying and other financial bad habit",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <FinanceContextProvider>
            <ToastContainer />
            <Nav />
            {children}
          </FinanceContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
