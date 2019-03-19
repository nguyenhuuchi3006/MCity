import React from 'react';

import { Link } from 'react-router-dom';

const Tag = (props) => {

    const template = <div
        
        style={{
            background: props.bck,
            color: props.color,
            fontSize: props.size,
            padding: '5px 10px',
            display: 'inline-block',
            fontFamily: "Righteous"
        }}
    >
        {props.children}
    </div>

    if(props.link) {
        return (
            <Link to={props.linkTo}>
                {template}
            </Link>
        )
    } else {
        return template
    }

};


export default Tag;