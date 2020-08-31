import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TechnicalSupportMessage from '../../../components/TechnicalSupportMessage/TechnicalSupportMessage';
import './UserView.scss';

export class UserView extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            hasError: false
        };
    }
    componentDidCatch () {
        this.setState({ hasError: true });
    }
    render () {
        return (
            <div className='user-view'>
                {this.state.hasError
                    ? <TechnicalSupportMessage />
                    : <div className='container'>
                        <div className='home-btn-row row'>
                            <div className='col-md-12'>
                                <Link to='/dashboard' >Home</Link>
                            </div>
                        </div>
                        <div className='info-card'>
                            <h3 className='info-card-title'>User</h3>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

UserView.propTypes = {};

export default UserView;
