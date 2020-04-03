import { styled } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

// export const GuidesGrid = styled(Grid)(({theme}) => ({

// });

export const GuideImg = styled("img")(({ theme }: { theme: Theme }) => ({
    width: "80%",
    margin: theme.spacing(2)
}));
