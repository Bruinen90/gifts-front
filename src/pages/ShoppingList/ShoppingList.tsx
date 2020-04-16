import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// MUI
import { Typography } from "@material-ui/core";

// Components
import PageWrapper from "../../components/PageWrapper/PageWrapper";

// Types
import { StateInterface } from "../../interfaces/interfaces";
import WishBox from "../../components/WishBox/WishBox";
import {
    ReservationStatusSetterType,
    ReservationPayload,
} from "../../interfaces/Reservations";

export const ShoppingList: React.FC = () => {
    const dispatch = useDispatch();

    const [shoppingList, drawsData] = useSelector((state: StateInterface) => [
        state.shoppingList,
        state.usersDraws,
    ]);

    // useEffect(() => {
    // 	// console.log(shoppingList);
    // }, [shoppingList]);

    const handleSetReservationStatus: ReservationStatusSetterType = ({
        wishId,
        reserved,
        drawId,
        creatorId,
    }) => {
        const payload: ReservationPayload = {
            wishId: wishId,
            reserved: reserved,
            drawId: drawId,
            creatorId: creatorId,
        };
        console.log("payload: ", payload);
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
                shoppingList.length > 0 &&
                shoppingList.map((item) => {
                    let drawData;
                    if (item.forDraw) {
                        drawData = drawsData.find(
                            (draw) => draw._id === item.forDraw
                        );
                    }
                    return (
                        <WishBox
                            key={item._id}
                            view="simple"
                            wish={item}
                            setReservedStatus={handleSetReservationStatus}
                            drawData={drawData}
                        />
                    );
                })}
        </PageWrapper>
    );
};
