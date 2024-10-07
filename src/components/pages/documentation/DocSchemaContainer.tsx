import React from "react";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import { cn } from "@/components/lib/utils";
import JsonViewContent from "@/components/shared/jsonView/JsonViewContent";

const containerSchema: ISchemaContainer = {
	id: "a404d0df-8b86-4544-ae74-4fd8260758e7",
	guid: "a404d0df-8b86-4544-ae74-4fd82607582e3",
	type: "container",
	version: "1.0.0",
	style: {
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
		gap: "54px",
	},
	settings: {
		view: {
			heightFull: true,
			darkTheme: true,
		},
	},
	components: [],
};

const saintLaurentSchema: ISchemaContainer = {
	id: "b66b1be3-ec94-475c-afca-63e701c5c8e1",
	guid: "f88b31d8-812d-42fe-94b5-72250f055dc8",
	type: "saint_laurent_container",
	version: "1.0.0",
	style: {
		margin: "0 0 2px 0",
		backgroundColor: "#ffffff",
		backgroundColorDark: "#181a1b",
		display: "grid",
		gap: "60px",
		justifyContent: "center",
		alignItems: "center",
		gridTemplateColumns: "1fr 1fr",
	},
	components: [
		{
			id: "7a18119e-ffe0-40b5-8466-c0e949dc1ea6",
			data: {
				id: "6a291a00-812c-4c51-b7d7-f3743a15c501",
				guid: "d91195a0-59a7-41fb-92f5-a500012e8d6c",
				type: "saint_laurent",
				version: "dev-1.0.0",
				style: {
					backgroundColor: "#ffffff",
					backgroundColorDark: "#181a1b",
				},
				elements: [],
				content: {
					photo: {
						desktop: {
							url: "/_next/static/media/card-6.c5257a3d.jpg",
						},
						tablet: {
							url: "/_next/static/media/card-6.c5257a3d.jpg",
						},
						mobile: {
							url: "/_next/static/media/card-6.c5257a3d.jpg",
						},
					},
				},
				settings: {
					view: {
						contentType: "image",
						darkTheme: true,
					},
					element: {
						positionX: "center",
						positionY: "bottom",
						style: {
							justifyContent: "flex-end",
							alignItems: "center",
						},
					},
				},
			},
		},
		{
			id: "cc01e852-2f6b-4310-a3bb-e3e1e550e113",
			data: {
				id: "69f1a7cf-0ab4-4790-861d-93a2023658a4",
				guid: "e0abe318-29f3-4bd5-8e13-39eca877d1f4",
				type: "saint_laurent",
				version: "dev-1.0.0",
				style: {
					backgroundColor: "#ffffff",
					backgroundColorDark: "#181a1b",
				},
				elements: [],
				content: {
					photo: {
						desktop: {
							url: "/_next/static/media/card-2.423fb09d.jpg",
						},
						tablet: {
							url: "/_next/static/media/card-2.423fb09d.jpg",
						},
						mobile: {
							url: "/_next/static/media/card-2.423fb09d.jpg",
						},
					},
				},
				settings: {
					view: {
						contentType: "image",
						darkTheme: true,
					},
					element: {
						positionX: "center",
						positionY: "bottom",
						style: {
							justifyContent: "flex-end",
							alignItems: "center",
						},
					},
				},
			},
		},
	],
	settings: {
		view: {
			darkTheme: true,
			heightFull: true,
		},
	},
};

/**
 * @author Zholaman Zhumanov
 * @created 07.10.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const DocSchemaContainer: React.FC = () => {
	return (
		<div className={cn("w-full grid grid-cols-2 gap-40 mb-4")}>
			<article>
				<h3 className={cn("mb-2 block")}>Контейнер</h3>

				<p className={cn("border p-3 mb-6 bg-secondary rounded-md")}>
					Контейнер — это основной элемент, который содержит различные
					UI-компоненты и определяет их общую структуру.
				</p>

				<div className={cn("mt-3")}>
					<h3 className={cn("mb-2 block")}>Типы контейнеров</h3>

					<ul className={cn("mt-3 block")}>
						<li className={cn("mb-4")}>
							<span
								className={cn("bg-secondary p-1 font-medium")}
							>
								container
							</span>{" "}
							— базовый контейнер, который используется для
							размещения различных компонентов и настройки их
							стилей. Может включать сетки, фоновые цвета, отступы
							и другие стили.
						</li>
						<li className={cn("mb-4")}>
							<span
								className={cn("bg-secondary p-1 font-medium")}
							>
								swiper
							</span>{" "}
							— контейнер для реализации слайдеров. Используется
							для создания горизонтальных или вертикальных
							каруселей (слайдеров), где компоненты могут
							перелистываться пользователем.
						</li>
						<li className={cn("mb-4")}>
							<span
								className={cn("bg-secondary p-1 font-medium")}
							>
								saint_laurent_container
							</span>{" "}
							— уникальный контейнер, который, вероятно,
							предназначен для кастомных решений под бренд или
							коллекцию "Saint Laurent". Может иметь уникальные
							стили и компоненты, характерные для данного
							использования.
						</li>
					</ul>
				</div>
			</article>
			<div className={cn("")}>
				<JsonViewContent jsonData={containerSchema} />

				<div className={cn("mt-3")}>
					<JsonViewContent jsonData={saintLaurentSchema} />
				</div>
			</div>
		</div>
	);
};

export default DocSchemaContainer;
