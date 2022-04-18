import React, { Suspense, lazy } from "react";
import Spinner from "./components/Spinner";
import Layout from "./components/Layout";

// ** Import Route Providers
import { Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory({
    basename: "",
    forceRefresh: false,
});

const AppRouter = () => {
    return (
        <Router history={history}>
            <Suspense fallback={<Spinner />}>
                <Switch>
                    <Layout></Layout>
                </Switch>
            </Suspense>
        </Router>
    );
};

export default AppRouter;
