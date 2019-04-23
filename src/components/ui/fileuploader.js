import React, { Component } from 'react';

import {firebase} from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';    //cần thêm thư viện này

import CircularProgress from '@material-ui/core/CircularProgress';


class Fileuploader extends Component {

    state = {
        name: '',
        isUploading: false,
        fileURL: ''
    }

    static getDerivedStateFromProps(props, state){       //hàm này sẽ dựa vào props mà thay đổi state, gửi dữ liệu từ props cho state
        if(props.defaultImg) {
            return state ={ 
                name: props.defaultImgName,
                fileURL: props.defaultImg
            }
        }
        
        
        return null;
    }

    handleUploadStart = () => {
        this.setState({
            isUploading: true
        })
    }

    handleUploadError = () => {
        this.setState({
            isUploading: false
        })
    }
    handleUploadSuccess = (filename) => {           // firebase se tra ve filename cho ta
        
        this.setState({
            name: filename,
            isUploading : false
        })

        firebase.storage().ref(this.props.dir)
        .child(filename).getDownloadURL()
        .then(url => {
            
            this.setState({
                fileURL: url
            })
        })

        this.props.filename(filename);
    }

    uploadAgain =()=>{
        this.setState({
            name: '',
            isUploading: false,
            fileURL: ''
        });
        this.props.resetImage();
    }
    render() {
        return (
            <div>
                {
                    !this.state.fileURL ?
                        <div>
                            <div className="label_inputs">{this.props.tag}</div>
                            <FileUploader 
                                accept="image/*"    //loai file
                                name="image"        //ten, image nay chi la mac dinh thoi
                                randomizeFilename       // tao ten random
                                storageRef ={firebase.storage().ref(this.props.dir)}     //luu vao dir cua storage
                                onUploadStart={this.handleUploadStart}
                                onUploadError={this.handleUploadError}
                                onUploadSuccess={this.handleUploadSuccess}
                            />
                        </div>
                    :null       //cho nay co the de hien thi anh da co
                }
                {
                    this.state.isUploading?

                        <div className="progress" style={{textAlign: 'center', margin: '30px 0'}}>
                            <CircularProgress 
                                style={{color: '#98c6e9'}}
                                thickness={7}
                            />
                        </div>
                    :null
                }
                {
                    this.state.fileURL?
                    <div className="image_upload_container">
                        <img src={this.state.fileURL} alt={this.state.name} style={{
                            width: '100%'
                        }}/>
                        <div className="remove" onClick={()=>this.uploadAgain()}>
                            Remove
                        </div>
                    </div>
                    :null
                }
            </div>
        );
    }
}

export default Fileuploader;