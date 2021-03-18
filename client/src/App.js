import './App.css';
import LoginPage from "./components/login/LoginPage";
import { Router } from "@reach/router";
import React from "react"
import RegisterPage from "./components/login/RegisterPage";
import Navigation from "./navigation";
import HomePage from "./components/HomePage";
import UserProfile from "./components/profile/UserProfile";
import {Component} from "react";
import CardDetail from "./components/CardView/CardDetail";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
            currentUser: null,
            userList: {},
            movies: {}
        }
        this.handleChangeLoggedState = this.handleChangeLoggedState.bind(this);
        this.handleChangeLogged = this.handleChangeLogged.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleCurrentUser = this.handleCurrentUser.bind(this);
        this.setUserList = this.setUserList.bind(this);
        this.setMovieList = this.setMovieList.bind(this);
    }
    handleChangeLoggedState(){
        if (localStorage.getItem("isLogged") === 'true'){
            this.setState({isLogged: true})
        }
    }

    handleCurrentUser(condition, data){
        if (condition===true){
            this.setState({currentUser:data })
        }
        else {
            this.setState({currentUser: null})
        }
    }

    handleChangeLogged(){
        localStorage.setItem("isLogged", 'true');
        this.setState({isLogged: true})
    }


    handleLogout(){
        localStorage.setItem("isLogged", 'false');
        this.setState({isLogged: false});
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextState.currentUser !== this.state.currentUser){
            this.setState({currentUser: nextState.currentUser}) ;
        }
    }
    componentDidMount() {
        this.handleChangeLoggedState();
    }
    setUserList(data){
        this.setState({
            userList:data
        })
    }
    setMovieList(data){
        this.setState({
            movies: data
        })
    }

    render() {
        return (
            <div className={'App'}>
                <Navigation isLogged={this.state.isLogged} handleLogout={this.handleLogout} />
                <Router>
                    <HomePage setMovieList={this.setMovieList} path={'/'}/>
                    <LoginPage  path={"/login"} handleChangeLogged={this.handleChangeLogged} handleCurrentUser={this.handleCurrentUser}/>
                    <RegisterPage path={"/register"}/>
                    <UserProfile movies={this.state.movies} path={"/user/:userId"} currentUser={this.state.currentUser}/>
                    <CardDetail path={"/movie/:id"}/>
                </Router>
            </div>
        );
    }
}

export default App;





