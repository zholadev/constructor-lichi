/** * Возвращает строку даты в формате 06 Oct 2024 на 6 дней вперед.
 * @returns {string}
 */
export const getFormattedDateSixDaysAhead = (
	dateInput?: string | number | Date,
	addDays: boolean = true
): string => {
	const date = dateInput ? new Date(dateInput) : new Date();

	if (addDays) {
		date.setDate(date.getDate() + 6);
	}

	const day = date.getDate().toString().padStart(2, "0");
	const month = date.toLocaleString("en-US", { month: "short" });
	const year = date.getFullYear();

	return `${day} ${month} ${year}`;
};

export const formattedName = (name: string): string => {
	return name.replace(/_/g, " ");
};
