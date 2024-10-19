export interface IRequestApiParams {
	data: any;
	errorFields: [];
	success: boolean;
	messages: string;
	totalData: any;
}

export type DeviceName =
	| "iPhone X"
	| "iPhone 8"
	| "iPhone 8 Plus"
	| "iPhone 5s"
	| "iPhone 5c"
	| "iPhone 4s"
	| "Galaxy Note 8"
	| "Nexus 5"
	| "Lumia 920"
	| "Samsung Galaxy S5"
	| "HTC One"
	| "iPad Mini"
	| "MacBook Pro";

export type DeviceMobile =
	| "iPhone X"
	| "iPhone 8"
	| "iPhone 8 Plus"
	| "iPhone 5s"
	| "iPhone 5c"
	| "iPhone 4s"
	| "Galaxy Note 8"
	| "Nexus 5"
	| "Lumia 920"
	| "Samsung Galaxy S5"
	| "HTC One";

export type DeviceDesktop = "MacBook Pro";
export type DeviceTablet = "iPad Mini";
