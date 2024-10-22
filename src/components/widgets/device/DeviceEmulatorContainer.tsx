"use client";

import React, { useEffect, useState } from "react";
import {
	DeviceEmulator,
	DeviceFrameset,
	DeviceFramesetProps,
} from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";
import "react-device-frameset/styles/device-emulator.min.css";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import {
	BottomBarTypes,
	DeviceType,
	PlatformType,
} from "@/components/shared/types/types";
import { DeviceName } from "@/components/shared/types/interface-app";
import { cn } from "@/components/lib/utils";

interface Props {
	children: React.ReactNode;
	devices: DeviceName[];
	type?: DeviceType;
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
const DeviceEmulatorContainer: React.FC<Props> = (props): React.JSX.Element => {
	const { children, devices, type } = props;

	const { editorHeightPropertyAction } = useDispatchAction();

	const { spaceModePlatformType, spaceBottomBarType } = useAppSelector(
		(state) => state.space
	);

	const [size, setSize] = useState<any>({
		height: null,
	});
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
		// <DeviceEmulator
		// 	banDevices={devices}
		// 	langscape={false}
		// 	onChange={(event) => setSize(event)}
		// >
		// 	{(deviceFramesetProps: DeviceFramesetProps): React.ReactNode => (
		// 		<DeviceFrameset {...deviceFramesetProps}>
		// 			{children(deviceFramesetProps)}
		// 		</DeviceFrameset>
		// 	)}
		// </DeviceEmulator>

		<div className={cn("w-full flex justify-center")}>
			{type === "mobile" ? (
				<DeviceFrameset
					device="iPhone X"
					landscape={false}
					onChange={(event) => setSize(event)}
				>
					{children}
				</DeviceFrameset>
			) : type === "tablet" ? (
				<DeviceFrameset
					device="iPad Mini"
					landscape={false}
					color="black"
					onChange={(event) => setSize(event)}
				>
					{children}
				</DeviceFrameset>
			) : type === "laptop" ? (
				<DeviceFrameset
					device="MacBook Pro"
					onChange={(event) => setSize(event)}
				>
					{children}
				</DeviceFrameset>
			) : null}
		</div>
	);
};

export default DeviceEmulatorContainer;
