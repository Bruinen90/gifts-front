import React from "react";

// Styles
import * as Styled from "./stylesHome";

// Images
import GiftImg from "../../img/gift_illustration.svg";

// MUI
import { Button } from "@material-ui/core";

// Components
import { Decorators } from "../../components/Decorators/Decorators";
import { Guide } from "../Guide/Guide";

export const Home: React.FC = () => {
    const guideRef = React.createRef<HTMLDivElement>();
    const handleScrollToGuide = () => {
        const scrollPos =
            guideRef!.current!.getBoundingClientRect().top +
            window.pageYOffset -
            56; //-56px for navbar
        window.scrollTo({ top: scrollPos, behavior: "smooth" });
    };
    return (
        <>
            <Styled.MainContainer component="main">
                <Styled.MyBox>
                    <Styled.GiftIllustration src={GiftImg} />
                    <Styled.Header variant="h2">
                        Losowania prezentów na mikołajki i nie tylko
                    </Styled.Header>
                    <Styled.DescriptionBox>
                        Zarejestruj się, stwórz losowanie i zaproś znajomych.
                        Dodajcie dowolne przedmioty do listy życzeń - unikniecie
                        nietrafionych prezentów, niedopasowanych rozmiarów i
                        konieczności szukania pomysłów na podarunki dla całej
                        rodziny.
                    </Styled.DescriptionBox>
                    <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        style={{ position: "relative", zIndex: 1 }}
                        onClick={handleScrollToGuide}
                    >
                        Zacznij teraz
                    </Button>
                </Styled.MyBox>
                <Decorators />
            </Styled.MainContainer>
            <Guide ref={guideRef} />
        </>
    );
};
