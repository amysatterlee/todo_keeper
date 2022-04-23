import React from 'react';

interface Props {
    type: string;
}

const Main = ({ type }: Props) => {
    return <div>Hello Main {type}</div>
}

export default Main;