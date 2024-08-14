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

export const getDictionary = (
	locale: string,
	file: string = "common"
): Promise<any> => {
	const fileLoader = dictionaries[locale]?.[file];
	if (fileLoader) {
		return fileLoader();
	}
	return dictionaries[locale]?.common();
};
