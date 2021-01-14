import React, {Component} from 'react';
import axios from "axios";
import variables from "../../localVariables";
import LoginPage from "../login/LoginPage";
import {Avatar, List, Button, Tabs, Skeleton} from "antd";
import localVariables from "../../localVariables";
import UserList from "../listItems/UserList";
import MovieList from "../listItems/MovieList";

const { TabPane } = Tabs;
class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: localStorage.getItem("isLogged"),
            userData: null,
            userId: localStorage.getItem("id"),
            history: {},
            movies: [],
            render:false,
            type: '',
            userList: {}
        }
        this.fetchUser = this.fetchUser.bind(this);
        this.fetchHistory = this.fetchHistory.bind(this);
        this.changeUserType = this.changeUserType.bind(this);
        this.fetchMovies = this.fetchMovies.bind(this);
        this.fetchUserList = this.fetchUserList.bind(this)
    }


    async fetchUser() {
        let userId = this.state.userId;
        let config = {
            headers: {'user': 'JWT '},
            params: {
                id: userId,
            },
        }

    await axios.get(variables.userUrl, config).then(res => {
            if (res.data.data.length > 0) {
                this.setState({userData: res.data.data[0]})
            }
        })
    }
    async fetchUserList(){
        await axios.get(variables.userList).then(res => {
            if (res.data.data.length > 0) {
                this.setState({userList: res.data.data})
            }
        })
    }


    async fetchHistory(){
        let userId = this.state.userId;
        let config = {
            headers: {'history': 'history'},
            params: {
                id:userId
            }
        }
        await axios.get(variables.historyUrl, config).then(res => {
            if (res.data.data.length > 0|| res !== null){
                this.setState({history: res.data.data})
            }
        })

    }
    changeUserType(){
        const type = this.state.userData.type;
        if(type === 99){
           this.setState({type: 'admin'})
        }
        if (type===1){
            this.setState({type: 'user'})
        }

    }

    fetchMovies() {
        axios.get(variables.url).then(r => {
            this.setState({movies: r.data.data})
        })
    }



    async componentDidMount() {
        if (this.state.isLogged) {
           await this.fetchUser();
            await this.fetchHistory();
            if (this.state.userData.type===99){
                await this.fetchMovies();
                await this.fetchUserList();
            }
            this.setState({render:true});
            this.changeUserType();
        }
    }



    componentWillUpdate(nextProps, nextState, nextContext) {
        if (this.state.userData !== nextState.userData) {
            this.setState({userData: nextState.userData})
        }

    }

    dateString(targetTime){
        targetTime = new Date(targetTime)
        return targetTime.getHours() + ':' + targetTime.getMinutes() + ':' + targetTime.getSeconds() + ' ' +
            targetTime.getDate() + '-' + targetTime.getMonth() + 1 + '-' + targetTime.getFullYear()
    }

    render() {
        // const name = this.state.userData.name;
        let container = <div> </div>
        console.log(this.state.userList)
        const arr = ["User List", "Movie List"]
        if (this.state.render){
            const dataSource = {
                "User List":  this.state.userList,
                "Movie List":  this.state.movies,

        }
            console.log(this.state.movies)
            const name = this.state.userData.name;
            const data = this.state.history;
            container=
                <div className={'row'}>
                    <div className={'col-lg-4 col-md-4 col-sm-12 bg-light'}
                         style={{minHeight: '100vh', height:'100%', display: "flex", flexFlow: 'column nowrap',alignItems:'center'}}>
                        <h3> User Profile </h3>
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style={{width:'100px', height:'100px'}} />
                        <h5> {name} </h5>
                    </div>

                    { this.state.type === 'user' ?  <div className={'col-lg-8 col-md-8 col-sm-12'}>
                        <h3 className={''}> Booking History </h3>
                        <div>
                            <List
                                itemLayout="horizontal"
                                dataSource={data}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.image}/>}
                                            title={<a className={'d-table'}
                                                      href="https://ant.design">{item.title}</a>}
                                            description={<div><h6> You have booked {item.count} tickets for the
                                                film {item.name} on {this.dateString(item.starting_time)}</h6>
                                                <h6> Total Price: {item.count * item.price}$ </h6>
                                                <Button> Pay </Button></div>}
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div> : null
                    }
                    {
                        this.state.type==='admin' ?
                            <div className={'col-lg-8 col-md-8 col-sm-12'}>
                            <Tabs centered defaultActiveKey="1" tabPosition={'top'}>
                                {arr.map(i => (
                                    <TabPane tab={`${i}`} key={i}  className={'container-fluid '}>
                                        <List
                                            bordered
                                            className="demo-loadmore-list pr-3"
                                            itemLayout="horizontal"
                                            dataSource={dataSource[i]}
                                            renderItem={item => (
                                                i === "Movie List" ?
                                                <UserList item={item}/> : <MovieList  item={item}/>
                                            )}
                                        />
                                    </TabPane>
                                ))}
                            </Tabs>
                            </div>
                            : null
                    }
                </div>

        }
        return (
            this.state.isLogged ?
          container : <LoginPage/>
        );
    }
}

export default UserProfile;
