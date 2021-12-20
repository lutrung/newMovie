import React from 'react';
import Info from './Info';

export default function MovieDetails(props) {
    return (
        <div>
            <Info movieCode={props.match.params.maPhim} />
        </div>
    )
}
