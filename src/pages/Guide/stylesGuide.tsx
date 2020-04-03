import { styled } from "@material-ui/styles";
import { Theme, Grid } from "@material-ui/core";

export const Container = styled(Grid)(({theme} : {theme: Theme}) => ({

}))

export const GuideBox = styled(Grid)(({theme} : {theme: Theme})=>({
    [theme.breakpoints.up('lg')]: {
        '&:nth-child(3n -1), &:last-child': {
            transform: 'translateY(200px)',
        }
    }
}))

export const GuideImgContainter = styled('div')(({theme} : { theme: Theme }) => ({
    [theme.breakpoints.up('sm')]: {
        height: '350px',
        display: 'flex',
        alignItems: 'flex-end',
    }
}))


export const GuideImg = styled("img")(({ theme }: { theme: Theme }) => ({
    width: "70%",
    margin: 'auto',
    marginBottom: theme.spacing(3),
}));
