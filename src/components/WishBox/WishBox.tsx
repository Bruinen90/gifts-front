import React from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

// MUI
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
    ListItemAvatar,
} from "@material-ui/core";

// Icons
import {
    Edit,
    Delete,
    Check,
    Link,
    MonetizationOn,
    Description,
    LockOpen,
    Shuffle,
    Person,
} from "@material-ui/icons";
// Types
import { StateInterface, User } from "../../interfaces/interfaces";
import { WishBoxProps } from "../../interfaces/WishTypes";
import { ReservationPayload } from "../../interfaces/Reservations";

const WishBox: React.FC<WishBoxProps> = ({
    wish,
    view,
    deleteWish,
    setReservedStatus,
    drawData,
}) => {
    const history = useHistory();
    const loggedUserId = useSelector((state: StateInterface) => state.userId);
    const handleNavigateToEdit = () => {
        history.push("/edytuj-zyczenie", { originalData: wish });
    };

    const changeReservationStatus = (newStatus: boolean) => {
        let creatorId = wish.creator;
        if (typeof creatorId !== "string") {
            creatorId = creatorId._id;
        }
        const payload: ReservationPayload = {
            wishId: wish._id,
            reserved: newStatus,
            creatorId: creatorId,
        };
        if (wish.forDraw) {
            payload.drawId = wish.forDraw;
        }
        setReservedStatus && setReservedStatus(payload);
    };

    const handleReserveWish = () => {
        changeReservationStatus(true);
    };

    const handleCancelReservation = () => {
        changeReservationStatus(false);
    };
    console.log(wish.imageUrl);
    return (
        <Card style={{ margin: "1rem 0", padding: "1rem" }}>
            <CardHeader title={wish.title} />
            <CardContent>
                <List disablePadding>
                    {wish.imageUrl && (
                        <Card
                            style={{
                                width: "120px",
                                height: "120px",
                                margin: "1rem",
                                borderRadius: "50%",
                                overflow: "hidden",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <img
                                src={wish.imageUrl}
                                style={{
                                    objectFit: "cover",
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                        </Card>
                    )}
                    <ListItem>
                        <ListItemIcon>
                            <MonetizationOn />
                        </ListItemIcon>
                        <ListItemText
                            primary={wish.price + " zł"}
                            secondary="Orientacyjna cena"
                        />
                    </ListItem>
                    {wish.link && (
                        <ListItem button component="a" href={wish.link}>
                            <ListItemIcon>
                                <Link />
                            </ListItemIcon>
                            <ListItemText primary="Zobacz specyfikację lub zdjęcie" />
                        </ListItem>
                    )}
                    {wish.description && (
                        <ListItem>
                            <ListItemIcon>
                                <Description />
                            </ListItemIcon>
                            <ListItemText style={{ whiteSpace: "pre-wrap", maxHeight: "200px", overflow: 'auto' }}>
                                {wish.description}
                            </ListItemText>
                        </ListItem>
                    )}
                    {drawData && (
                        <ListItem>
                            <ListItemIcon>
                                <Shuffle />
                            </ListItemIcon>
                            <ListItemText>{drawData.title} </ListItemText>
                        </ListItem>
                    )}
                    {(drawData ||
                        (wish.creator && typeof wish.creator !== "string")) && (
                        <ListItem>
                            <ListItemIcon>
                                <Person />
                            </ListItemIcon>
                            <ListItemText>
                                {drawData
                                    ? drawData.results!.username
                                    : (wish.creator as User).username}{" "}
                            </ListItemText>
                        </ListItem>
                    )}
                </List>
            </CardContent>
            <CardActions>
                {view === "full" ? (
                    <>
                        <Button
                            color="secondary"
                            startIcon={<Delete />}
                            onClick={deleteWish}
                        >
                            Usuń
                        </Button>
                        <Button
                            color="primary"
                            startIcon={<Edit />}
                            onClick={handleNavigateToEdit}
                        >
                            Edytuj
                        </Button>
                    </>
                ) : wish.reserved && loggedUserId === wish.buyer ? (
                    <Button
                        color="secondary"
                        startIcon={<LockOpen />}
                        onClick={handleCancelReservation}
                    >
                        Anuluj deklarację zakupu
                    </Button>
                ) : (
                    <Button
                        color="primary"
                        startIcon={<Check />}
                        onClick={handleReserveWish}
                    >
                        Kupię to
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};
export default WishBox;
