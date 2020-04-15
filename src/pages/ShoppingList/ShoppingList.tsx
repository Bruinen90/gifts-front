import React, { useEffect } from "react";
import { useSelector } from "react-redux";

// MUI
import { Typography } from "@material-ui/core";

// Components
import PageWrapper from "../../components/PageWrapper/PageWrapper";

// Types
import { StateInterface } from "../../interfaces/interfaces";
import WishBox from "../../components/WishBox/WishBox";

export const ShoppingList: React.FC = () => {
    const shoppingList = useSelector(
        (state: StateInterface) => state.shoppingList
    );

    useEffect(() => {
        console.log(shoppingList);
    }, [shoppingList]);

    const handleSetReservedStatus = () => {
        console.log("canceling reservation");
    };
    return (
        <PageWrapper>
            <Typography variant="h2" align="center">
                Lista zakupów
            </Typography>
            {shoppingList &&
                shoppingList.map((item) => (
                    <WishBox
                        key={item._id}
                        view="simple"
                        wish={item}
                        setReservedStatus={handleSetReservedStatus}
                    />
                ))}
        </PageWrapper>
    );
};
