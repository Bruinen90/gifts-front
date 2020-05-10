import { put, select } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from '../../actions/actionTypes';
import * as actionCreators from '../../actions/actionCreators';

// Utils
import { getLoggedUser } from '../utils/selectors';

export function* reserveWish(action: {
	type: string;
	payload: {
		drawId?: string;
		creatorId: string;
		wishId: string;
		reserved: boolean;
		wishTitle: string;
	};
}) {
	const { drawId, creatorId, wishId, reserved, wishTitle } = action.payload;
	try {
		const graphqlQuery = {
			query: `
                mutation {
                    setReserved(reservation: {wishId: "${wishId}", reserved: ${reserved}})
                    {success}}
            `,
		};
		if (drawId) {
			graphqlQuery.query = `
            mutation {
                setReserved(reservation: {drawId: "${drawId}", wishId: "${wishId}", reserved: ${reserved}})
                {success}}
        `;
		}
		const response = yield axios.post('graphql', graphqlQuery);
		if (response.data.data && response.data.data.setReserved.success) {
			yield put({
				type: actionTypes.SET_WISH_STATUS,
				payload: {
					drawId,
					creatorId,
					wishId,
					reserved,
					loggedUser: yield select(getLoggedUser),
				},
			});
			yield put(
				actionCreators.setSuccess({
					page: 'wishes',
					id: 'reserve-wish',
					message: reserved
						? `Zadeklarowałeś chęć zakupu "${wishTitle}"`
						: `Usunieto deklarację zakupu "${wishTitle}" `,
				})
			);
		} else {
			throw new Error();
		}
	} catch (err) {
		yield put({
			type: actionTypes.SET_ERROR,
			payload: {
				category: 'wishes',
				message:
					'Wystąpił błąd podczas rezerwacji życzenia, spróbuj ponownie później',
			},
		});
	}
}
