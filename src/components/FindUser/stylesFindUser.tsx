import React from 'react';
import { styled, Theme } from '@material-ui/core/styles';
import { Box, BoxProps } from '@material-ui/core';

// Types
import {
	SearchResultsBoxProps,
	SearchState,
} from '../../interfaces/interfaces';

export const SearchResultsBox = styled(
	({
		searchState,
		...other
	}: SearchResultsBoxProps & Omit<BoxProps, keyof SearchResultsBoxProps>) => (
		<Box {...other} />
	)
)(({ theme, searchState }: { theme: Theme; searchState: SearchState }) => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
	opacity: searchState === 'too-short' ? 0.25 : 1,
	padding: theme.spacing(3, 0),
	minHeight: 90,
}));
