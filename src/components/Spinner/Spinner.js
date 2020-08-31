import React from 'react';
import './Spinner.scss';
class Spinner extends React.Component {
    render () {
        return (
            <svg className='spinner' viewBox='0 0 66 66'>
                <circle className='path' cx='33' cy='33' fill='none' r='30' strokeLinecap='round' strokeWidth='6' />
            </svg>
        );
    }
}

export default Spinner;
