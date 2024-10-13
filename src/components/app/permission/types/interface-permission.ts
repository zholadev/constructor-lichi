export interface IPermission {
	panel: {
		styles: boolean;
		content: boolean;
		setting: boolean;
		component: boolean;
		element: boolean;
		navigator: boolean;
	};
	editor: {
		remove: boolean;
		dnd: boolean;
		add: boolean;
	};
	styles: {
		fill: {
			root: boolean;
			backgroundColor: boolean;
		};
		border: {
			root: boolean;
			border: boolean;
			radius: boolean;
		};
		size: {
			root: boolean;
			width: boolean;
			height: boolean;
		};
		spacing: {
			root: boolean;
			padding: boolean;
			margin: boolean;
		};
		position: {
			root: boolean;
			justifyContent: boolean;
			alignItems: boolean;
		};
		typography: {
			root: boolean;
			fontSize: boolean;
			fontFamily: boolean;
			color: boolean;
			fontStyle: boolean;
			textAlign: boolean;
			fontWeight: boolean;
		};
		grid: {
			root: boolean;
			gap: boolean;
		};
	};
	content: {
		image: boolean;
		video: boolean;
		link: boolean;
		textFill: boolean;
		stories: boolean;
		animation: boolean;
	};
	setting: {
		show: {
			root: boolean;
			siteType: boolean;
		};
		view: {
			root: boolean;
			contentType: boolean;
			navbarMode: boolean;
			heightFull: boolean;
			darkTheme: boolean;
		};
		action: {
			root: boolean;
			add: boolean;
			remove: boolean;
		};
		timer: boolean;
		swiper: {
			root: boolean;
		};
		categoryList?: boolean;
		element: boolean;
	};
	widget: {
		root: boolean;
		stories: {
			root: boolean;
		};
	};
}
