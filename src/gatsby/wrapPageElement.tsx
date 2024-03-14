import {GatsbyBrowser} from "gatsby";
import React from "react";
import MainLayout from "../components/MainLayout";

const wrapPageElement:GatsbyBrowser["wrapPageElement"] = ({element,props}) => {
    return <MainLayout {...props}>{element}</MainLayout>;
}

export default wrapPageElement