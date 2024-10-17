"use client";

import React, { Suspense, useEffect, useState } from "react";
import {
	DeviceEmulator,
	DeviceFrameset,
	DeviceFramesetProps,
} from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";
import "react-device-frameset/styles/device-emulator.min.css";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { BottomBarTypes, PlatformType } from "@/components/shared/types/types";

interface Props {
	children: React.ReactNode;
	devices?: string[];
}

/**
 * @author Zholaman Zhumanov
 * @created 20.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const DeviceEmulatorContainer: React.FC<Props> = (props) => {
	const { children, devices } = props;

	const { editorHeightPropertyAction } = useDispatchAction();

	const { spaceModePlatformType, spaceBottomBarType } = useAppSelector(
		(state) => state.space
	);

	const [size, setSize] = useState<{ width: number; height: number } | null>(
		null
	);

	/**
	 * @author Zholaman Zhumanov
	 * @description Получаем размер эмулятора
	 */
	useEffect(() => {
		if (size?.height) {
			const platform = spaceModePlatformType as PlatformType;
			const bottomBarType = spaceBottomBarType as BottomBarTypes;

			const adjustedHeight =
				platform === "app" && bottomBarType === "default"
					? size.height - 63
					: size.height;

			editorHeightPropertyAction(`${adjustedHeight}px`);
		}
	}, [
		size,
		spaceModePlatformType,
		spaceBottomBarType,
		editorHeightPropertyAction,
	]);

	return (
		<Suspense fallback={<div>Идет загрузка доски!</div>}>
			<DeviceEmulator
				// @ts-ignore
				banDevices={devices}
				langscape={false}
				onChange={(event) => setSize(event)}
			>
				{(props: DeviceFramesetProps) => {
					return (
						<DeviceFrameset landscape="false" {...props}>
							{children}
						</DeviceFrameset>
					);
				}}
			</DeviceEmulator>
		</Suspense>
	);
};

export default DeviceEmulatorContainer;
