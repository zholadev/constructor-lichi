"use client";

import React, { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, siteStore } from "@/components/app/store/store";

interface StoreProviderProps {
	children: ReactNode;
}

/**
 * @author Zholaman Zhumanov
 * @created 15.08.2024
 * @param children
 * @constructor
 */
export default function StoreProvider({
	children,
}: StoreProviderProps): ReactNode {
	const storeRef = useRef<AppStore>();
	if (!storeRef.current) {
		storeRef.current = siteStore();
	}
	return <Provider store={storeRef.current}>{children}</Provider>;
}
