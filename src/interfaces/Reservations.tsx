export type ReservationStatusSetterType = ({
	wishId,
	reserved,
}: {
	wishId: string;
	reserved: boolean;
}) => void;
