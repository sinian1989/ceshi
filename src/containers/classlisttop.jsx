import React from 'react';
import Defaultlist from '../components/list';
export default class Classlisttop extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps != this.props;
    }
    render() {
        const {params:{uid}} = this.props;
        return(
            <div className="classlist main" style={{paddingTop: 0}}>
                <Defaultlist uid={uid} />
            </div>
        )
    }
}