"use client";

import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { ThemeType } from "@/components/shared/backend/types/api-types";

interface Props {
	children: React.ReactNode;
	enableSystem: boolean;
	disableTransitionOnChange: boolean;
	attribute: string;
	defaultTheme: ThemeType;
}

/**
 * @author Zholaman Zhumanov
 * @created 14.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param children
 * @param props
 * @constructor
 */
const ThemeProvider: React.FC<Props> = ({
	children,
	...props
}: ThemeProviderProps) => {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export default ThemeProvider;
