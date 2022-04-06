export interface menuVoiceInterface {
	icon: any;
	buttonText: any;
	onClick?: any;
}

export interface subMenuVoiceInterface {
	children: any;
	actualSubMenu: string;
	menuOpenedOn: string;
	title: string;
}

export interface navLinkInterface {
	icon: any;
	hovered: boolean;
	onClick: any;
	current_url: boolean;
	label: string;
}
