import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI
import {
    Card,
    CardHeader,
    CardContent,
    Box,
    Typography,
    CardActions,
    Button,
} from "@material-ui/core";

// Components
import WishesModal from "../WishesModal/WishesModal";
import GiftBox from "../GiftBox/GiftBox";

// Types
import { StateInterface } from "../../interfaces/interfaces";
import { Wish } from "../../interfaces/WishTypes";
import { ReservationStatusSetterType } from "../../interfaces/Reservations";
import { DrawStatusType } from "../../interfaces/Draw";

interface DrawResultsProps {
    _id: string;
    username: string;
    drawId: string;
    gifts?: Wish[];
    drawStatus: DrawStatusType;
}

const DrawResults: React.FC<DrawResultsProps> = ({
    _id,
    username,
    drawId,
    gifts,
    drawStatus,
}) => {
    const dispatch = useDispatch();
    const [wishesList, setWishesList] = useState<Wish[]>();
    const fetchedWishesList = useSelector((state: StateInterface) => {
        if (state.othersWishes && drawStatus === "done") {
            return state.othersWishes.find(
                (userWishesList) => userWishesList.userId === _id
            )!.wishesList;
        } else {
            return undefined;
        }
    });
    useEffect(() => {
        dispatch({
            type: "FETCH_USER_WISHES_WATCHER",
            payload: { userId: _id },
        });
    }, [_id, dispatch]);

    useEffect(() => {
        if (fetchedWishesList) {
            setWishesList(fetchedWishesList);
        }
    }, [fetchedWishesList]);

    const [wishesDialogOpened, setWishesDialogOpened] = useState(false);

    const handleToggleWishesDialog = () => {
        setWishesDialogOpened((prev) => !prev);
    };

    const handleSetReservationStatus: ReservationStatusSetterType = ({
        wishId,
        reserved,
    }) => {
        dispatch({
            type: "RESERVE_WISH_WATCHER",
            payload: { drawId: drawId, wishId: wishId, reserved: reserved },
        });
    };

    const handleCancelReservation = (payload: { wishId: string }) => {
        handleSetReservationStatus({ wishId: payload.wishId, reserved: false });
    };
    return (
        <>
            <Card variant="outlined">
                <CardHeader
                    title="Wyniki losowania"
                    titleTypographyProps={{
                        align: "center",
                        color: "primary",
                        style: {
                            textTransform: "uppercase",
                            fontWeight: "lighter",
                        },
                    }}
                />
                <CardContent>
                    <Box textAlign="center">
                        <Typography
                            color="textSecondary"
                            variant="overline"
                            component="div"
                        >
                            Losowanie zakończone! Wylosowałeś użytkownika:
                        </Typography>
                        <Typography
                            variant="h3"
                            component="div"
                            style={{ fontWeight: "lighter" }}
                        >
                            {username}
                        </Typography>
                        {drawStatus !== "archived" &&
                            (gifts && gifts.length > 0 ? (
                                <>
                                    <Typography
                                        color="textSecondary"
                                        variant="overline"
                                        component="div"
                                    >
                                        Zadeklarowałeś, że kupisz:
                                    </Typography>
                                    {gifts.map((gift) => (
                                        <GiftBox
                                            key={gift._id}
                                            _id={gift._id}
                                            title={gift.title}
                                            description={gift.description}
                                            price={gift.price}
                                            link={gift.link}
                                            cancelReservation={(payload) =>
                                                handleCancelReservation(payload)
                                            }
                                        />
                                    ))}
                                </>
                            ) : (
                                <Typography
                                    variant="overline"
                                    component="div"
                                    color="secondary"
                                >
                                    Zadeklaruj co kupisz!
                                </Typography>
                            ))}
                    </Box>
                </CardContent>
                <CardActions>
                    {drawStatus === "archived" ? (
                        <Typography
                            color="secondary"
                            style={{ margin: "auto" }}
                            variant="button"
                        >
                            Losowanie archiwalne
                        </Typography>
                    ) : (
                        <Button
                            color="primary"
                            style={{ margin: "auto" }}
                            onClick={handleToggleWishesDialog}
                        >
                            Zobacz listę życzeń
                        </Button>
                    )}
                </CardActions>
            </Card>
            {wishesList && wishesDialogOpened && (
                <WishesModal
                    username={username}
                    opened={wishesDialogOpened}
                    toggle={handleToggleWishesDialog}
                    setReservedStatus={(payload) =>
                        handleSetReservationStatus(payload)
                    }
                    wishesList={wishesList}
                />
            )}
        </>
    );
};

export default DrawResults;
