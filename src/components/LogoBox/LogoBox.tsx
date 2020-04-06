import React from 'react';
import { useHistory } from 'react-router';
import GiftIcon from '../../img/gift.svg';

// Styles
import * as Styled from './stylesLogoBox';

const LogoBox: React.FC = () => {
	const history = useHistory();

	const handleGoToHomepage = () => {
		history.push('/');
	};
	return (
		<Styled.LogoBox
			onClick={handleGoToHomepage}
			display="flex"
			alignItems="flex-end"
			style={{ cursor: 'pointer' }}
		>
			<Styled.LogoText>Bez</Styled.LogoText>
			<Styled.GiftIcon
				src={GiftIcon}
			/>
			<Styled.LogoText>niespodzianek</Styled.LogoText>
		</Styled.LogoBox>
	);
};

export default LogoBox;
