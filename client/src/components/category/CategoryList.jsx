import React, {Component} from 'react';
import {List} from "antd";

class CategoryList extends Component {
    render() {
        return (
            <List
                className={'col-lg-3 col-md-3 col-sm-12 mr-0'}
                style={{minHeight:'100vh', height:'100%'}}
                size="large"
                header={<div className={'h6'}>About Us</div>}
                bordered
                dataSource={["We are group 13. A team full of collaboration and energy, where unique becomes unification."]}
                renderItem={item => <h6 className={'mt-2'}>{item}</h6>}
            />
        );
    }
}

export default CategoryList;
