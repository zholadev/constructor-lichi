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
): null => {
	console.error(page, event, error);
	return null;
};
