export type ReservationPayload = {
	wishId: string;
	reserved: boolean;
	creatorId: string;
	drawId?: string;
	userId?: string;
	wishTitle: string;
};

export type ReservationStatusSetterType = ({
	wishId,
	creatorId,
	reserved,
	drawId,
}: ReservationPayload) => void;

export type WishDoneSetterType = ({
	_id,
	title,
}: {
	_id: string;
	title: string;
}) => void;
