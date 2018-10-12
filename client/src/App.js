import React, { Component } from 'react';
import axios from 'axios'

class App extends Component {

    componentDidMount () {
        axios.get('/api/products/get_brands').then(response => {
            console.log(response)
            console.log('Awyis')
        })
    }

    render() {
        return (
            <div>
                My App
            </div>
        );
    }
}

export default App;