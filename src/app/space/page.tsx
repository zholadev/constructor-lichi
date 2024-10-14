"use client";

import React, { Suspense } from "react";
import SpaceProvider from "@/components/app/providers/SpaceProvider";
import SpacePageContainer from "@/components/pages/space/SpacePageContainer";

export default function Space(): React.JSX.Element {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<SpaceProvider>
				<SpacePageContainer />
			</SpaceProvider>
		</Suspense>
	);
}
