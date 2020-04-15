import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// MUI
import { Typography } from "@material-ui/core";

// Components
import PageWrapper from "../../components/PageWrapper/PageWrapper";

// Types
import { StateInterface } from "../../interfaces/interfaces";
import WishBox from "../../components/WishBox/WishBox";
import { ReservationStatusSetterType } from "../../interfaces/Reservations";

export const ShoppingList: React.FC = () => {
  const dispatch = useDispatch();

  const shoppingList = useSelector(
    (state: StateInterface) => state.shoppingList
  );

  useEffect(() => {
    console.log(shoppingList);
  }, [shoppingList]);

  const handleSetReservationStatus: ReservationStatusSetterType = ({
    wishId,
    reserved,
    drawId,
  }) => {
    const payload: {
      wishId: string;
      reserved: boolean;
      drawId?: string;
    } = { wishId: wishId, reserved: reserved, drawId: drawId };
    if (drawId) {
      payload.drawId = drawId;
    }
    dispatch({
      type: "RESERVE_WISH_WATCHER",
      payload: payload,
    });
  };
  return (
    <PageWrapper>
      <Typography variant="h2" align="center">
        Lista zakupów
      </Typography>
      {shoppingList &&
        shoppingList[0] && shoppingList[0]._id &&
        shoppingList.map((item) => (
          <WishBox
            key={item._id}
            view="simple"
            wish={item}
            setReservedStatus={handleSetReservationStatus}
          />
        ))}
    </PageWrapper>
  );
};
