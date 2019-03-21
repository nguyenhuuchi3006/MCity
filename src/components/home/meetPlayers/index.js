import React, { Component } from 'react';

import { Tag } from '../../ui/misc';

import Stripes from '../../../resources/images/stripes.png';

class MeetPlayers extends Component {

    state = {

    }

    render() {
        return (
            <div className="home_meetplayers"
                style = {{
                    background: `#ffffff url(${Stripes})`
                }}
            >
                <div className="container">
                    <div className="home_meetplayers_wrapper">
                        <div className="home_card_wrapper">
                            card
                        </div>
                        <div className="home_text_wrapper">
                            <div>
                                <Tag 
                                    bck="#0e1731"
                                    size="100px"
                                    color="#ffffff"
                                    add={{
                                        marginBottom: '20px',
                                        
                                    }}
                                >
                                    Meet
                                </Tag>
                                <Tag 
                                    bck="#0e1731"
                                    size="100px"
                                    color="#ffffff"
                                    add={{
                                        marginBottom: '20px',
                                        
                                    }}
                                >
                                    The
                                </Tag>
                                <Tag 
                                    bck="#0e1731"
                                    size="100px"
                                    color="#ffffff"
                                    add={{
                                        marginBottom: '20px',
                                        
                                    }}
                                >
                                    Player
                                </Tag>

                                <Tag 
                                    bck="#ffffff"
                                    size="27px"
                                    color="#0e1731"
                                    link={true}
                                    linkTo='/the_team'
                                    add={{
                                        border: '1px solid #0e1731'
                                    }}
                                    
                                >
                                    Meet them here
                                </Tag>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MeetPlayers;