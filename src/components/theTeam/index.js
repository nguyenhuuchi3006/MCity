import React, { Component } from 'react';

import PlayerCard from '../ui/playerCard';
import Fade from 'react-reveal/Fade';
import Stripes from '../../resources/images/stripes.png';
import {firebasePlayers, firebase} from '../../firebase';
import {firebaseLooper} from '../ui/misc';
// import {Promise} from 'core-js'
import { Promise } from 'core-js';


class TheTeam extends Component {

    state = {
        loading: true,
        players: []
    }

    componentDidMount(){
        firebasePlayers.once('value').then(snapshot => {
            const players = firebaseLooper(snapshot);

            // players.forEach((player) => {                //thêm cái url ảnh vào database dùng cách này mà khi gọi player.url ở dưới không được
            //     firebase.storage().ref('players')
            //     .child(player.image).getDownloadURL()
            //     .then(url => {
            //         player.url = url
            //     })
            // });

            // this.setState({
            //     loading: false,
            //     players,
            // });


            let promises = [];
            
            for(let key in players){                    //dùng promise mới được ??
                promises.push(
                    new Promise((resolve,reject)=>{
                        firebase.storage().ref('players')
                        .child(players[key].image).getDownloadURL()
                        .then( url => {
                            players[key].url = url;
                            resolve();
                        })
                    })
                )
            }

            Promise.all(promises).then(()=>{
                this.setState({
                    loading: false,
                    players
                })
            })

        });

    }

    showplayersByCategory = (category) => (
        this.state.players ?
            this.state.players.map((player,i) => {
                console.log(player);
                
                return player.position === category ?
                    <Fade left key={i} delay={i*20}>
                        <div className="item">
                            <PlayerCard 
                                number={player.number}
                                name={player.name}
                                lastname={player.lastname}
                                bck={player.url}
                            />
                        </div>
                    </Fade>
                :null
            })
        :null
    )

    render() {
        
        return (
            <div className="the_team_container" style= {{
                background: `url(${Stripes}) repeat`
            }}>
                { !this.state.loading ?
                    <div>
                        <div className="team_category_wrapper">
                            <div className="title">Keeper</div>
                            <div className="team_cards">
                                {this.showplayersByCategory('Keeper')}
                            </div>
                        </div>

                        <div className="team_category_wrapper">
                            <div className="title">Defence</div>
                            <div className="team_cards">
                                {this.showplayersByCategory('Defence')}
                            </div>
                        </div>

                        <div className="team_category_wrapper">
                            <div className="title">Midfield</div>
                            <div className="team_cards">
                                {this.showplayersByCategory('Midfield')}
                            </div>
                        </div>

                        <div className="team_category_wrapper">
                            <div className="title">Strikers</div>
                            <div className="team_cards">
                                {this.showplayersByCategory('Striker')}
                            </div>
                        </div>
                    </div>
                    :null

                }
            </div>
        );
    }
}

export default TheTeam;