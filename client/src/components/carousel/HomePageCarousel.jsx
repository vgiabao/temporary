import React, {Component} from 'react';
import {Carousel} from "antd";

class HomePageCarousel extends Component {
    constructor(props) {
        super(props);
        this.contentStyle = {
            height: '190px',
            color: '#fff',
            lineHeight: '190px',
            textAlign: 'center',
            background: '#364d79',
        }
        this.state = {
            arrCarouselItems: [],
            movies: [],
            render:false
        }
    }

    componentDidMount() {
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (this.props.movies !== nextProps.movies || this.state.movies.length===0){
            this.setState({
                movies: nextProps.movies,
                render: true
            })
            let size = nextProps.movies.length;
            let data = nextProps.movies;
            let arr = []
            for (let i = 0; i < 4; i++){
                const contentStyle = {
                    height: '190px',
                    color: 'white',
                    lineHeight:'190px',
                    textAlign: 'center',
                    background: "url('" + data[i].image,}
                    arr.push( <div>
                        <h3 style={contentStyle} className={'p-5 bg-dark'}  > {data[i].name}</h3>
                    </div>)
            }
            this.setState({arrCarouselItems: arr})
            console.log(this.state.arrCarouselItems)
        }
    }


    render() {
        let renderContainer = <div> </div>;
        if (this.state.render){
            renderContainer =( <Carousel centered style={{height: '200px'}} dotPosition={"Bottom"} autoplay>
                {this.state.arrCarouselItems}
            </Carousel>)
            console.log(this.state.arrCarouselItems)
        }
        return (
            renderContainer
        );
    }
}

export default HomePageCarousel;
