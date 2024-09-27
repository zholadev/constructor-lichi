import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
	// Проверка на то, что это production-среда
	if (process.env.NODE_ENV === "production") {
		const auth = req.headers.get("authorization");

		// Если авторизация есть
		if (auth) {
			const [user, pass] = Buffer.from(auth.split(" ")[1], "base64")
				.toString()
				.split(":");

			// Проверяем введенные данные с переменными окружения
			if (
				user === process.env.AUTH_USER &&
				pass === process.env.AUTH_PASS
			) {
				return NextResponse.next();
			}
		}

		// Если авторизация не пройдена, возвращаем запрос на ввод данных
		return new NextResponse("Auth Required", {
			status: 401,
			headers: {
				"WWW-Authenticate": 'Basic realm="Secure Area"',
			},
		});
	}

	// В средах, отличных от production, пропускаем
	return NextResponse.next();
}

// Указываем, к каким путям будет применяться middleware
export const config = {
	matcher: "/((?!api|_next/static|favicon.ico).*)", // Исключаем API и статические файлы
};
