import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "@/app/store";
import { QueryProvider } from "@/app/providers/QueryProvider";
import router from "@/app/router";

import { RouterProvider } from "react-router-dom";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </Provider>
  </React.StrictMode>,
);
