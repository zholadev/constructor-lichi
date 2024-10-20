import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest): NextResponse | any {
	const auth = req.headers.get("authorization");

	if (auth) {
		const [, base64Credentials] = auth.split(" ");
		if (base64Credentials) {
			const credentials = Buffer.from(
				base64Credentials,
				"base64"
			).toString();
			const [user, pass] = credentials.split(":");

			if (user === "xyzDev" && pass === "xyzDev") {
				return NextResponse.next();
			}
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
