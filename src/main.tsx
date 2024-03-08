import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { TripContextProvider } from "./contexts/tripContext/tripContext";
import { UserContextProvider } from "./contexts/userContext/userContext";
// global styles
import "./assets/styles/main.scss";
import ErrorBoundary from "./components/ErrorBoundary ";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<HelmetProvider>
			<ErrorBoundary>
				<UserContextProvider>
					<TripContextProvider>
						<App />
					</TripContextProvider>
				</UserContextProvider>
			</ErrorBoundary>
		</HelmetProvider>
	</React.StrictMode>
);
