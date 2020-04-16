import React, {Component} from 'react';
import PetRow from "./PetRow"



class SearchAll extends Component{

    componentDidMount(){
        
        this.props.search("");

    }


    handleChangeSearch(e){
        this.props.search(e.target.value.toLowerCase());
    } 

    render(){
        
        return(
            <div>
                <h2>Search</h2>
                <div id="searchContent">
                    <input type="text" onChange={this.handleChangeSearch.bind(this)} placeholder="search here"></input>
                    {/* <p>{this.props.match.params.someid}</p> */}
                    <table>
                        <thead>
                        <tr>
                            <th>Animal</th>
                            <th className="biggerCol">Description</th>
                            <th>Age</th>
                            <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.props.inventory.map(
                                (row) => <PetRow 
                                    {...row} 
                                    key={row.id.toString()}
                                    />
                            )} 
                        </tbody>
                    </table>
                </div>
            </div>
            
        );
    }

}

export default SearchAll;