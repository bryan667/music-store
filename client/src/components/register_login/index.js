import React from 'react';
import SimpleButton from '../utils/button'


const RegisterLogin = () => {
    return (
        <div className='page_wrapper'>
            <div className='container'>
                <div className='register_login_container'>
                    <div className='left'>
                        <h1>New Customers</h1>
                        <p>In non ipsum aute consequat tempor nulla non ipsum in esse culpa officia ullamco id. Ad id duis consectetur ex officia tempor cillum proident exercitation mollit quis eiusmod et elit. Aliqua fugiat sit labore enim id amet elit consectetur nulla nulla fugiat reprehenderit eiusmod. Sunt qui adipisicing cupidatat ex cupidatat voluptate est veniam. Adipisicing velit ex laboris enim. Duis exercitation aute aute consequat consequat.</p>
                        <SimpleButton
                            type='default'
                            title='Create an account'
                            linkTo='/register'
                            addStyles={{
                                margin:'10px 0 0 0'
                            }}
                        />
                    </div>
                    <div className='right'>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterLogin;