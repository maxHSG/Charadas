export default (
	state = { app_started: false, authenticated: false },
	{ type, payload }
) => {
	switch (type) {
		case "LOGIN_SUCCESS":
			return { ...state, authenticated: true };

		case "LOGGOUT":
			return { ...state, authenticated: false };

		case "APP_LOADED":
			return { ...state, app_started: true };
		case "APP_LOADING":
			return { ...state, app_started: false };
		default:
			return state;
	}
};
