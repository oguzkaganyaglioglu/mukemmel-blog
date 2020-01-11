import React, { Component } from 'react'
import Login from './login'
import Register from './register'

export class LogReg extends Component {
    render() {
        return (
            <div>
                <div className="log-reg"><Login/></div>
                <div className="log-reg"><Register/></div>
            </div>
        )
    }
}

export default LogReg
