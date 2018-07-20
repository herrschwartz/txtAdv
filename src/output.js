import React, { Component } from 'react';

class Output extends Component{
    render(){
        return(
            <p className={this.props.cls}dangerouslySetInnerHTML={{__html: this.props.txt}}></p>
        );
    }
}

export default Output;