import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Types
import { WishesListProps } from "../../types/WishTypes";
import { State } from "../../types/State";
import * as watcherTypes from "../../store/actions/watcherTypes";

// MUI
import { Grid, CircularProgress, Card } from "@material-ui/core";

// Components
import { WishBox } from "../WishBox/WishBox";

export const WishesList: React.FC<WishesListProps> = ({
    wishesList,
    viewMode,
    setReservedStatus,
    inModal,
}) => {
    const dispatch = useDispatch();
    const handleDeleteWish = (wishId: string, wishTitle: string) => {
        dispatch({
            type: watcherTypes.WATCH_DELETE_WISH,
            payload: { wishId, wishTitle },
        });
    };
    const loadingState = useSelector((state: State) => state.loading);

    return (
        <Grid
            container
            spacing={2}
            style={{ width: "100%", maxWidth: "800px", margin: "auto" }}
        >
            {loadingState.loading &&
                loadingState.category === "wishes" &&
                loadingState.type === "new-record" && (
                    <Grid
                        item
                        xs={12}
                        sm={inModal ? 12 : 6}
                        style={{ width: "100%", position: "relative" }}
                    >
                        <Card
                            style={{
                                height: "100%",
                                minHeight: "300px",
                                display: "flex",
                                flex: "1",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <CircularProgress size={90} />
                        </Card>
                    </Grid>
                )}
            {wishesList.map((wish) => (
                <WishBox
                    wish={wish}
                    drawData={wish.drawData}
                    key={wish._id}
                    view={viewMode === "creator" ? "full" : "simple"}
                    deleteWish={() => handleDeleteWish(wish._id, wish.title)}
                    setReservedStatus={setReservedStatus}
                    oneColumn={inModal}
                />
            ))}
        </Grid>
    );
};
