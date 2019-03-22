import React, { Component } from 'react';

import Fade from 'react-reveal/Fade';
import FormField from '../../ui/formFields';

class Enroll extends Component {

    state ={
        formError: false,
        formSuccess: '',
        formdata:{
            email:{
                element: 'input',
                value: '',
                config: {
                    name:'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation:{
                    require: true,
                    email: true
                },
                valid: false,
                validationMessage: ''
            }
        }
    }

    submitForm(){

    }

    render() {
        return (
            <Fade>
                <div className="enroll_wrapper">
                    <form onSubmit={(event)=> this.submitForm(event)}></form>
                
                    <div className="enroll_title">
                        enter your email
                    </div>
                    <div className="enroll_input">
                        <FormField 
                            id={'email'}
                            formdata={ this.state.formdata.email}
                            
                        
                        />
                    </div>
                </div>
            </Fade>
        );
    }
}

export default Enroll;