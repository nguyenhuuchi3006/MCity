import React, { Component } from 'react';

class MatchesList extends Component {

    state = {
        Matcheslist: []
    }

    static getDerivedStateFromProps(props, state) {
        return state = {
            matcheslist: props.matches
        }
    }

    render() {
        return (
            <div>
                list
            </div>
        );
    }
}

export default MatchesList;