import React from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

// MUI
import {
    Grid,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
    CardMedia,
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
import { StateInterface } from "../../types/State";
import { User } from "../../types/User";
import { WishBoxProps } from "../../types/WishTypes";
import { ReservationPayload } from "../../types/Reservations";

const WishBox: React.FC<WishBoxProps> = ({
    wish,
    view,
    deleteWish,
    setReservedStatus,
    drawData,
    oneColumn,
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
    console.log(wish);
    return (
        <Grid item xs={12} sm={oneColumn ? 12 : 6} style={{ width: "100%" }}>
            <Card
                style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {wish.imageUrl && (
                    <CardMedia
                        image={wish.imageUrl}
                        style={{ height: "250px" }}
                    />
                )}
                <CardHeader title={wish.title} />
                <CardContent style={{ padding: "1rem" }}>
                    <List disablePadding>
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
                                <ListItemText
                                    style={{
                                        whiteSpace: "pre-wrap",
                                        maxHeight: "200px",
                                        overflow: "auto",
                                    }}
                                >
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
                            (wish.creator &&
                                typeof wish.creator !== "string")) && (
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
                <CardActions style={{ marginTop: "auto" }}>
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
        </Grid>
    );
};
export default WishBox;
