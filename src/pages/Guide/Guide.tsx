import React from "react";
import { Link as RouterLink } from "react-router-dom";

// Styles
import * as Styled from "./stylesGuide";

// MUI
import { Grid, Typography, Hidden, RootRef, Button } from "@material-ui/core";

// Data
import { GUIDES_LIST } from "./dataGuide";

export const Guide = React.forwardRef((props, ref) => {
    return (
        <RootRef rootRef={ref as React.RefObject<HTMLDivElement>}>
            <Styled.BoxCont id="jak-zaczac">
                <Typography variant="h1" align="center">
                    Jak zacząć?
                </Typography>
                <Grid container spacing={9} justify="center">
                    {GUIDES_LIST.map((guide, index) => (
                        <Styled.GuideBox
                            item
                            xs={12}
                            sm={6}
                            lg={index === GUIDES_LIST.length - 1 ? 6 : 4}
                            key={guide.title}
                        >
                            <Styled.GuideImgContainter>
                                <Styled.GuideImg src={guide.image} />
                            </Styled.GuideImgContainter>
                            <Grid container alignItems="center">
                                <Hidden xsDown>
                                    <Grid item sm={3}>
                                        <Typography variant="h2">
                                            {index + 1}.
                                        </Typography>
                                    </Grid>
                                </Hidden>
                                <Grid item xs={12} sm={9}>
                                    <Typography variant="h4">
                                        <Hidden smUp>
                                            <Typography
                                                variant="h4"
                                                style={{ marginRight: "8px" }}
                                                component="span"
                                            >
                                                {index + 1}.
                                            </Typography>
                                        </Hidden>
                                        {guide.title}
                                    </Typography>
                                    <Typography>{guide.description}</Typography>
                                </Grid>
                            </Grid>
                            {guide.button && (
                                <Button
                                    style={{ margin: "2rem auto" }}
                                    variant="contained"
                                    color="primary"
                                    component={RouterLink}
                                    to={guide.button.link}
                                >
                                    {guide.button.caption}
                                </Button>
                            )}
                        </Styled.GuideBox>
                    ))}
                </Grid>
            </Styled.BoxCont>
        </RootRef>
    );
});
