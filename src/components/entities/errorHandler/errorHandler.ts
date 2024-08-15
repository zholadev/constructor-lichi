"use client";

/**
 * @author Zholaman Zhumanov
 * @param page
 * @param event
 * @param error
 */
export const errorHandler = (
	page?: string,
	event?: string,
	error?: unknown
): void => {
	return console.error(page, event, error);
};
