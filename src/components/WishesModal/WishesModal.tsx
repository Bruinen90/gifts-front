import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as watcherTypes from "../../store/actions/watcherTypes";

// MUI
import { Dialog, DialogTitle, Box, CircularProgress } from "@material-ui/core";

// Components
import { EmptyListMessage } from "../EmptyListMessage/EmptyListMessage";
import { WishesList } from "../WishesList/WishesList";

// Images
import NoData from "../../img/undraw_no_data.svg";

// Types
import { State } from "../../types/State";
import {
    ReservationStatusSetterType,
    ReservationPayload,
} from "../../types/Reservations";
import { Wish } from "../../types/WishTypes";

interface WishesModalProps {
    userId: string;
    drawId?: string;
    username: string;
    opened: boolean;
    toggle: () => void;
}

export const WishesModal: React.FC<WishesModalProps> = ({
    userId,
    drawId,
    username,
    opened,
    toggle,
}) => {
    const dispatch = useDispatch();
    const [wishesList, setWishesList] = useState<Wish[]>();
    const fetchedWishesList = useSelector((state: State) => {
        const { othersWishes } = state.wish;
        if (
            othersWishes &&
            othersWishes.find(
                (userWishesList) => userWishesList.userId === userId
            )
        ) {
            return othersWishes.find(
                (userWishesList) => userWishesList.userId === userId
            )!.wishesList;
        } else {
            return undefined;
        }
    });

    // Fetch user wishes
    useEffect(() => {
        dispatch({
            type: watcherTypes.WATCH_FETCH_USER_WISHES,
            payload: { userId: userId },
        });
    }, [userId, dispatch]);

    useEffect(() => {
        if (fetchedWishesList) {
            setWishesList(
                fetchedWishesList.map((wish) => ({ ...wish, creator: userId }))
            );
        }
    }, [fetchedWishesList, userId]);

    const handleSetReservationStatus: ReservationStatusSetterType = ({
        wishId,
        creatorId,
        reserved,
    }) => {
        const payload: ReservationPayload = {
            wishId: wishId,
            reserved: reserved,
            creatorId: creatorId,
            wishTitle: wishesList?.find((wish) => wish._id === wishId)!.title,
        };
        if (drawId) {
            payload.drawId = drawId;
        }
        dispatch({
            type: watcherTypes.WATCH_RESERVE_WISH,
            payload: payload,
        });
    };

    // Loading check
    const loadingState = useSelector((state: State) => state.loading);
    const isLoading =
        loadingState.recordId === userId &&
        loadingState.category === "wishes" &&
        loadingState.type === "fetching-records";

    return (
        <Dialog open={opened} onClose={toggle}>
            <DialogTitle>Lista życzeń użytkownika {username}</DialogTitle>
            {isLoading ? (
                <Box display="flex" justifyContent="center" margin="2rem">
                    <CircularProgress />
                </Box>
            ) : wishesList && wishesList.length > 0 ? (
                <WishesList
                    wishesList={wishesList}
                    viewMode="guest"
                    setReservedStatus={handleSetReservationStatus}
                    inModal={true}
                />
            ) : (
                <EmptyListMessage
                    imageUrl={NoData}
                    message={`Użytkownik ${username} nie posiada jeszcze żadnych życzeń`}
                />
            )}
        </Dialog>
    );
};
