import React from 'react';
import { Redirect } from 'react-router';

export default function () {
    return (<Redirect to={'/dashboard'} />);
}
