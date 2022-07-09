import React from 'react';
import App from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class extends App {
    render(): JSX.Element {
        const { Component, pageProps } = this.props;
        return <Component {...pageProps} />;
    }
}
