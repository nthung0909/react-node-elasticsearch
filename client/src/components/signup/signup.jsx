import React from "react";
const axios=require('axios');
const server='http://localhost:8000/api/account/';

class SignUp extends React.Component {
    constructor(props) {
        super(props);this.state={
            isSuccess:false,
            accounts:[],
            name: '',
            username: '',
            password: '',
            email: '',
            type: 2
        }
        this.onSignup=this.onSignup.bind(this);
        this.onFullnameChange=this.onFullnameChange.bind(this);
        this.onUsernameChange=this.onUsernameChange.bind(this);
        this.onPasswordChange=this.onPasswordChange.bind(this);
        this.onEmailChange=this.onEmailChange.bind(this);
    }
    componentDidMount() {
        axios.post(server)
            .then(response => {
                this.setState({'accounts': response.data.account_list});
                console.log(this.state.accounts);
            })
            .catch(error => console.log(error));
    }

    onSignup(event){
        var acc= this.state.accounts.find(item=>{
            return item.username===this.state.username;
        });
        if(acc){
            alert("Account exitst!!!");
            return event.preventDefault();
        }else {
            axios.post(`${server}add`, {
                    name: this.state.name,
                    username: this.state.username,
                    password: this.state.password,
                    email: this.state.email,
                    type: 2
                })
                .then(response => {
                    this.setState({accounts: response.data.acount_list});
                }).catch(err => {
                    console.log(err);
                });
        }
        this.props.history.push('/account');
        return event.preventDefault();
    }
    onFullnameChange(event){
        this.setState({name:event.target.value});
    }
    onUsernameChange(event){
        this.setState({username:event.target.value});
    }
    onPasswordChange(event){
        this.setState({password:event.target.value});
    }
    onEmailChange(event){
        this.setState({email:event.target.value});
    }
    render( ) {
        return (
            <div className='ui grid three column container-fluid' >
                <div className='row'></div>
                <div className='row'></div>
                <div className='row'></div>

                <div className='column'>

                </div>
                <div className='column' style={{backgroundColor:'#CCE2FF',margin:'4px'}}>
                    <div className='row'>
                        <h1 style={{textAlign:"center"}}>Sign up</h1>
                    </div>
                    <br/>
                    <form id="signinForm" className='ui large form'  onSubmit={this.onSignup}>
                        <div className='field'>
                            <label>Fullname: </label>
                            <input required type="text" name="name" value={this.state.name} onChange={this.onFullnameChange}/>
                        </div>
                        <div className='field'>
                            <label>Username: </label>
                            <input required type="text" name="username" value={this.state.username} onChange={this.onUsernameChange}/>
                        </div>
                        <br />
                        <div className='field'>
                            <label>Password: </label>
                            <input required type="password" name="password" value={this.state.password} onChange={this.onPasswordChange}/>
                        </div>
                        <div className='field'>
                            <label>Email: </label>
                            <input required type="email" name="email" value={this.state.email} onChange={this.onEmailChange}/>
                        </div>
                        <br/>
                        <button className='ui primary button' type="submit" >Sign up</button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;have an account? <a href="/signin">Sign in</a>
                    </form>
                </div>
                <div className='column'>

                </div>
            </div>
        );
    }
}
export default SignUp;