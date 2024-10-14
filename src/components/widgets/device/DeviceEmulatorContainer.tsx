"use client";

import React, { Suspense, useEffect } from "react";
import {
	DeviceEmulator,
	DeviceFrameset,
	DeviceFramesetProps,
} from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";
import "react-device-frameset/styles/device-emulator.min.css";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";

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

	const [size, setSize] = React.useState(null);

	/**
	 * @author Zholaman Zhumanov
	 * @description Получаем размер эмулятора
	 */
	useEffect(() => {
		if (size?.height) {
			editorHeightPropertyAction(`${size?.height}px`);
		}
	}, [size]);

	return (
		<Suspense fallback={<div>Идет загрузка доски!</div>}>
			<DeviceEmulator
				banDevices={devices}
				defaultValue={devices[0]}
				langscape={false}
				onChange={(event) => setSize(event)}
			>
				{(props: DeviceFramesetProps) => {
					console.log("props", props)
					return (
						<DeviceFrameset landscape={"false"} {...props}>{children}</DeviceFrameset>
					)
				}}
			</DeviceEmulator>
		</Suspense>
	);
};

export default DeviceEmulatorContainer;
