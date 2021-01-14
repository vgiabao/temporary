import React, {Component} from 'react';
import {List} from "antd";

class CategoryList extends Component {
    render() {
        const categories = ['Horror', 'Romance', "Action", "Comedy", "Drama", "Fantasy", "Mystery", "Thriller"]

        return (
            <List
                className={'col-lg-3 col-md-3 col-sm-12 mr-0'}
                style={{minHeight:'100vh', height:'100%'}}
                size="small"
                header={<div>Categories</div>}
                bordered
                dataSource={categories}
                renderItem={item => <List.Item>{item}</List.Item>}
            />
        );
    }
}

export default CategoryList;
