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
        let size = this.state.movies.length;
        let data = this.state.movies;
        let arrCarousel = [];
        for (let i = size -1; size > this.state.movies.length - 4; size--){
               if (i >= 0 ){
                   arrCarousel.push(data[i])
               }
        }
        arrCarousel.map(item => {
            const contentStyle = {
                height: '190px',
                color: '#fff',
                lineHeight: '190px',
                textAlign: 'center',
                background: "url('" + item.image  +"'"}

            this.setState({arrCarouselItems: [...this.state.arrCarouselItems] + ( <div>
                    <h3 style={contentStyle} > {data.name}</h3>
                </div>) })
        })
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (this.props.movies !== nextProps.movies || this.state.movies.length===0){
            this.setState({
                movies: nextProps.movies,
                render: true
            })
            let size = nextProps.movies.length;
            let data = nextProps.movies;
            for (let i = size -1; i > nextProps.movies.length - 4 && i >= 0; i--){
                const contentStyle = {
                    height: '190px',
                    color: 'black',
                    lineHeight:'190px',
                    textAlign: 'center',
                    background: "url('" + data[i].image  +"'"}

                this.setState({arrCarouselItems: [ [...this.state.arrCarouselItems], <div>
                        <h3 style={contentStyle}  > {data[i].name}</h3>
                    </div>] })

            }
        }
    }


    render() {
        let renderContainer = <div> </div>;
        if (this.state.render){
            renderContainer =( <Carousel style={{height: '200px'}} dotPosition={"Bottom"} autoplay>
                {this.state.arrCarouselItems}
            </Carousel>)
        }
        return (
            renderContainer
        );
    }
}

export default HomePageCarousel;
