import React from "react";

// Images
import Register from "../../img/register.svg";
import CreateDraws from "../../img/create_draws.svg";
import AddFriends from "../../img/add_friends.svg";
import SelectWishes from "../../img/select_wishes.svg";
import DrawResults from "../../img/draw_results.svg";
import Reserve from "../../img/reserve.svg";
import GiftsGiving from "../../img/gifts_giving.svg";

import * as Styled from "./stylesGuide";
import { Grid } from "@material-ui/core";

const GUIDES_LIST = [
    {
        title: "Zarejestruj się",
        image: Register,
        description:
            "Załóż konto w 30 sekund - wystarczy, że podasz nazwę użytkownika po której rozpoznają Cię Twoi znajomi oraz adres email."
    },
    {
        title: "Utwórz pierwsze losowanie",
        image: CreateDraws,
        description: "Podaj nazwę losowania np. 'Święta 2020 u Kowalskich', maksymalną cenę prezentu oraz dodaj pierwszych uczestników. Wybierz datę kiedy ma się odbyć losowanie"
    },
    {
        title: "Zaproś znajomych i rodzinę",
        image: AddFriends,
        description: "Poinformuj o losowaniu znajomych i rodzinę - kiedy zarejestrują się będziesz mógł dodać ich do losowania"
    },
    {
        title: "Stwórzcie listy życzeń",
        image: SelectWishes,
        description: "Uniknijcie przykrych niespodzianek! Tworząc listę życzeń ułatwiasz wybór osobie, która Cię wylosuje. Pamiętaj aby umieścić w opisie życzenia możliwie dużo szczegółów, np. rozmiar lub kolor prezentu oraz jego orientacyjną cenę"
    },
    {
        title: "Czas na wyniki!",
        image: DrawResults,
        description: "Losowanie które stworzyłeś możesz uruchomić ręcznie z panelu 'Moje losowania' lub zostanie ono wykonane w wybranym przez Ciebie terminie automatycznie. Wszyscy uczestnicy zostaną poinformowani o wylosowanej osobie"
    },
    {
        title: "Uniknij powtórek",
        image: Reserve,
        description: "Po otrzymaniu wyników losowania koniecznie zajrzyj na listę życzeń wylosowanej osoby. Znajdziesz tam wszystkie potrzebne informacje oraz zadeklarujesz chęć zakupu wybranego prezentu. Deklaracje zostaną przekazane innym osobom kupującym prezent dla tej osoby, co wykluczy otrzymanie dwóch takich samych prezentów"
    },
    {
        title: "Ciesz się z trafionych prezentów!",
        image: GiftsGiving,
        description: "Pora na wymianę podarków! Tym razem nie musisz udawać radości z otrzymania kolejnej sosjerki i wełnianych skarpet. Chyba, że akurat na to miałeś ochotę? Na koniec warto oznaczyć losowanie jako archiwalne aby utrzymać porządek"
    }
];

export const Guide: React.FC = () => (
	<Grid container>
		{GUIDES_LIST.map((guide, index) => (
			<Grid item>
				<Styled.GuideImg src={guide.image}/>
			</Grid>
		))}
	</Grid>
);
