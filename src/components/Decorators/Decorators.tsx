import React from 'react';

// Images
import PlusIcon from '../../img/decorators/plus.svg';
import StarIcon from '../../img/decorators/star.svg';
import CircleIcon from '../../img/decorators/circle.svg';

//Styles
import * as Styled from './stylesDecorators';

const PLUS_CORDS = [
	{ left: 10, top: 15 },
	{ left: 30, top: 80 },
	{ left: 5, top: 50 },
	{ left: 25, top: 85 },
	{ left: 90, top: 95 },
	{ left: 75, top: 12 },
	{ left: 55, top: 5 },
	{ left: 62, top: 54 },
	{ left: 84, top: 51 },
	{ left: 41, top: 88 },
];
const STAR_CORDS = [
	{ left: 15, top: 7 },
	{ left: 77, top: 40 },
	{ left: 10, top: 25 },
	{ left: 32, top: 30 },
	{ left: 45, top: 5 },
	{ left: 33, top: 90 },
	{ left: 20, top: 65 },
	{ left: 31, top: 51 },
	{ left: 99, top: 66 },
	{ left: 82, top: 10 },
];
const CIRCLE_CORDS = [
    { left: 15, top: 57 },
	{ left: 26, top: 40 },
	{ left: 31, top: 35 },
	{ left: 43, top: 20 },
	{ left: 54, top: 15 },
	{ left: 63, top: 90 },
	{ left: 72, top: 85 },
	{ left: 83, top: 71 },
	{ left: 9, top: 86 },
	{ left: 98, top: 30 },
];

const DECORATORS_ARR = [
	{
		image: PlusIcon,
		cords: PLUS_CORDS,
	},
	{
		image: StarIcon,
		cords: STAR_CORDS,
	},
	{
		image: CircleIcon,
		cords: CIRCLE_CORDS,
	},
];

const output = DECORATORS_ARR.map(decorator => {
	const ICONS_OUTPUT = [];
	for (let i = 0; i < decorator.cords.length; i++) {
		ICONS_OUTPUT.push(
			<Styled.DecoIcon
				src={decorator.image}
				left={decorator.cords[i].left}
				top={decorator.cords[i].top}
			/>
		);
	}
	return ICONS_OUTPUT;
});

export const Decorators: React.FC = () => <>{output}</>;
