import React from "react";
import { useHistory } from "react-router";

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
  Button
} from "@material-ui/core";

// Icons
import {
  Edit,
  Delete,
  Check,
  Link,
  MonetizationOn,
  Description,
  LockOpen
} from "@material-ui/icons";
// Types
import { Wish } from "../../interfaces/WishTypes";

interface WishBoxProps {
  wish: Wish;
  view: "full" | "simple";
  deleteWish: (_: React.MouseEvent) => void;
  reserveWish: (wishId: string) => void;
}

const WishBox: React.FC<WishBoxProps> = ({
  wish,
  view,
  deleteWish,
  reserveWish
}) => {
  const history = useHistory();
  const handleNavigateToEdit = () => {
    history.push("/edytuj-zyczenie", { originalData: wish });
  };

  const handleReserveWish = () => {
    reserveWish(wish._id);
  };

  const handleCancelReservation = () => {
    console.log("canceling reservation");
  };
  return (
    <Card key={wish._id} style={{ margin: "1rem 0", padding: "1rem" }}>
      <CardHeader title={wish.title} />
      <CardContent>
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
              <ListItemText>{wish.description}</ListItemText>
            </ListItem>
          )}
        </List>
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          startIcon={<LockOpen />}
          onClick={handleCancelReservation}
        >
          Anuluj rezerwację
        </Button>
        {view === "full" ? (
          <>
            c
            <Button
              color="primary"
              startIcon={<Edit />}
              onClick={handleNavigateToEdit}
            >
              Edytuj
            </Button>
          </>
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
