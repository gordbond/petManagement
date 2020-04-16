import React, {Component} from 'react';
import PetRowButtons from "./PetRowButtons";
import cancel from '../img/cancel.png';
import check from '../img/check.png';

class Edit extends Component{

    componentDidMount(){
        console.log("DID MOUNT IN EDIT "+this.props.inventory);
        this.props.getAll()
    }

    handleAdd(){
        this.props.handleAdd()
    }

    handleConfirm(e){
        this.props.handleConfirm(e.target.title);
    }



    handleChangeProp(e){
        console.log(e.target.value)
        this.props.changeProp({val: e.target.value, title: e.target.title});
    }

    render(){
        if(!this.props.addMode){
            return(
                <div>
                    <h2>Edit</h2>
                    <div id="editContent">
                        <table>
                                <thead>
                                <tr>
                                    <th>Animal</th>
                                    <th className="biggerCol">Description</th>
                                    <th>Age</th>
                                    <th>Price</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {this.props.inventory.map(
                                        (row) => <PetRowButtons 
                                            {...row} 
                                            key={row.id.toString()}
                                            deleteClickHandler = {this.props.deleteClickHandler}
                                            editClickHandler = {this.props.editClickHandler}
                                            changeProp = {this.props.changeProp}
                                            animalEdit = {this.props.animalEdit}
                                            descEdit = {this.props.descEdit}
                                            ageEdit = {this.props.ageEdit}
                                            priceEdit = {this.props.priceEdit}
                                            handleConfirm = {this.props.handleConfirm}
                                            handleCancel = {this.props.handleCancel}
                                            addMode = {this.props.addMode}
                                            //editMode = {this.props.editMode}
                                            />
                                    )} 
                                </tbody>
                            </table>
                            <input type="button" value="Add New Pet" onClick={this.handleAdd.bind(this)}></input>
                        </div>
                </div>
            );
        }else{
            return(
                <div>
                    <h2>Edit</h2>
                    <div id="editContent">
                        <table>
                                <thead>
                                <tr>
                                    <th>Animal</th>
                                    <th className="biggerCol">Description</th>
                                    <th>Age</th>
                                    <th>Price</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {this.props.inventory.map(
                                        (row) => <PetRowButtons 
                                            {...row} 
                                            key={row.id.toString()}
                                            deleteClickHandler = {this.props.deleteClickHandler}
                                            editClickHandler = {this.props.editClickHandler}
                                            changeProp = {this.props.changeProp}
                                            animalEdit = {this.props.animalEdit}
                                            descEdit = {this.props.descEdit}
                                            ageEdit = {this.props.ageEdit}
                                            priceEdit = {this.props.priceEdit}
                                            handleConfirm = {this.props.handleConfirm}
                                            handleCancel = {this.props.handleCancel}
                                            //editMode = {this.props.editMode}
                                            />
                                    )}
                                    <tr>
                                        <td><input title ="animal" className="tableInput" type="text" onChange={this.handleChangeProp.bind(this)} value={this.props.animalEdit} placeholder="animal"></input></td>
                                        <td><input title="description" className="tableInput" type="text" onChange={this.handleChangeProp.bind(this)} value={this.props.descEdit} placeholder="description"></input></td>
                                        <td><input title="age" className="tableInput" type="text" onChange={this.handleChangeProp.bind(this)} value={this.props.ageEdit} placeholder="age"></input></td>
                                        <td><input title="price" className="tableInput" type="text" onChange={this.handleChangeProp.bind(this)} value={this.props.priceEdit} placeholder="price"></input></td>
                                        <td id="confirm">
                                            <img title="add" className="icon" src={check} onClick={this.handleConfirm.bind(this)}/>
                                        </td>
                                        <td><img className="icon" src={cancel} onClick={this.handleAdd.bind(this)}/></td>
                                    </tr>   
                                </tbody>
                            </table>
                            <input type="button"  value="Add New Pet" onClick={this.handleAdd.bind(this)}></input>
                        </div>
                </div>
            );
        }
    }

}

export default Edit;