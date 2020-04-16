import React, {Component} from 'react';
import edit from '../img/icons8-edit-64.png';
import deleteIcon from '../img/icons8-trash-48.png';
import cancel from '../img/cancel.png';
import check from '../img/check.png';

class PetRow extends Component{

    handleEdit(data){
        if(data.editMode){
            return(

                this.props.editClickHandler({editMode:false, id:data.id})
            );
        }else{
        return(
            //this.props.editClickHandler({id: data.id})
            
            this.props.editClickHandler({editMode:true, id:data.id})
        );}
    }

    handleDelete(data){
        return(
            
            this.props.deleteClickHandler({id: data.id})
        );
    }

    handleChangeProp(e){
        console.log(e.target.value)
        this.props.changeProp({val: e.target.value, title: e.target.title});
    }

    componentDidMount(){
        //console.log(this.props.editMode)
    }

    handleConfirm(data){
        this.props.handleConfirm({id:data.id, title:'accept'});
    }

    handleCancel(){
        this.props.handleCancel();
    }

    render() {

        const{id,animal,description,age,price,editMode,} = this.props;
        console.log({editMode})
        
            
        
            if(!editMode){
                return(
                    <tr>
                        <td>{animal}</td>
                        <td>{description}</td>
                        <td>{age}</td>
                        <td>{price}</td>
                        <td><img className="icon" src={edit} onClick={this.handleEdit.bind(this,{editMode,id})}/></td>
                        <td><img className="icon" src={deleteIcon} onClick={this.handleDelete.bind(this,{id})}/></td>
                        
                    </tr>   
                    
                );
            }else{
                return(
                    <tr>
                        <td><input title ="animal" className="tableInput" type="text" onChange={this.handleChangeProp.bind(this)} value={this.props.animalEdit}></input></td>
                        <td><input title="description" className="tableInput" type="text" onChange={this.handleChangeProp.bind(this)} value={this.props.descEdit}></input></td>
                        <td><input title="age" className="tableInput" type="text" onChange={this.handleChangeProp.bind(this)} value={this.props.ageEdit}></input></td>
                        <td><input title="price" className="tableInput" type="text" onChange={this.handleChangeProp.bind(this)} value={this.props.priceEdit}></input></td>
                        <td id="confirm">
                            <div className="sbsButtons">
                            <img title="accept" className="icon" src={check} onClick={this.handleConfirm.bind(this,{id})}/>
                            </div>
                            <div className="sbsButtons">
                            <img className="icon" src={cancel} onClick={this.handleCancel.bind(this,{id})}/>
                            </div>
                            
                        </td>
                        <td><img className="icon" src={deleteIcon} onClick={this.handleDelete.bind(this,{id})}/></td>
                    </tr>   
                );
            }
        
    }

}

export default PetRow;