import React, { useMemo } from "react";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import useDialogAction from "@/components/shared/hooks/useDialogAction";
import DialogContainer from "@/components/widgets/dialog/DialogContainer";
import { cn } from "@/components/lib/utils";
import { JsonView, allExpanded, darkStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import { ISchemaTotalData } from "@/components/shared/types/interface";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/shared/shadcn/ui/accordion";
import { DesktopIcon, MobileIcon } from "@radix-ui/react-icons";
import { Tablet } from "lucide-react";

/**
 * @author Zholaman Zhumanov
 * @created 07.10.2024
 * @description Компонент для просмотра JSON данных шаблонов
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const SchemaView: React.FC = () => {
	const dialog = useDialogAction();

	const { spaceTemplateSchemaDevicesData } = useAppSelector(
		(state) => state.space
	);

	const jsonObjects: ISchemaTotalData = useMemo(() => {
		return {
			desktop: spaceTemplateSchemaDevicesData?.desktop ?? [],
			tablet: spaceTemplateSchemaDevicesData?.tablet ?? [],
			mobile: spaceTemplateSchemaDevicesData?.mobile ?? [],
		};
	}, [spaceTemplateSchemaDevicesData]);
	console.log(darkStyles);
	return (
		<DialogContainer
			open={dialog.dialogSchemaView.open}
			toggle={dialog.dialogSchemaView.toggle}
			clsContent="w-max min-w-[50vw]"
		>
			<div className={cn("w-full")}>
				<Accordion className="w-full" type="single">
					<AccordionItem value="desktop">
						<AccordionTrigger>
							<div className={cn("flex items-center gap-1")}>
								<DesktopIcon width={13} height={13} />
								<span style={{ fontSize: "13px" }}>
									Desktop
								</span>
							</div>
						</AccordionTrigger>
						<AccordionContent>
							<div className={cn("overflow-auto")}>
								<JsonView
									data={jsonObjects.desktop}
									shouldExpandNode={allExpanded}
									style={{
										...darkStyles,
										container: "schema-json-view-container",
									}}
								/>
							</div>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="tablet">
						<AccordionTrigger>
							<div className={cn("flex items-center gap-1")}>
								<Tablet width={13} height={13} />
								<span style={{ fontSize: "13px" }}>Tablet</span>
							</div>
						</AccordionTrigger>
						<AccordionContent>
							<JsonView
								data={jsonObjects.tablet}
								shouldExpandNode={allExpanded}
								style={{
									...darkStyles,
									container: "schema-json-view-container",
								}}
							/>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="mobile">
						<AccordionTrigger>
							<div className={cn("flex items-center gap-1")}>
								<MobileIcon width={13} height={13} />
								<span style={{ fontSize: "13px" }}>Mobile</span>
							</div>
						</AccordionTrigger>
						<AccordionContent>
							<JsonView
								data={jsonObjects.tablet}
								shouldExpandNode={allExpanded}
								style={{
									...darkStyles,
									container: "schema-json-view-container",
								}}
							/>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</DialogContainer>
	);
};

export default SchemaView;
