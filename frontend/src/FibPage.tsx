import React, { Component } from 'react';
import axios from 'axios';

class FibPage extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: ''
    }

    componentDidMount() {
        this.fetchValues()
        this.fetchIndexes()
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current')
        this.setState({values: values.data})
    }

    async fetchIndexes() {
        const seenIndexes = await axios.get('/api/values/all')
        this.setState({
            seenIndexes: seenIndexes.data
        })
    }

    handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()

        await axios.post('/api/values', {
            index: this.state.index
        })
    }

    readerSeenIndexxes() {
        return this.state.seenIndexes.map(({number}) => number).join(', ')
    }

    renderValues() {
        const entries = []
        for (let key in this.state.values) {
            entries.push(
                <div key={key}>
                    For index {key} I calculated
                </div>
            );
        }
    }

    render() {
        return (
            <div className="App">
                <form onSubmit={this.handleSubmit}>
                    <label>Enter your index:</label>
                    <input value={this.state.index}
                           onChange={event => this.setState({index: event.target.value})}/>
                    <button>Submit</button>
                </form>
                <h3>Indexes I have seen:</h3>
                {this.readerSeenIndexxes()}
                <h3>Caluculated Values:</h3>
                {this.renderValues()}
            </div>
        );
    }
}
export default FibPage