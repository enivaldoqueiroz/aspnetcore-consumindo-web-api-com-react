import React from "react";
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from "./pages/Login";

export default function RoutesComponents(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact Component={Login}/>
            </Routes>
        </BrowserRouter>
    );
}