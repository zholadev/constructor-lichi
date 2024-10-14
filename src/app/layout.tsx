import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./normalize.css";
import "./fonts.css";
import "./styles.sass";
import "./globals.css";
import "swiper/css";
import React from "react";
import { Toaster } from "sonner";
import ThemeProvider from "@/components/app/providers/ThemeProvider";
import StoreProvider from "@/components/app/providers/StoreProvider";
import ApiDataProvider from "@/components/app/providers/ApiDataProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Lichi | Constructor",
	description: "Конструктор создание страницы для сайта www.lichi.com",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>): React.JSX.Element {
	return (
		<StoreProvider>
			<ApiDataProvider>
				<html lang="en" className="overflow-hidden">
					<Toaster position="bottom-left" />
					<body className={inter.className}>
						<ThemeProvider
							enableSystem
							disableTransitionOnChange
							attribute="class"
							defaultTheme="light"
						>
							<main className="min-h-screen">{children}</main>
						</ThemeProvider>
					</body>
				</html>
			</ApiDataProvider>
		</StoreProvider>
	);
}
