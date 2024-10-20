import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"; // Импорт типов Next.js

export function middleware(req: NextRequest): NextResponse {
	const auth = req.headers.get("authorization");

	if (auth) {
		const [user, pass] = Buffer.from(auth.split(" ")[1], "base64")
			.toString()
			.split(":");

		if (user === "xyzDev" && pass === "xyzDev") {
			return NextResponse.next();
		}
	}

	return new NextResponse("Auth Required", {
		status: 401,
		headers: {
			"WWW-Authenticate": "Basic realm='Secure Area'",
		},
	});

	return NextResponse.next();
}

export const config = {
	matcher: "/((?!api|_next/static|favicon.ico).*)",
};
