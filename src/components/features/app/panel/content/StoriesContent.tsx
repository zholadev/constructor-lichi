import React, { useEffect, useState } from "react";
import { cn } from "@/components/lib/utils";
import { Switch } from "@/components/shared/shadcn/ui/switch";
import { Button } from "@/components/shared/shadcn/ui/button";

interface IStoriesContent {
	add: boolean;
}

interface Props {
	defaultParams: [];
	onSendParams: (value: boolean) => void;
	onRemoveParams: () => void;
}

/**
 * @author Zholaman Zhumanov
 * @created 01.10.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const StoriesContent: React.FC<Props> = (props) => {
	const { defaultParams, onSendParams, onRemoveParams } = props;

	const [contentValues, setContentValues] = useState<IStoriesContent>({
		add: false,
	});

	const onChangeSettings = (value: boolean, key: keyof IStoriesContent) => {
		setContentValues((prevState) => {
			const updateValues = {
				...prevState,
				[key]: value,
			};

			if (value) {
				onSendParams([]);
			} else {
				onRemoveParams();
			}

			return updateValues;
		});
	};

	useEffect(() => {
		if (defaultParams?.length > 0) {
			setContentValues({ add: true });
		}
	}, [defaultParams]);

	return (
		<div className={cn("w-full")}>
			<div
				className={cn(
					"flex justify-between items-center  cursor-pointer flex-row gap-2 mb-3"
				)}
			>
				<div
					className={cn("flex w-full items-center justify-end gap-2")}
				>
					<Switch
						id="stories-add"
						checked={contentValues.add}
						onCheckedChange={(value) => {
							onChangeSettings(value, "add");
						}}
					/>
				</div>
			</div>

			<Button disabled={!contentValues.add}>Редактировать</Button>
		</div>
	);
};

export default StoriesContent;
