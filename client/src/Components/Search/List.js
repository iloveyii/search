import React from 'react';
import {connect} from 'react-redux';

import {searchStartAction} from '../../Actions/SearchActions';
import Errors from '../Alerts/Errors';

const Item = ({item}) => {

    return(
        <div>
            <div className="text-success text-left">
                {
                    Object.keys(item).map((key, i)=>{
                        return(
                            ( key.length > 0 ) && (item[key].length > 0)
                                ?
                            <div key={i}>
                                <span>{key} : {item[key]}</span>
                            </div>
                                :
                                null
                        )
                    })
                }

            </div>
        </div>
    )
};

export class List extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { site } = this.props;

        return (

                <div className="row" style={Styles.list}>

                    <div className="col-md-12">
                        <aside style={{"padding": "0"}} className="col-sm-10 offset-sm-1 text-center">
                            <div className="card">
                                <article className="card-body">
                                    <h4 className="card-title text-center mb-4 mt-1">
                                        <a href={site[0].url}>
                                            {site[0].title}
                                        </a>
                                        </h4>
                                    <hr/>
                                    {
                                        site[0].attributes.map((item, i)=><Item key={i} item={item}/>)
                                    }
                                </article>

                            </div>
                        </aside>
                    </div>
                </div>
        );
    }
}


export default List;

const Styles = {
    list: {
        marginBottom: '5px'
    }
};
