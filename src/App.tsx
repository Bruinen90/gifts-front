import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Home from "./pages/Home/Home";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { theme } from "./common/theme";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as watchersTypes from "./store/actions/watcherTypes";

// Components
import NavBar from "./components/NavBar/NavBar";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import GuardedRoute from "./components/GuardedRoute/GuardedRoute";

// Pages
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import CreateDraw from "./pages/CreateDraw/CreateDraw";
import MyDraws from "./pages/MyDraws/MyDraws";
import MyWishes from "./pages/MyWishes/MyWishes";
import CreateWish from "./pages/CreateWish/CreateWish";
import { Friends } from "./pages/Friends/Friends";
import { ShoppingList } from "./pages/ShoppingList/ShoppingList";
import { ErrorPrompt } from "./components/ErrorPrompt/ErrorPrompt";
import { ResetPassword } from "./pages/ResetPassword/ResetPassword";
import { NewPassword } from "./pages/NewPassword/NewPassword";
import { EmailSentConfirmation } from "./pages/EmailSentConfirmation/EmailSentConfirmation";
import { UserSettings } from "./pages/UserSettings/UserSettings";
import { SuccessPrompt } from "./components/SuccessPrompt/SuccessPrompt";
import UsubscribeConfirmation from "./pages/UsubscribeConfirmation/UsubscribeConfirmation";
import Footer from "./components/Footer/Footer";

// Styles
import * as Styled from "./stylesApp";

// axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.baseURL = "https://bez-niespodzianek.herokuapp.com/";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: watchersTypes.WATCH_AUTO_LOGIN_USER });
    }, [dispatch]);
    return (
        <BrowserRouter>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                {/* App goes here */}
                <NavBar />
                <Styled.GlobalWrapper>
                    <Switch>
                        <Route path="/logowanie" component={Login} />
                        <Route path="/rejestracja" component={Signup} />
                        <GuardedRoute
                            path="/nowe-losowanie"
                            component={CreateDraw}
                        />
                        <GuardedRoute
                            path="/edytuj-losowanie"
                            component={CreateDraw}
                        />
                        <GuardedRoute
                            path="/moje-losowania"
                            component={MyDraws}
                        />
                        <GuardedRoute
                            path="/nowe-zyczenie"
                            component={CreateWish}
                        />
                        <GuardedRoute
                            path="/edytuj-zyczenie"
                            component={CreateWish}
                        />
                        <GuardedRoute
                            path="/lista-zyczen"
                            component={MyWishes}
                        />
                        <GuardedRoute path="/moi-znajomi" component={Friends} />
                        <GuardedRoute
                            path="/lista-zakupow"
                            component={ShoppingList}
                        />
                        <GuardedRoute
                            path="/ustawienia"
                            component={UserSettings}
                        />
                        <Route
                            path="/zresetuj-haslo"
                            component={ResetPassword}
                        />
                        <Route path="/utworz-haslo" component={NewPassword} />
                        <Route
                            path="/wyslano-link"
                            component={EmailSentConfirmation}
                        />
                        <Route
                            path="/wypisz-sie"
                            component={UsubscribeConfirmation}
                        />
                        <Route path="/" component={Home} />
                    </Switch>
                    <ErrorPrompt />
                    <SuccessPrompt />
                    <Footer />
                    {/* React router way to scroll window to top on each location change */}
                    <ScrollToTop />
                </Styled.GlobalWrapper>
                {/* End off app */}
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
