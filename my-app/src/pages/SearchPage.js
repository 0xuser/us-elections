import React, {Component} from 'react';
import '../sass/SearchPage.sass';

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount(){
        fetch(`${this.props.path}api/getTrackedSearches`)
        .then(resp => resp.json())
        .then(data => this.setState({data: data}))
    }

    render(){
        const singleLink = this.state.data.map((single => <li key={single.table_name} className="search__singleItem">{single.search}</li>))
        return (
            <div className="main__searchPage search">
                <h2 className="search__title">Wyszukiwania, które śledzimy</h2>
                <ul className="search__list">
                    {this.state.data.length !== 0 ? 
                        singleLink
                    : ""}
                </ul>
            </div>
        )
    }
}
 
export default SearchPage;