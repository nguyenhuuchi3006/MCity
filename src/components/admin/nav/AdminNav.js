import React from 'react';

import {firebase} from '../../../firebase';

import {Link} from 'react-router-dom';  
import ListItem from '@material-ui/core/ListItem'

const AdminNav = () => {

    const links = [
        {title: 'Matches', linkTo: '/admid_matches'},
        {title: 'Add Match', linkTo: '/admid_matches/edit_match'},
        {title: 'Players', linkTo: '/admid_players'},
        {title: 'Add Player', linkTo: '/admid_players/add_player'}    
    ];

    const style = {
        color: '#ffffff',
        fontWeight: '300',
        borderBottom: '1px solid #353535'
    }

    const renderItems = () => (
        links.map(link => (
            <Link to={link.linkTo} key={link.title}>
                <ListItem button style={style}>{link.title}</ListItem>
            </Link>
        ))
    )
    
    const logoutHandlers = () => {
        firebase.auth().signOut().then(()=> {
            console.log('ok');
            
        },(err) => {
            console.log('error');
            
        })
    }
    
    
    return (
        <div>
            {renderItems()}
            <ListItem button style={style} onClick={()=>logoutHandlers()} >Log out</ListItem>
        </div>
    );
};

export default AdminNav;