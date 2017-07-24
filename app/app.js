import React from 'react'
import ReactDOM from 'react-dom'
import {getRoutes} from './config/routes'
import {customHistory} from './config/customHistory'


var App = React.createClass({
    render: function () {
        return (getRoutes(customHistory));
    }
});

ReactDOM.render(<App/>,  document.getElementById("app"));
