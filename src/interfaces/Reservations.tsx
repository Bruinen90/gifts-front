export type ReservationPayload = {
    wishId: string;
    reserved: boolean;
    drawId?: string;
    userId?: string;
};

export type ReservationStatusSetterType = ({
    wishId,
    reserved,
    drawId,
}: ReservationPayload) => void;
