interface IDictionaryFile {
	[key: string]: () => any;
}

const dictionaries: Record<string, IDictionaryFile> = {
	en: {
		common: () =>
			import("../locales/en/common.json").then(
				(module) => module.default
			),
	},
	ru: {
		common: () =>
			import("../locales/ru/common.json").then(
				(module) => module.default
			),
	},
};

export const getDictionary = async (
	locale: string,
	file: string = "common"
): Promise<Record<string, unknown>> => {
	const fileLoader = dictionaries[locale]?.[file];
	if (fileLoader) {
		return await fileLoader();
	}
	return await dictionaries[locale]?.common();
};
