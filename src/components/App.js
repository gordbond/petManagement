// GORD BOND, 000786196

import React, {Component} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect
} from "react-router-dom";
import Home from './Home';
import About from './About';
import Search from './Search';
import SearchAll from './SearchAll';
import Edit from './Edit';
import logo from '../img/PMLogo.jpg';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state={
      inventory:[
      ],
      searchValue:'',
      animalEdit:'',
      descEdit:'',
      ageEdit:'',
      priceEdit:'',
      addMode: false
    };
  }
  
  componentDidMount(){
    //this.getAll();

  }

  getAll(){
    fetch("http://localhost:3001/api?act=getall")
    .then(res=>res.json())
    .then(
      (result)=> {
        this.setState(previousState => {
          return{
          inventory: result
          };
        });
      }
    ).then(()=>{
      let copy = this.state.inventory
      console.log(this.state.inventory)
      copy.forEach(function (element) {
        element.editMode = false;
      });
      console.log("copy")
      console.log(copy)
      this.setState({
        inventory: [...copy]
      })
      console.log(this.state.inventory)}
    )
     
  }

  handleSearch(data){
    let searchTerm = encodeURI(data)
    console.log(data)
    let URL= "http://localhost:3001/api?act=search&term=" + searchTerm
    fetch(URL)
    .then(res=>res.json())
    .then(
      (result)=> {
        this.setState(previousState => {
          return{
          inventory: result,
          searchValue: data
          };
        });
      }
    ).then(()=>{
      let copy = this.state.inventory
      console.log(this.state.inventory)
      copy.forEach(function (element) {
        element.editMode = false;
      });
      console.log("copy")
      console.log(copy)
      this.setState({
        inventory: [...copy]
      })
      console.log(this.state.inventory)}
    )
    // this.setState(previousState =>{
    //   return{
    //     searchValue: data
    //   };
    // });
    
  }

  editClickHandler(data){
    let animalEdit, descEdit, ageEdit, priceEdit
    let invCopy = this.state.inventory
    for(var i in invCopy){
      if(invCopy[i].id === data.id){
        console.log(invCopy[i])
        invCopy[i].editMode = data.editMode
        animalEdit = invCopy[i].animal
        descEdit = invCopy[i].description
        ageEdit = invCopy[i].age
        priceEdit = invCopy[i].price
        break;
      }
    }
    this.setState({
      inventory: [...invCopy],
      animalEdit: animalEdit,
      descEdit: descEdit,
      ageEdit: ageEdit,
      priceEdit: priceEdit,
      addMode: false
    })
    console.log(this.state.inventory)
  }



  deleteClickHandler(data){
      console.log(data)
      let id = data.id
      let URL = "http://localhost:3001/api?act=delete&id=" + id 
      fetch(URL)
      .then(res=>res.json())
      .then(
        (result)=> {
          console.log("Result after delete: "+result.status)
        }
      )
      this.getAll();
  }


  changeProp(data){
    console.log(data)
      let title = data.title
      let val = data.val
      switch(title){
        case "animal":
          this.setState({
            animalEdit: val
          })
          break;
        case "description":
        this.setState({
          descEdit: val
        })
        break;
        case "age":
          this.setState({
            ageEdit: val
          })
          break;
        case "price":
          this.setState({
            priceEdit: val
          })
          break;
      }
      console.log(this.state)
  }

  handleConfirm(data){
    if(data.title === 'accept'){
      let URL = `http://localhost:3001/api?act=update&id=${data.id}&animal=${this.state.animalEdit}&description=${this.state.descEdit}&age=${this.state.ageEdit}&price=${this.state.priceEdit}` 
      fetch(URL)
      .then(res=>res.json())
      .then(
        (result)=> {
          console.log("Result after update: "+result)
        }
      )
      this.getAll()
      this.setState({
        addMode: false
      })
      
    }else{
      let URL = `http://localhost:3001/api?act=add&animal=${this.state.animalEdit}&description=${this.state.descEdit}&age=${this.state.ageEdit}&price=${this.state.priceEdit}` 
      fetch(URL)
      .then(res=>res.json())
      .then(
        (result)=> {
          console.log("Result after update: "+result)
        }
      )
      this.getAll()
      this.setState({
        addMode: false
      })
    }
  }

  handleCancel(){
    this.getAll()
  }

  handleAdd(){
    if(this.state.addMode){
      this.setState({
        addMode: false
      })
    }else{
      this.getAll()
      this.setState({
        addMode: true,
        animalEdit: '',
        descEdit: '',
        ageEdit: '',
        priceEdit: ''
      })
    }
  }

  render()
  {
    
    return (
      <Router>
        <div>
          <div id="header">
            <img src={logo} alt="logo" />
          </div>
          <nav>
            <ul>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/search">Search</NavLink>
              </li>
              <li>
                <NavLink to="/edit">Edit</NavLink>
              </li>
            </ul>
          </nav>

          <footer>
            <p>Gord Bond</p> 	
            <p>&copy;2020</p>
          </footer>

          <Switch>
            
            <Route path="/about" component={About}></Route>
            
            <Route path="/search/:someid" render={(props)=>{
              return(
                <Search 
                inventory={this.state.inventory} 
                search={this.handleSearch.bind(this)}
                searchValue={this.state.searchValue}
                {...props}
              />
              )
            }}>
            </Route> 
            <Route path="/edit">
              <Edit 
                inventory={this.state.inventory} 
                search={this.handleSearch.bind(this)}
                searchValue={this.state.searchValue}
                deleteClickHandler = {this.deleteClickHandler.bind(this)}
                editClickHandler = {this.editClickHandler.bind(this)}
                editMode = {this.state.editMode}
                changeProp = {this.changeProp.bind(this)}
                animalEdit = {this.state.animalEdit}
                descEdit = {this.state.descEdit}
                ageEdit = {this.state.ageEdit}
                priceEdit = {this.state.priceEdit}
                handleConfirm = {this.handleConfirm.bind(this)}
                handleCancel= {this.handleCancel.bind(this)}
                handleAdd = {this.handleAdd.bind(this)}
                addMode = {this.state.addMode}
                getAll = {this.getAll.bind(this)}
              />
            </Route>
            <Route path="/search">
              <SearchAll 
                inventory={this.state.inventory} 
                search={this.handleSearch.bind(this)}
                searchValue={this.state.searchValue}
              />
            </Route>
            <Route path="/">
              <Redirect to="/about" />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;


//OLD CODE

    // let copy = this.state.inventory
    // console.log(copy)
    // let id = copy.filter(
    //   (pet) => {if(data.id !== pet.id){
    //     return false;
    //   }else{
    //     return true;
    //   }
    //   } )
    // console.log(id)
    // let pet = {...id[0]}
    // pet.editMode = true;
    //console.log(pet)
    // this.setState({pet})
    // this.setState({
    //   inventory: [...this.state.inventory, pet]
    // })
    //console.log("PET: "+pet.editMode)
    // this.setState({pet:data.editMode});
    
    // let copy = this.state.inventory
    // console.log(this.state.inventory)
    // let newCopy = copy.filter(
    //   (pet) => {if(data.id !== pet.id){
    //     return false;
    //   }else{
    //     return true;
    //   }
    //   } )
  
    // copy.forEach(function (element) {
    //   element.editMode = false;
    // });
    // //replaces the inventory with smaller list
    // //i need to set all of them as false first
    // console.log("copy")
    // console.log(copy)
    // this.setState({
    //   inventory: [...copy]
    // })
    // console.log(this.state.inventory)


        
      
    
    
    // var editMode = []
    // for(let i = 0; i<this.state.inventory.length;i++)
    // {
    //   editMode.push({editMode:false})
    // }
    // this.setState({
    //   inventory: [...this.state.inventory, ...editMode]
    // })
    // this.setState(previousState =>{
    //   return{
    //     inventory: [
    //       {
    //         editMode: false
    //       }, ...previousState.inventory
    //     ]
    //   };
    // });