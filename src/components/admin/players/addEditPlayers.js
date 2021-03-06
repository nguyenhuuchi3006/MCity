import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';
import Fileuploader from '../../ui/fileuploader';

import { firebasePlayers, firebaseDB, firebase } from '../../../firebase';

class AddEditPlayers extends Component {

    state = {
        playerId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        defaultImg: '',
        formdata: {
            name:{
                element: 'input',
                value: '',
                config: {
                    label: 'Player Name',
                    name:'name_input',
                    type: 'text'
                },
                validation:{
                    require: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            lastname:{
                element: 'input',
                value: '',
                config: {
                    label: 'Player Last name',
                    name:'lastname_input',
                    type: 'text'
                },
                validation:{
                    require: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            number:{
                element: 'input',
                value: '',
                config: {
                    label: 'Player Number',
                    name:'number_input',
                    type: 'text'
                },
                validation:{
                    require: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            position:{
                element: 'select',
                value: '',
                config: {
                    label: 'Select a position',
                    name:'select_position',
                    type: 'select',
                    option: [
                        {key: "Keeper", value: "Keeper"},
                        {key: "Defence", value: "Defence"},
                        {key: "Midfield", value: "Midfield"},
                        {key: "Striker", value: "Striker"}
                    ]
                },
                validation:{
                    require: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            image: {
                element: 'image',
                value: '',
                validation:{
                    require: true
                },
                valid: false
            }
        }
    }

    updateForm(element,content=''){
        const newFormData = {...this.state.formdata};
        const newElement = {...newFormData[element.id]};
        
        if(content==='') {
            newElement.value = element.event.target.value;
        } else {
            newElement.value= content;
        }
        
        
        let validData = validate(newElement);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];        

        newFormData[element.id] = newElement;

        this.setState({
            formError: false,
            formdata: newFormData
        })
    }

    successForm = (message) => {
        this.setState({
            formSuccess: message
        });
        setTimeout(()=> {
            this.setState({
                formSuccess: ''
            });
        },2000)
    }

    submitForm(event){
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for(let key in this.state.formdata) {
            dataToSubmit[key] = this.state.formdata[key].value;

            formIsValid = this.state.formdata[key].valid && formIsValid;

        }
        
        
        if(formIsValid) {
    
            if(this.state.formType==='Edit player'){
                firebaseDB.ref(`players/${this.state.playerId}`)
                .update(dataToSubmit).then(()=>{
                    this.successForm('Update correctly');
                }).catch(e => {
                    this.setState({
                        formError: true
                    })
                })

            } else {            // neu add player ms
                firebasePlayers.push(dataToSubmit).then(()=>{
                    this.props.history.push('/admin_players')
                }).catch(e => {
                    this.setState({formError: true})
                })
            }
            
            

        } else {
            this.setState({
                formError: true
            })
            
        }
    }

    successForm(message){
        this.setState({
            formSuccess: message
        });

        setTimeout(()=>{
            this.setState({
                formSuccess: ''
            });
        },2000)
    }


    updateFields = (player, playerId, formType, defaultImg) => {
        const newFormdata = {...this.state.formdata};

        for(let key in newFormdata) {
            newFormdata[key].value=player[key];
            newFormdata[key].valid = true;

        }

        this.setState({
            playerId,
            defaultImg,
            formType,
            formdata: newFormdata


        })
    }

    componentDidMount(){
        const playerId = this.props.match.params.id;

        if(!playerId) {
            this.setState({
                formType: 'Add Player'
            });
        } else {

            firebaseDB.ref(`players/${playerId}`).once('value')
            .then((snapshot)=> {
                const playerData = snapshot.val();      //co duoc player do

                firebase.storage().ref('players')           //de lay duoc url cua anh player do
                .child(playerData.image).getDownloadURL()
                .then(url => {
                    this.updateFields(playerData,playerId,'Edit player',url);
                }).catch(e => {
                    this.updateFields({
                        ...playerData,
                        image: ''
                    },playerId,'Edit player','');

                })
                
            })
        }
        
    }


    resetImage = () => {
        const newFormdata = {...this.state.formdata};
        newFormdata['image'].value = '';
        newFormdata['image'].valid = false;
        this.setState({
            defaultImg: '',
            formdata: newFormdata
        })
    }

    storeFilename = (filename) => {
        this.updateForm({id: 'image'},filename)
    }

    render() {
        return (
            <AdminLayout>
                <div className="editplayers_dialog_wrapper">
                    <h2>
                        {this.state.formType}
                    </h2>
                    <div>
                        <form onSubmit={(event)=>{this.submitForm(event)}}>

                            <Fileuploader 
                                dir='players'                       //store to directory player in storage firebase
                                tag={"Player image"}
                                defaultImg={this.state.defaultImg}
                                defaultImgName={this.state.formdata.image.value}  //để render cái ảnh có rồi (không cần upload)
                                resetImage={()=>this.resetImage()}      //hàm này remove ảnh và về lại import ảnh
                                filename={(filename)=>this.storeFilename(filename)}     //de luu ten file vao value
                            />

                            <FormField 
                                id={'name'}
                                formdata={ this.state.formdata.name}
                                change={(element)=>this.updateForm(element)}
                            
                            />
                            
                            <FormField 
                                id={'lastname'}
                                formdata={ this.state.formdata.lastname}
                                change={(element)=>this.updateForm(element)}
                            
                            />

                            <FormField 
                                id={'number'}
                                formdata={ this.state.formdata.number}
                                change={(element)=>this.updateForm(element)}
                            
                            />

                            <FormField 
                                id={'position'}
                                formdata={ this.state.formdata.position}
                                change={(element)=>this.updateForm(element)}
                            
                            />
                            <div className="success_label">{this.state.formSuccess}</div>

                            {this.state.formError ? 
                                <div className="error_label">Something is wrong</div>
                                :''
                            }
                            <div className="admin_submit">
                                <button onClick={event => {this.submitForm(event)}}>
                                    {this.state.formType}
                                </button>
                            </div>


                        </form>
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

export default AddEditPlayers;