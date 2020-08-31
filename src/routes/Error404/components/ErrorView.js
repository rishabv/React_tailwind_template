import React from 'react';
import './ErrorView.scss';
const redirectToDashboard = [
  '/user',
  '/user/login',
  '/dashboard/login'
];
export class ErrorView extends React.Component {
    render () {
        if(redirectToDashboard.indexOf(this.props.location.pathname) >= 0) {
            this.props.history.push('/');
        }
        return (
            <div className='page404-view'>
                <div className='page404-container page404'>
                    <p className='page404-error-text'>404. Page not found.</p>
                </div>
            </div>
        );
    }
}

export default ErrorView;
