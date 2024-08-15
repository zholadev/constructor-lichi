import { toast } from "sonner";
import { ToastType } from "@/components/shared/types/types";

/**
 * @author Zholaman Zhumanov
 * @created 04.06.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const useToastMessage = () => {
	return (message: string, type: ToastType): unknown => {
		if (type && typeof toast === "function") {
			return toast[type](message);
		}

		return toast(message);
	};
};

export default useToastMessage;
