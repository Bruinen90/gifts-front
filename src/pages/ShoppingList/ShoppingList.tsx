import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as watcherTypes from "../../store/actions/watcherTypes";

// MUI
import { Typography } from "@material-ui/core";

// Components
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { EmptyListMessage } from "../../components/EmptyListMessage/EmptyListMessage";
import { WishesList } from "../../components/WishesList/WishesList";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";

// Images
import NoData from "../../img/undraw_no_data.svg";

// Types
import { State } from "../../types/State";
import {
    ReservationStatusSetterType,
    ReservationPayload,
    WishDoneSetterType,
} from "../../types/Reservations";

export const ShoppingList: React.FC = () => {
    const dispatch = useDispatch();

    const [shoppingList, drawsData] = useSelector((state: State) => [
        state.wish.shoppingList,
        state.draw.usersDraws,
    ]);

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
            wishTitle: shoppingList?.find((wish) => wish._id === wishId)!.title,
        };
        if (drawId) {
            payload.drawId = drawId;
        }
        dispatch({
            type: watcherTypes.WATCH_RESERVE_WISH,
            payload: payload,
        });
    };

    const handleSetWishAsDone: WishDoneSetterType = ({_id, title}) => {
        console.log(_id)
    }

    const populatedShoppingList = shoppingList?.map((item) => {
        let drawData;
        if (item.forDraw) {
            drawData = drawsData.find((draw) => draw._id === item.forDraw);
        }
        if (drawData) {
            return { ...item, drawData: drawData };
        } else return item;
    });
    return (
        <PageWrapper>
            <Typography variant="h2" align="center">
                Lista zakupów
            </Typography>
            <LoadingSpinner type="other" category="auth" />
            <LoadingSpinner type="fetching-records" category="wishes" />
            {shoppingList &&
                (shoppingList.length > 0 ? (
                    <WishesList
                        wishesList={populatedShoppingList!}
                        viewMode="guest"
                        setReservedStatus={handleSetReservationStatus}
                        setWishAsDone={handleSetWishAsDone}
                    />
                ) : (
                    <EmptyListMessage
                        imageUrl={NoData}
                        message="Tutaj pojawią się prezenty, których chęć zakupu zadeklarujesz"
                    />
                ))}
        </PageWrapper>
    );
};
