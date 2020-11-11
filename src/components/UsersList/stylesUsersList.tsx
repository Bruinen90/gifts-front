import React from 'react';
import { styled } from '@material-ui/core/styles';
import { List, ListProps, Theme } from '@material-ui/core';

// Types
import { UsersListTypesType } from '../../types/User';

interface UsersListProps {
	listType: UsersListTypesType;
}

export const UsersList = styled(
	({
		listType,
		...other
	}: UsersListProps & Omit<ListProps, keyof UsersListProps>) => (
		<List {...other} />
	)
)(({ theme, listType }: { theme: Theme; listType: UsersListTypesType }) => {
	const listColor =
		listType === 'addingUsers'
			? theme.palette.primary
			: theme.palette.secondary;
	return {
		'& li': {
			'&:hover': {
				background: listColor.main,
				color: listColor.contrastText,

				'& .MuiListItemText-secondary': {
					color: listColor.contrastText,
					opacity: 0.8,
				},
				'& .MuiListItemSecondaryAction-root': {
					'& svg': {
						color: listColor.contrastText,
					},
				},
			},
			'& .MuiListItemSecondaryAction-root': {
				color: listColor.light,
				pointerEvents: 'none',
			},
		},
	};
});
