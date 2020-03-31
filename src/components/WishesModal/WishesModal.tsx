import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// MUI
import {
    Dialog,
    DialogTitle,
    CircularProgress,
    Typography
} from "@material-ui/core";

// Types
import WishesList from "../WishesList/WishesList";
import { ReservationStatusSetterType } from "../../interfaces/Reservations";
import { StateInterface } from "../../interfaces/interfaces";
interface WishesModalProps {
    username: string;
    _id: string;
    opened: boolean;
    toggle: () => void;
    setReservedStatus: ReservationStatusSetterType;
    drawId: string;
}

const WishesModal: React.FC<WishesModalProps> = ({
    username,
    _id,
    opened,
    toggle,
    setReservedStatus,
    drawId
}) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const wishesList = useSelector(
        (state: StateInterface) =>
            state.usersDraws.find(draw => draw._id === drawId)!.results!
                .getterWishes
    );
    useEffect(() => {
        dispatch({
            type: "FETCH_USER_WISHES_WATCHER",
            payload: { userId: _id, drawId: drawId }
        });
    }, [_id, drawId]);
    return (
        <Dialog open={opened} onClose={toggle}>
            <DialogTitle>Lista życzeń użytkownika {username}</DialogTitle>
            {loading ? (
                <CircularProgress />
            ) : wishesList ? (
                <WishesList
                    wishesList={wishesList}
                    viewMode="guest"
                    setReservedStatus={setReservedStatus}
                />
            ) : (
                <Typography>
                    Wystąpił błąd serwera, spróbuj ponownie za jakiś czas
                </Typography>
            )}
        </Dialog>
    );
};
export default WishesModal;
