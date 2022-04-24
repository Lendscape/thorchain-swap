import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import MaterialThemeProvider from "./providers/theme";
import MuiSnackbarProvider from "./providers/snackbar";
import NotificationProvider from "./providers/notification";
import Spinner from "./components/Spinner";
import Store from "./redux/store/index.js";
import { Provider } from "react-redux";

const App = lazy(() => import("./App"));
const store = Store();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <MaterialThemeProvider>
                <MuiSnackbarProvider>
                    <NotificationProvider>
                        <Suspense fallback={<Spinner />}>
                            <App />
                        </Suspense>
                    </NotificationProvider>
                </MuiSnackbarProvider>
            </MaterialThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
