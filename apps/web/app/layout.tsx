import "./globals.css";
import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Fira_Code, Geist } from "next/font/google";
import { ThemeProvider } from 'next-themes'
import { ToolContextProvider } from "../hooks/useTools";

import { DrawContextProvider } from "../contexts/drawContext";
import { AiContextProvider } from "../contexts/aiContext";
import { NotificationProvider } from "../contexts/notificationContext";

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});
const geistCode = Geist({
  variable: "--font-geist-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prompt2Draw - Generate Drawings from Text Prompts",
  description: "Generate Drawings from Text Prompts",
  icons: {
    icon: [
      {
        url: "/favicon.png",
        sizes: "96x96",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${firaCode.variable}  ${geistCode.variable} antialiased relative`} >
        <NotificationProvider>
      <ToolContextProvider>
      <DrawContextProvider>

          
            <AiContextProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
        </ThemeProvider>
        </AiContextProvider>
        
      
        </DrawContextProvider>
        </ToolContextProvider>
        </NotificationProvider>
    
      </body>
    </html>
  );
}
