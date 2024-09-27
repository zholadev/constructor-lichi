import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
	// Проверяем, что текущая среда — это production
	if (process.env.NODE_ENV === "production") {
		const auth = req.headers.get("authorization");

		if (auth) {
			// Декодируем строку авторизации
			const [user, pass] = Buffer.from(auth.split(" ")[1], "base64")
				.toString()
				.split(":");

			// Проверяем, совпадают ли введенные данные с данными из переменных окружения
			if (
				user === process.env.AUTH_USER &&
				pass === process.env.AUTH_PASS
			) {
				return NextResponse.next(); // Продолжаем выполнение
			}
		}

		// Если авторизация не пройдена, отправляем запрос на аутентификацию
		return new NextResponse("Auth Required", {
			status: 401,
			headers: {
				"WWW-Authenticate": 'Basic realm="Secure Area"',
			},
		});
	}

	// Если не production среда, просто продолжаем выполнение
	return NextResponse.next();
}

// Указываем, к каким путям будет применяться middleware
export const config = {
	matcher: "/((?!api|_next/static|favicon.ico).*)", // Исключаем API и статические файлы
};
