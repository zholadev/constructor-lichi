import { createContext } from "react";

/**
 * @author Zholaman Zhumanov
 * @created 16.08.2024
 */
export interface ISpaceContext {}

export const SpaceContext = createContext<ISpaceContext>(null!);
