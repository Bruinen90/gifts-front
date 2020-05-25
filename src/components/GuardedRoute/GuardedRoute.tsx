import React from 'react';
import { Route, Redirect } from 'react-router';
import { useSelector } from 'react-redux';

// Types
import { State } from '../../types/State';

interface GuardedRoute {
	path: string;
	component: React.FC;
}

export const GuardedRoute: React.FC<GuardedRoute> = ({
	path,
	component: TargetComponent,
	...other
}) => {
	const authenticated = useSelector((state: State) => state.auth.token);
	return (
		<Route
			exact
			path={path}
			render={() =>
				!Boolean(authenticated) ? (
					<Redirect to={`logowanie?target=${path.slice(1)}`} />
				) : (
					<TargetComponent {...other} />
				)
			}
		/>
	);
};

export default GuardedRoute;
