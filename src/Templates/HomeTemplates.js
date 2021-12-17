import React from 'react'
import { Route } from 'react-router-dom'
import Footer from '../Component/Footer/footer';
import Header from '../Component/Header/header';
export default function HomeTemplates(props) {
    let { Component, ...restParam } = props;
    return (
        <Route {...restParam} render={(propsRoute) => {
            return <>
                <Route component={Header} />
                <Component {...propsRoute} />
                <Route component={Footer} />
            </>
        }} />
    )
}
