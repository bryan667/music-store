import React from 'react';
import { Link } from 'react-router-dom'

const SimpleButton = (props) => {

    const buttons = () => {
        let template = ''

        switch(props.type) {
            case 'default':
                template = <Link
                    className='link_default'
                    to={props.linkTo}
                    {...props.addStyles}
                >
                    {props.title}
                </Link>
            break

            default:
                template=''
        }
        
        return template
    }

    return (
        <div className='my_link'>
            {buttons()}
        </div>
    );
};

export default SimpleButton;