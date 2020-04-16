import React, {Component} from 'react';
import PetRow from "./PetRow"
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link,
//     useParams
//   } from "react-router-dom";


class Search extends Component{


    componentDidMount(){
        // if(this.props.match.params.someid.trim().length !== 0)
        // {
        //     this.props.search(this.props.match.params.someid);
        //     console.log('TESTING')
        // }
        // else{
        //     console.log("empty")
        //     this.props.search("");
        // }
        this.props.search(this.props.match.params.someid);
            console.log('TESTING')
        console.log(this.props.match.params)
        
    }

    handleChangeSearch(e){
        console.log(e.target.value);
        this.props.search(e.target.value.toLowerCase());
    } 

    render(){
        return(
            <div>
                <h2>Search</h2>
                <div id="searchContent">
                    <input type="text" onChange={this.handleChangeSearch.bind(this)} value={this.props.searchValue} placeholder="search here"></input>
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

export default Search;

// .filter(
//     (pet) => {
//         if((!pet.animal.toLowerCase().includes(this.props.searchValue)) 
//         && (!pet.description.toLowerCase().includes(this.props.searchValue) ) ){
//             return false;
//         }
//         return true;
//     })