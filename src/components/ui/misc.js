import React from 'react';

import { Link } from 'react-router-dom';

export const Tag = (props) => {

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

//thêm id cho từng match
export const firebaseLooper = (snapshot) => {
    const data = [];
    snapshot.forEach((childSnapshot) => {
        data.push({
            ...childSnapshot.val(),
            id: childSnapshot.key
        })
    });
    return data;
}