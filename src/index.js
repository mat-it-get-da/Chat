import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";

import reportWebVitals from "./reportWebVitals";

import Header from "./components/Header";
import Main from "./pages/main";
import Chat from "./pages/chat";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <div>
            <Toaster />
        </div>

        <RecoilRoot>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/chat" element={<Chat />} />
                </Routes>
            </BrowserRouter>
        </RecoilRoot>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
