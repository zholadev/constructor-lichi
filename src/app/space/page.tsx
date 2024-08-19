"use client";

import React from "react";
import SpaceProvider from "@/components/app/providers/SpaceProvider";
import SpacePageContainer from "@/components/pages/space/ui/SpacePageContainer";

export default function Space(): React.JSX.Element {
	return (
		<SpaceProvider>
			<SpacePageContainer />
		</SpaceProvider>
	);
}
