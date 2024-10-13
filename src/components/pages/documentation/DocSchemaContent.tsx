import React from "react";
import Divider from "@/components/shared/uikit/divider/Divider";
import { cn } from "@/components/lib/utils";
import JsonViewContent from "@/components/shared/jsonView/JsonViewContent";
import { schemaDocParams } from "@/components/shared/utils/doc-schema";
import DocWrapperContent from "@/components/pages/documentation/DocWrapperContent";

/**
 * @author Zholaman Zhumanov
 * @created 13.10.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const DocSchemaContent: React.FC = () => {
	return (
		<>
			<Divider spacing="large" />

			<div className={cn("w-full grid grid-cols-2 gap-40 mb-4")}>
				<div className={cn("")}>
					<JsonViewContent
						fullHeight
						jsonData={schemaDocParams.doc_content_params}
					/>
				</div>
				<article className={cn("bg-secondary border p-3 rounded-md")}>
					<h2>
						Модуль <code>content</code>
					</h2>

					<p>
						Модуль <code>content</code> используется для управления
						мультимедийным контентом на веб-странице, включая
						изображения, видео, анимации, ссылки и текст. Этот
						модуль позволяет гибко настраивать и отображать контент,
						адаптируясь к различным устройствам и добавляя
						интерактивные элементы.
					</p>

					<h3>Основные ключи:</h3>

					<ul>
						<li>
							<strong>
								<code>photo</code>
							</strong>
							: <code>object</code>
							<br />
							Описывает изображения для различных устройств
							(десктоп, планшет, мобильный). Каждое изображение
							представлено отдельным объектом для конкретного
							разрешения экрана.
							<ul>
								<li>
									<code>desktop</code>: Изображение для
									десктопов.
								</li>
								<li>
									<code>tablet</code>: Изображение для
									планшетов.
								</li>
								<li>
									<code>mobile</code>: Изображение для
									мобильных устройств.
								</li>
							</ul>
						</li>

						<li>
							<strong>
								<code>video</code>
							</strong>
							: <code>object</code>
							<br />
							Описывает видео-контент. Содержит ссылку на
							видеофайл и изображение постера, отображаемого перед
							началом воспроизведения.
							<ul>
								<li>
									<code>videoSrc</code>: Путь к видеофайлу.
								</li>
								<li>
									<code>poster</code>: Изображение постера для
									видео.
								</li>
							</ul>
						</li>

						<li>
							<strong>
								<code>animation</code>
							</strong>
							: <code>object</code>
							<br />
							Определяет параметры анимации для контента. Включает
							тип анимации и настройку отслеживания видимости
							элемента.
							<ul>
								<li>
									<code>type</code>: Тип анимации (например,{" "}
									<code>zoom_in</code>, <code>zoom_out</code>,
									или <code>none</code>).
								</li>
								<li>
									<code>observer</code>: Булевое значение,
									которое определяет, нужно ли отслеживать
									видимость элемента для запуска анимации.
								</li>
							</ul>
						</li>

						<li>
							<strong>
								<code>link</code>
							</strong>
							: <code>object</code>
							<br />
							Описывает структуру ссылок, включая внешний и
							внутренний URL, а также настройки для управления
							поведением ссылки.
							<ul>
								<li>
									<code>href</code>:
									<ul>
										<li>
											<code>src</code>: Внешняя ссылка
											(URL).
										</li>
										<li>
											<code>internal_src</code>:
											Внутренняя ссылка (относительный
											путь).
										</li>
									</ul>
								</li>
							</ul>
						</li>

						<li>
							<strong>
								<code>text</code>
							</strong>
							: <code>object</code>
							<br />
							Описывает текстовый контент, такой как заголовки.
							Структура поддерживает локализацию через
							использование ключей для разных языков.
							<ul>
								<li>
									<code>title</code>: Заголовок,
									представленный как объект с ключами для
									разных языков (например,{" "}
									<code>en: value: Welcome</code>).
								</li>
							</ul>
						</li>
					</ul>
				</article>
			</div>

			<Divider spacing="large" />

			<div className={cn("w-full grid grid-cols-2 gap-40 mb-4")}>
				<div className={cn("")}>
					<JsonViewContent
						fullHeight
						jsonData={schemaDocParams.doc_content_photo_params}
					/>
				</div>
				<article className={cn("bg-secondary border p-3 rounded-md")}>
					<h3>
						Параметр <code>photo</code>
					</h3>

					<p>
						Параметр <code>photo</code> используется для управления
						изображениями, которые адаптируются к различным
						устройствам (десктоп, планшет, мобильный). Каждое
						изображение имеет различные свойства, такие как URL,
						публичный URL, путь и информация об изображении, включая
						его размеры и яркость.
					</p>

					<h4>Поля:</h4>
					<ul>
						<li>
							<strong>
								<code>desktop</code>
							</strong>
							: <code>object</code>
							<br />
							Изображение для десктопов.
							<ul>
								<li>
									<code>url</code>: Прямой URL изображения.
								</li>
								<li>
									<code>public_url</code>: Публичный URL
									изображения.
								</li>
								<li>
									<code>path</code>: Относительный путь к
									изображению на сервере.
								</li>
								<li>
									<code>info</code>: Информация об
									изображении, включающая:
									<ul>
										<li>
											<code>width</code>: Ширина
											изображения (в пикселях).
										</li>
										<li>
											<code>height</code>: Высота
											изображения (в пикселях).
										</li>
										<li>
											<code>luminance</code>: Яркость
											изображения (в процентах).
										</li>
									</ul>
								</li>
							</ul>
						</li>

						<li>
							<strong>
								<code>tablet</code>
							</strong>
							: <code>object</code>
							<br />
							Изображение для планшетов. Структура аналогична
							изображению для десктопов.
							<ul>
								<li>
									<code>url</code>: Прямой URL изображения.
								</li>
								<li>
									<code>public_url</code>: Публичный URL
									изображения.
								</li>
								<li>
									<code>path</code>: Относительный путь к
									изображению на сервере.
								</li>
								<li>
									<code>info</code>: Информация об изображении
									(ширина, высота, яркость).
								</li>
							</ul>
						</li>

						<li>
							<strong>
								<code>mobile</code>
							</strong>
							: <code>object</code>
							<br />
							Изображение для мобильных устройств. Структура
							аналогична изображениям для десктопов и планшетов.
							<ul>
								<li>
									<code>url</code>: Прямой URL изображения.
								</li>
								<li>
									<code>public_url</code>: Публичный URL
									изображения.
								</li>
								<li>
									<code>path</code>: Относительный путь к
									изображению на сервере.
								</li>
								<li>
									<code>info</code>: Информация об изображении
									(ширина, высота, яркость).
								</li>
							</ul>
						</li>
					</ul>
				</article>
			</div>

			<Divider spacing="large" />

			<div className={cn("w-full grid grid-cols-2 gap-40 mb-4")}>
				<div className={cn("")}>
					<JsonViewContent
						fullHeight
						jsonData={schemaDocParams.doc_content_video_params}
					/>
				</div>
				<article className={cn("bg-secondary border p-3 rounded-md")}>
					<h3>
						Параметр <code>video</code>
					</h3>

					<p>
						Параметр <code>video</code> используется для управления
						видео контентом на веб-странице. Он включает ссылку на
						видео и изображение постера, которое отображается до
						начала воспроизведения видео.
					</p>

					<h4>Поля:</h4>
					<ul>
						<li>
							<strong>
								<code>poster</code>
							</strong>
							: <code>object</code>
							<br />
							Описывает изображение постера для видео. Это
							изображение отображается перед воспроизведением
							видео.
							<ul>
								<li>
									<code>url</code>: Прямой URL изображения
									постера.
								</li>
								<li>
									<code>public_url</code>: Публичный URL
									изображения постера.
								</li>
								<li>
									<code>path</code>: Относительный путь к
									изображению на сервере.
								</li>
								<li>
									<code>info</code>: Информация об изображении
									постера, включающая:
									<ul>
										<li>
											<code>width</code>: Ширина
											изображения (в пикселях).
										</li>
										<li>
											<code>height</code>: Высота
											изображения (в пикселях).
										</li>
										<li>
											<code>luminance</code>: Яркость
											изображения (в процентах).
										</li>
									</ul>
								</li>
							</ul>
						</li>

						<li>
							<strong>
								<code>videoSrc</code>
							</strong>
							: <code>string</code>
							<br />
							Ссылка на видеофайл. В данном примере используется
							видео с платформы Vimeo. Пример значения:{" "}
							<code>"https://vimeo/video/1212121212"</code>.
						</li>
					</ul>
				</article>
			</div>

			<Divider spacing="large" />

			<div className={cn("w-full grid grid-cols-2 gap-40 mb-4")}>
				<div className={cn("")}>
					<JsonViewContent
						fullHeight
						jsonData={schemaDocParams.doc_content_text_params}
					/>
				</div>
				<article className={cn("bg-secondary border p-3 rounded-md")}>
					<h3>
						Параметр <code>title</code>
					</h3>

					<p>
						Параметр <code>title</code> используется для управления
						текстовыми заголовками с поддержкой нескольких языков.
						Он предоставляет значения заголовков на различных
						языках, таких как английский, арабский, немецкий,
						польский, французский и русский.
					</p>

					<h4>Поля:</h4>
					<ul>
						<li>
							<strong>
								<code>en</code>
							</strong>
							: <code>object</code>
							<br />
							Заголовок на английском языке.
							<ul>
								<li>
									<code>value</code>: Текст заголовка на
									английском языке. Пример:{" "}
									<code>Английский</code>.
								</li>
							</ul>
						</li>

						<li>
							<strong>
								<code>ar</code>
							</strong>
							: <code>object</code>
							<br />
							Заголовок на арабском языке.
							<ul>
								<li>
									<code>value</code>: Текст заголовка на
									арабском языке. Пример:{" "}
									<code>Арабский</code>.
								</li>
							</ul>
						</li>

						<li>
							<strong>
								<code>de</code>
							</strong>
							: <code>object</code>
							<br />
							Заголовок на немецком языке.
							<ul>
								<li>
									<code>value</code>: Текст заголовка на
									немецком языке. Пример:{" "}
									<code>Немецкий</code>.
								</li>
							</ul>
						</li>

						<li>
							<strong>
								<code>pl</code>
							</strong>
							: <code>object</code>
							<br />
							Заголовок на польском языке.
							<ul>
								<li>
									<code>value</code>: Текст заголовка на
									польском языке. Пример:{" "}
									<code>Польский</code>.
								</li>
							</ul>
						</li>

						<li>
							<strong>
								<code>fr</code>
							</strong>
							: <code>object</code>
							<br />
							Заголовок на французском языке.
							<ul>
								<li>
									<code>value</code>: Текст заголовка на
									французском языке. Пример:{" "}
									<code>Французский</code>.
								</li>
							</ul>
						</li>

						<li>
							<strong>
								<code>ru</code>
							</strong>
							: <code>object</code>
							<br />
							Заголовок на русском языке.
							<ul>
								<li>
									<code>value</code>: Текст заголовка на
									русском языке. Пример: <code>Русский</code>.
								</li>
							</ul>
						</li>
					</ul>
				</article>
			</div>

			<Divider spacing="large" />

			<div className={cn("w-full grid grid-cols-2 gap-40 mb-4")}>
				<div className={cn("")}>
					<JsonViewContent
						fullHeight
						jsonData={schemaDocParams.doc_content_link_params}
					/>
				</div>
				<article className={cn("bg-secondary border p-3 rounded-md")}>
					<h3>
						Параметр <code>link</code>
					</h3>

					<p>
						Параметр <code>link</code> используется для управления
						ссылками на внешние и внутренние страницы. Он включает
						внешний URL и внутренний путь для навигации внутри
						веб-приложения.
					</p>

					<h4>Поля:</h4>
					<ul>
						<li>
							<strong>
								<code>href</code>
							</strong>
							: <code>object</code>
							<br />
							Описывает ссылки, которые содержат внешний и
							внутренний URL.
							<ul>
								<li>
									<code>src</code>: Внешний URL, ведущий на
									страницу. Пример:{" "}
									<code>"https://lichi.com/ru/ru/new"</code>.
								</li>
								<li>
									<code>internal_src</code>: Внутренний
									относительный путь для навигации внутри
									приложения. Пример: <code>"new"</code>.
								</li>
							</ul>
						</li>
					</ul>
				</article>
			</div>

			<DocWrapperContent
				schema_json={schemaDocParams.doc_content_animation_params}
			>
				<h3>
					Параметр <code>animation</code>
				</h3>

				<p>
					Параметр <code>animation</code> используется для управления
					анимационными эффектами на странице. Он включает тип
					анимации и возможность отслеживания видимости элемента с
					помощью наблюдателя (observer).
				</p>

				<h4>Поля:</h4>
				<ul>
					<li>
						<strong>
							<code>type</code>
						</strong>
						: <code>string</code>
						<br />
						Тип анимации, который будет применен к элементу. В
						данном примере используется анимация{" "}
						<code>zoom_out</code>, которая уменьшает элемент при
						анимации.
					</li>

					<li>
						<strong>
							<code>observer</code>
						</strong>
						: <code>boolean</code>
						<br />
						Флаг, указывающий, должен ли анимационный эффект
						активироваться при появлении элемента в зоне видимости.
						Значение <code>true</code> означает, что анимация
						запускается при скролле, когда элемент попадает в
						область видимости.
					</li>
				</ul>
			</DocWrapperContent>
		</>
	);
};

export default DocSchemaContent;
