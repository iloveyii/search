import React from 'react';

class Errors extends React.Component {
    constructor(props) {
        super(props);
        this.closeMe = this.closeMe.bind(this);
        this.state = {serverErrors : ''}
    }

    componentDidMount() {
        console.info('Errors - componentDidMount called.');
        const { serverErrors } = this.props;
        this.setState({serverErrors});
    }

    componentWillReceiveProps(nextProps) {
        console.info('Errors - componentWillReceiveProps called.');
        console.log(nextProps);
        const { serverErrors } = nextProps;
        this.setState({ serverErrors });
    }

    closeMe() {
        const serverErrors = '';
        this.setState({serverErrors})
    }

    render() {
        const { serverErrors } = this.state;

        return (
            serverErrors && ( typeof serverErrors === 'string' && serverErrors.length === 0 || Object.keys(serverErrors).length === 0 )
            ?
            null
            :
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {
                    this.props.showDisMiss
                    ?
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.closeMe} >
                        <span aria-hidden="true">&times;</span>
                    </button>
                    :
                    null
                }

                <strong>Holy guacamole!</strong> {serverErrors && serverErrors.serverErrors}.
            </div>
        );
    }
}

export default Errors;
