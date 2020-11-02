import React from 'react';
import axios from 'axios';
import './style.css';
const server='http://localhost:8000/api/account/';
class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            accounts:[],
            editRow:-1,
            username:'',
            password:'',
            name:'',
            email:'',
            id:''
        };
        this.onDeleteClick=this.onDeleteClick.bind(this);
        this.onClickEdit=this.onClickEdit.bind(this);
        this.onChangeUsername=this.onChangeUsername.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.onChangeName=this.onChangeName.bind(this);
        this.onChangeEmail=this.onChangeEmail.bind(this);
        this.onSubmitEdit=this.onSubmitEdit.bind(this);
    }
    componentDidMount() {
        axios.post(server)
            .then(response => {
                // if(!response.data.isLogin)
                //     this.props.history.push('/signin');
                this.setState({'accounts': response.data.account_list});
            })
            .catch(error => console.log(error));
    }
    componentWillUnmount() {
       // console.log(this.state.account_list);
    }
    onChangeUsername(event){
        this.setState({username:event.target.value});
    }
    onChangePassword(event){
        this.setState({password:event.target.value});
    }
    onChangeName(event){
        this.setState({name:event.target.value});
    }
    onChangeEmail(event){
        this.setState({email:event.target.value});
    }
    onClickEdit(item,index){
        this.setState({editRow:index,name:item._source.name,username:item._source.username,
            password:item._source.password,id:item._id,email:item._source.email});
    }
    onSubmitEdit(){
        axios.post(`${server}update`, {
            id:this.state.id,
            name: this.state.name,
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            type: 2
        })
            .then(response => {
                this.setState({accounts: response.data.account_list,editRow:-1});
            }).catch(err => {
            console.log(err);
        });
    }
    onDeleteClick(id){
        console.log(id);
        axios.post(`${server}/delete?id=${id}`)
            .then(response=>{
                if(response.status===403)
                    alert("Some thing was wrong!!!");
                else
                    this.setState({accounts:response.data.account_list});
            })
            .catch(err=>{
                console.log(err);
            });
    }

    render(){
        return (
            <div className='ui grid column container-fluid'>
                <div className='row'></div>
                <div className='two wide column'></div>
                <div className='twelve wide column'>
                    <div className='row'><h1 style={{textAlign:"center"}}>ACCOUNT LIST</h1>
                        <a  href='/signup'><button className='ui green basic button' style={{float:"right"}}>
                            Add account &nbsp; <i className="plus icon"></i></button></a>
                    </div>
                    <table className="ui celled table green">
                        <thead >
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Type</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.state.accounts.map((item,index)=>index !== this.state.editRow?<tr key={index}><td>{item._id}</td>
                                    <td>{item._source.username}</td>
                                    <td>{item._source.password}</td>
                                <td>{item._source.name}</td>
                                    <td>{item._source.email}</td>
                                    <td>{item._source.type===1?'admin':'normal user'}</td>
                                    <td><a onClick={()=>{this.onDeleteClick(item._id)}} style={{color:'red'}}>
                                        <i className='x icon'></i></a> &nbsp;&nbsp;
                                        <i style={{color:'green'}} onClick={()=>{this.onClickEdit(item,index)}} className='pencil icon'></i>
                                    </td>
                                </tr>
                                :<tr key={item}>
                                    <td>{item.ID}</td>
                                    <td><input className='edit_input' type='text' name='username' value={this.state.username}
                                        onChange={this.onChangeUsername}/></td>
                                    <td>
                                        <input className='edit_input' type='text' name='password' value={this.state.password}
                                               onChange={this.onChangePassword}/>
                                    </td>
                                    <td>
                                        <input className='edit_input' type='text' name='name' value={this.state.name}
                                               onChange={this.onChangeName}/>
                                    </td>
                                    <td>
                                        <input className='edit_input' type='text' name='email' value={this.state.email}
                                               onChange={this.onChangeEmail}/>
                                    </td>
                                    <td>{item._source.type===1?'admin':'normal user'}</td>
                                    <td>
                                        <i style={{color:'green'}} onClick={()=>{this.onSubmitEdit()}} className='checkmark icon'></i>
                                    </td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Account;
