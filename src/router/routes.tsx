import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const EntryPage = lazy(() => import("@/views/Entry"))

export const appRoutes: RouteObject[] = [
    {
        path: "/",
        element: <EntryPage />
    }
]