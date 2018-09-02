/**
 * Standard third party packages
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';

/**
 * Our custom components / packages
 */
import Search from './Components/Search/index';
import AppHeader from './Components/Headers/AppHeader';

/**
 * Resources
 */
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <AppHeader logo={logo}/>

                <div className="ui container">
                    <div className="ui one item menu">
                        <Link className="item" to="/search">Search</Link>
                    </div>
                    <Route path="/search" component={Search} />
                </div>

                <footer>
                    <hr/>
                </footer>
            </div>
        );
    }
}

/**
 * Get data from store
 * @param state
 */
const mapStateToProps = state => (
    {
        products: state.products,
        user: state.user
    }
);

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = {};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(App));
