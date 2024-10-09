import { IContainerType } from "@/components/shared/types/types";

type IVersionContainer = Record<
	IContainerType,
	Array<Record<"version", string>>
>;

export const versionContainer: IVersionContainer = {
	container: [
		{
			version: "1.0",
		},
	],
	saint_laurent_container: [
		{
			version: "1.0",
		},
	],
	category_list_container: [
		{
			version: "1.0",
		},
	],
	swiper: [
		{
			version: "1.0",
		},
	],
	initial: [
		{
			version: "1.0",
		},
	],
};
