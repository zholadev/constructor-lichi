import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"; // Импорт типов Next.js

export function middleware(req: NextRequest): NextResponse {
	// Проверяем окружение на production
	if (process.env.NODE_ENV === "production") {
		// Извлекаем заголовок авторизации
		const auth = req.headers.get("authorization");

		// Если заголовок авторизации присутствует
		if (auth) {
			// Декодируем и разбиваем строку на логин и пароль
			const [user, pass] = Buffer.from(auth.split(" ")[1], "base64")
				.toString()
				.split(":");

			// Проверяем соответствие логина и пароля значениям переменных окружения
			if (
				user === process.env.AUTH_USER &&
				pass === process.env.AUTH_PASS
			) {
				return NextResponse.next(); // Если логин и пароль совпадают, продолжаем выполнение
			}
		}

		// Если авторизация не прошла, возвращаем ответ с кодом 401 и заголовком WWW-Authenticate
		return new NextResponse("Auth Required", {
			status: 401,
			headers: {
				"WWW-Authenticate": "Basic realm='Secure Area'",
			},
		});
	}

	// Если окружение не production или авторизация успешна
	return NextResponse.next();
}

// Конфигурация middleware для исключения маршрутов
export const config = {
	matcher: "/((?!api|_next/static|favicon.ico).*)", // Исключаем /api, /_next/static и favicon.ico
};
