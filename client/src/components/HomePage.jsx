import React, {Component} from 'react';
import {Carousel, List} from "antd";
import CardView from "./CardView/CardView";
import ListCard from "./CardView/ListCard";
import axios from "axios";
import variables from "../localVariables";
import HomePageCarousel from "./carousel/HomePageCarousel";
import CategoryList from "./category/CategoryList";
class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: {},
            render: false
        }
        this.fetchMovies = this.fetchMovies.bind(this)
    }

    fetchMovies() {
        axios.get(variables.url).then(r => {
            const data = r.data.data
            this.setState({movies: data})
        })
    }

    async componentDidMount() {
        await this.fetchMovies();
        this.setState({render:true})
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (this.state.movies !== nextState.movies && nextState.movies !== null) {
            this.setState({movies: nextState.movies});
        }
    }


    render() {

        const categories = ['Horror', 'Romance', "Action", "Comedy", "Drama", "Fantasy", "Mystery", "Thriller"]
        let container = <div> </div>;
        if (this.state.render){
            container =  ( <div className={'container-fluid'}>
                <HomePageCarousel movies={this.state.movies}/>
                <div className={'container-fluid row'}>
                    <CategoryList/>
                    <div className={"col-lg-9 col-md-9 col-sm-12"}>
                        <ListCard movies={this.state.movies}/>
                    </div>
                </div>
            </div>)

        }
        return (
          container
        );
    }
}

export default HomePage;
