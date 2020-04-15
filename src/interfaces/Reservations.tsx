export type ReservationPayload = {
  wishId: string;
  reserved: boolean;
  drawId?: string;
};

export type ReservationStatusSetterType = ({
  wishId,
  reserved,
  drawId,
}: ReservationPayload) => void;
