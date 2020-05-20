import React from "react";

// Styles
import * as Styled from "./styles";
// Components
import LogoBox from "../../components/LogoBox/LogoBox";

// MUI
import { CircularProgress } from "@material-ui/core";

const LoadingScreen: React.FC = () => {
    return (
        <Styled.Wrapper>
            <LogoBox scale={window.innerWidth / 400} />
            <CircularProgress style={{ margin: "2rem auto" }} />
        </Styled.Wrapper>
    );
};

export default LoadingScreen;
