"use client";

import React, { Suspense } from "react";
import {
	DeviceEmulator,
	DeviceFrameset,
	DeviceFramesetProps,
} from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";
import "react-device-frameset/styles/device-emulator.min.css";

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

	const [size, setSize] = React.useState(null);
	console.log("size", size);
	return (
		<Suspense fallback={<div>Идет загрузка доски!</div>}>
			<DeviceEmulator banDevices={devices} defaultValue={devices[0]} onChange={event => setSize(event)}>
				{(props: DeviceFramesetProps) => (
					<DeviceFrameset {...props}>{children}</DeviceFrameset>
				)}
			</DeviceEmulator>
		</Suspense>
	);
};

export default DeviceEmulatorContainer;
