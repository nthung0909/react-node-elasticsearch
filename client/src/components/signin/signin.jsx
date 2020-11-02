import React from "react";
const axios=require('axios');
const server='http://localhost:8000/api/';

class SignIn  extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            accounts:[],
            username:'',
            password:''
        };
        this.onChangeUsername=this.onChangeUsername.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.onLogin=this.onLogin.bind(this);
       // this.onResetPassword=this.onResetPassword.bind(this);
    }
    componentDidMount() {
        axios.post(`${server}account`)
            .then(response => {
                this.setState({'accounts': response.data.account_list});
                console.log(this.state.accounts);
            })
            .catch(error => console.log(error));
    }
    onChangeUsername(event){
        this.setState({username:event.target.value});
    }
    onChangePassword(event){
        this.setState({password:event.target.value});
    }
    // onResetPassword(event){
    //     event.reset();
    // }
    onLogin(event){
        var acc= this.state.accounts.find(item=>{
            return item._source.username===this.state.username && item._source.password===this.state.password;
        });
        // axios.post(`${server}session/`,{
        //     username: this.state.username,
        //     password: this.state.password
        // })
        //     .then(response => {
        //         this.setState({'accounts': response.data.account_list});
        //         console.log(this.state.accounts);
        //     })
        //     .catch(error => console.log(error));
        if(!acc){
            event.preventDefault();
            alert("Username or password is invalid!!!");
        }else{
            this.props.history.push('/account');
            event.preventDefault();
        }
    }

    render() {
        return (
            <div className='ui grid three column container-fluid' >
                <div className='row'></div>
                <div className='row'></div>
                <div className='row'></div>
                <div className='row'></div>

                <div className='column'>

                </div>
                <div className='column' style={{backgroundColor:'#CCE2FF',margin:'4px'}}>
                    <div className='row'>
                        <h1 style={{textAlign:"center"}}>Sign in</h1>
                    </div>
                    <br/>
                    <form id="loginform" className='ui large form' onSubmit={this.onLogin} >
                        <div className='field'>
                            <label>Username: </label>
                            <input required type="text" name="username" value={this.state.username}
                                   onChange={this.onChangeUsername}/>
                        </div>
                        <br />
                        <div className='field'>
                            <label>Password: </label>
                            <input required type="password" name="password" value={this.state.password}
                                   onChange={this.onChangePassword}/>
                        </div>
                        <br/>
                        <button className='ui primary button' type="submit" >Login</button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Don't have account? <a href="/signup">Register</a>
                    </form>
                </div>
                <div className='column'>

                </div>
            </div>

        );
    }
}

export default SignIn;