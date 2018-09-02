import React from 'react';
import {connect} from 'react-redux';


class AppHeader extends React.Component {

    render() {
        const { logo } = this.props;

        return(
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className="App-title">Welcome to our search </h1>
            </header>
        );
    }
}

export default AppHeader;

