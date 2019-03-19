import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import {Link} from 'react-router-dom'

import CityLogo from '../ui/icons';

class Header extends Component {
    render() {
        return (
            <AppBar
                position = "fixed"
                style = {{
                    backgroundColor: '#98c5e9',
                    boxShadow: 'none',
                    padding: '5px 0',
                    borderBottom: '2px solid #00285e'
                }}
            >
                <Toolbar style = {{display: 'flex', minHeight: '30px'}}>
                    <div style = {{flexGrow: 1}}>
                        <div className="header_logo">
                            <CityLogo
                                width = '50px'
                                height = '50px'
                                link = 'true'
                                linkTo = '/'
                            />
                        </div>
                    </div>

                    <Link to="/the_team">
                        <Button color="inherit">The team</Button>
                    </Link>
                    <Link to="/the_match">
                        <Button color="inherit">Matches</Button>

                    </Link>
                </Toolbar>

            </AppBar>
        );
    }
}

export default Header;