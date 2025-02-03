/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "./providers/redux.provider";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";

export const metadata: Metadata = {
	title: "Life Invest Stock Tracker",
	description: "Track and visualize your stock in realtime",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body className={`antialiased`}>
				<ReduxProvider>
					<div>
						<Header />
						{children}
					</div>
				</ReduxProvider>
				<ToastContainer position="top-center" />
			</body>
		</html>
	);
}
