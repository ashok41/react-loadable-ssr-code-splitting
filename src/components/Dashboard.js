import React from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUsers } from '../actions';
import { config } from './utils/config';
//import "./dashboard.css"

class Dashboard extends React.Component {
	constructor(props) {
	  	super(props);
		this.user = null;
    	props.getUsers();
		this.state = { selectedFiles: [], message: null};
		this.file = null;
		this.setFileRef = node => {
			this.file = node;
		}
  	}

  	componentWillUpdate(newProps) {
  		this.user = newProps.users;
  	}
	
	logout = () => {
		localStorage.removeItem('username');
		this.props.history.push('login');
	}
	
	handleselectedFile = event => {
		this.setState({
		  selectedFile: event.target.files[0]
		})
	}
	
	removeFile = index => () => {
		this.setState(prevState => ({
			selectedFiles: prevState.selectedFiles.filter(el => el !== index)
		}))
	}
	
	selectImages = (event) => {
		//let images = [];
		const files = event.target.files[0];
		/*console.log('f', files);
		for (var i = 0; i < files.length; i++) {
			images.push(files[i]);
		}*/
		//images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/))
		//let message = `${images.length} valid image(s) selected`
		//this.state.selectedFiles.push(files);
		this.file.value = "";
		this.setState(prevState => ({
			selectedFiles: [
				...prevState.selectedFiles, files
			]
		}))
	}
	
	uploadImages = () => {
		const uploaders = this.state.selectedFiles.map(file => {
			const data = new FormData();
			data.append("file", file, file.name);
			return axios
			  .post(config.baseUrl + 'files/upload', data)
			  .then(res => {
				if(res.status === 200) {
					
				}
			  })
		});
		// Once all the files are uploaded 
		axios.all(uploaders).then(() => {
			this.setState(prevState => ({
				selectedFiles: [],
				message: "Uploaded successfully"
			}))
		}).catch(err => alert(err.message));
	}
	  
	handleUpload = () => {
		const data = new FormData()
		data.append('file', this.state.selectedFile, this.state.selectedFile.name)

		axios
		  .post(config.baseUrl + 'files/upload', data, {
			onUploadProgress: ProgressEvent => {
			  this.setState({
				loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
			  })
			},
		  })
		  .then(res => {
			if(res.status === 200) {
				this.setState({
					selectedFile: null,
					loaded: 0
				})
			}
		  })

	}

  	render () {
		console.log(this.state.selectedFiles);
		if(this.user) {
			return (
				<div>
					<h1>Hi, {this.user.firstname} {this.user.lastname}</h1>
					<div className="lists">Users Information</div>
					<div>Gender: {this.user.gender}</div>
					<div>Country: {this.user.country}</div>
					<div className="upload-form-box">
						<h3>Multiple files upload</h3>
						<div>
							<input type="file" ref={this.setFileRef} onChange={this.selectImages} />
							<button onClick={this.uploadImages}>Upload</button>
						</div>
						{this.state.selectedFiles.length > 0 &&
							<div className="file-items-box">
							{
								this.state.selectedFiles.map((file,index) => (
									<div className="file-item" key={index}>{file.name} <span className="remove-icon" onClick={this.removeFile(file)}>x</span></div>
								))
							}
							</div>
						}
						{this.state.message &&
							<div className="success">{this.state.message}</div>
						}
					</div>
					<div className="logout" onClick={this.logout}>Logout</div>
				</div>
			);
		} else {
			return null;
		}
	}
}

const mapStateToProps = (state) => ({
  users: state.reducers.users
})

const mapDispatchToProps = {
  getUsers
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard))
