import React, {Component} from 'react';
import pets from '../img/pets.jpeg';

class About extends Component{


    render(){
        return(
            <div>
                <h2>About</h2>
                <div id="aboutContent">
                    <p>
                        This is a pet store management system to keep track of 
                        the animals currently available to customers. 
                        It keeps track of the type of animal, description, age and price. 
                        Functions include searching for a specific pet as well as editing 
                        pet information, deleting pet records and creating new pet records.
                    </p>
                    <img src={pets} alt="pets"/>
                </div>
            </div>
        );
    }

}

export default About;