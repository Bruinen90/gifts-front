export type NotificationType =
	| 'invitation'
	| 'reservation'
	| 'inviatationAccept'
	| 'newDraw'
	| 'drawResults';

export interface Notification {
	type: NotificationType;
	content: string;
	createdAt: Date;
}
