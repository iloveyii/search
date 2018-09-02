import React from 'react';
import {connect} from 'react-redux';

import {searchStartAction} from '../../Actions/SearchActions';
import List from './List';


export class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: {}, serverErrors: {}};
        this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
        this.startSearch = this.startSearch.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { search } = nextProps.user;
        if(search && Object.keys(search).length > 0) {
            setTimeout(() => {
                this.search.select();
            }, 300, this);

        }
    }

    handleOnKeyUp(e) {
        e.preventDefault();
        this.setState({
            data: {...this.state.data, [e.target.name]: e.target.value}
        });
        const keyCode = e.keyCode ? e.keyCode : e.which;
        if(this.state.data.search && this.state.data.search.length > 3 && keyCode === 13) {
            this.props.searchStartAction({search: this.state.data.search});
        }
        return false;
    }

    startSearch(e) {
        e.preventDefault();
        if(this.search.value && this.search.value.length > 3 ) {
            this.props.searchStartAction({search: this.search.value});
        }
    }

    render() {
        const { search } = this.props.user;

        return (
            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-md-12">
                        <aside style={{"padding": "0"}} className="col-sm-10 offset-sm-1 text-center">
                            <div style={{display: 'flex'}}>
                                <div style={{flex: '8', marginRight: '10px'}}>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"> <i className="fa fa-search"></i> </span>
                                            </div>
                                            <input name="search" className="form-control"
                                                   ref={search=>this.search = search}
                                                   placeholder="Search keyword like books, ebay, careers, football, tennis"
                                                   type="text" onKeyUp={this.handleOnKeyUp}/>
                                        </div>
                                    </div>
                                </div>
                                <div style={{flex: 2}}>
                                    <div className="form-group">
                                        <button type="button" onClick={this.startSearch}  className="btn btn-primary btn-block"> Search </button>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>

                </div>

                <div>
                    {
                        search && Object.keys(search).length > 0
                        ?
                            Object.keys(search).map((key, i)=> <List key={i} site={search[key]} />)
                        :
                            null
                    }
                </div>

            </div>
        );
    }
}

/**
 * Get data from store
 * @param state
 */
const mapStateToProps = state => ({
    user: state.user,
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = {
    searchStartAction
};

export default connect(mapStateToProps, mapActionsToProps)(Index);


