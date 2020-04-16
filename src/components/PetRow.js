import React, {Component} from 'react';

class PetRow extends Component{


    render() {

        const{id,animal,description,age,price} = this.props;

        return(
            <tr>
                <td>{animal}</td>
                <td>{description}</td>
                <td>{age}</td>
                <td>{price}</td>
            </tr>   
        );
    }

}

export default PetRow;