import React from 'react';
import './app.css'

class App extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {

            isLoginSuccess: false,
            isError: false,
            isLoading: false
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({isLoading: true});
        var loginData = {};
        loginData.email = this.refs.email.value.trim();
        loginData.password = this.refs.password.value.trim();

        window.$.post('https://httpbin.org/post', loginData, function (result) {
            console.log(result);
        })
            .then(data => {
                this.setState({isLoginSuccess: false, isError: true, isLoading: false}); //In this place we check data and change state
                                                                                         // if server response login Denied "isLoginSuccess: false)
                                                                                         // if server response Success "isLoginSuccess: true)
                                                                                         // if catch error "isError: true"
            })
            .catch(() => this.setState({isLoading: false}));
    }


    render() {
        const isLoginSuccess = this.state.isLoginSuccess;
        return (
            <div>
                {!isLoginSuccess && this.LoginForm()}
                {isLoginSuccess && App.SuccessLogin()}
            </div>
        );
    }

    LoginForm() {
        return (
            <div className='wrapper'>
                <Fire/>
                <form className="Login" onSubmit={this.handleSubmit}>
                    <br/><input className={this.state.isError && 'error'} type="text" name="email" placeholder="email" ref="email"/>
                    <br/><input type="password" name="password" placeholder="password" ref="password"/>
                    <br/>
                    <button  className = {this.state.isLoading ? 'button-cog' : 'button'} type="submit">Login <ArrowIcon/></button>
                </form>
                {this.Button()}
            </div>
        );
    };

    static SuccessLogin() { return (<div className="success"><span className="glyphicon glyphicon-ok"> </span> Successful logged</div>); };

    Button() { return ( <button className = {this.state.isLoading ? 'button-hide' : 'button-cog'}><span className="glyphicon glyphicon-cog"> </span></button>) };

}


const ArrowIcon = () => <span className="glyphicon glyphicon-arrow-right"> </span>
const Fire = () => <div className="fire"><span className="glyphicon glyphicon-fire"> </span> Login</div>



export default App;
