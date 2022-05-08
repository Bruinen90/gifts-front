export type NotificationType =
	| 'invitation'
	| 'reservation'
	| 'inviatationAccept'
	| 'newDraw'
	| 'drawResults';

export interface Notification {
	_id: string;
	type: NotificationType;
	content: string;
	createdAt: Date;
	read: boolean;
	connectedRecordId?: string;
}
