"use client";

import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../redux/store";

export default function ReduxProvider({ children }: PropsWithChildren) {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>{children}</PersistGate>
		</Provider>
	);
}
