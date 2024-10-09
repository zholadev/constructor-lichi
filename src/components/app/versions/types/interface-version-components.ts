import {
	ComponentBaseTypes,
	ComponentSpecialTypes,
} from "@/components/shared/types/types-components";

type IVersionComponents = Record<
	ComponentBaseTypes | ComponentSpecialTypes,
	Array<Record<"version", string>>
>;

export const versionComponents: IVersionComponents = {
	card: [
		{
			version: "1.0",
		},
	],
	card_outside: [
		{
			version: "1.0",
		},
	],
	album: [
		{
			version: "1.0",
		},
	],
	album_outside: [
		{
			version: "1.0",
		},
	],
	saint_laurent: [
		{
			version: "1.0",
		},
	],
};
