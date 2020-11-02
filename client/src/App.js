import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Account from './components/account/account';
import SignIn from "./components/signin/signin";
import SignUp from "./components/signup/signup";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state={username:"",password:"",loadLoginPage:false};
        if(this.props.location.pathname==='/') {
            this.props.history.push('/signin');
        }
    }
    componentDidMount(){

    }
     render(){
         return  (
             <Router>
                         <Route path="/signup" component={SignUp} />
                         <Route exact path="/signin" component={SignIn}/>
                         <Route path="/account" component={Account}/>
             </Router>
         );
     }
}
// class Home extends React.Component{
//     render(){
//         return (
//             <h2>Home page</h2>
//         )
//     }
// }

export default App;
