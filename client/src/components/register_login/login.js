import React, { Component } from 'react';
import FormField from '../utils/form/formfield'
import {update} from '../utils/form/formactions'

import { connect } from 'react-redux'

class Login extends Component {

    state = {
        formError: false,
        formSuccess:'',
        formdata: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'                    
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your email'                    
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
        }
    }

    updateForm = (element) => {
        const newFormData = update(element, this.state.formdata, 'login')

        this.setState({
            formError: false,
            formdata: newFormData
        })
    }

    submitForm = (event) => {

    }


    render() {
        return (
            <div className='signin_wrapper'>
                <form onSubmit={(event)=> this.submitForm(event)}>
                    <FormField
                        id={'email'}
                        formdata={this.state.formdata.email}
                        change={(element)=> this.updateForm(element)}
                    />
                    <FormField
                        id={'password'}
                        formdata={this.state.formdata.password}
                        change={(element)=> this.updateForm(element)}
                    />
                    {this.state.formError ? 
                        <div className='error_label'>
                            Please check your username/password
                        </div>
                    :null}
                    <button onClick={(event)=> this.submitForm(event)}></button>
                </form>
            </div>
        );
    }
}

export default Login;