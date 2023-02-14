import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


interface State{
  Actors:Actor[];
  regName:string;
  regAge:number;
  regMovie:string;
}


interface Actor{
    id:number;
    nev:string;
    kor:number;
    film:string;
}

class App extends Component<{}, State>{
  constructor(props:{}){
    super(props)
    this.state={
      Actors:[],
      regName:'',
      regAge:0,
      regMovie:''
    }
  }

  async loadActors(){
    let response=await fetch('http://localhost:3000/szinesz');
    let data=await response.json();
    this.setState({
      Actors:data
    });
    
  }

  componentDidMount(){
    this.loadActors();
  }

  registerHandler=async()=>{
    const{regName, regAge, regMovie}=this.state;

    const data={
      nev:regName,
      kor:regAge,
      film:regMovie
    }

    console.log(data)
    let response=await fetch('http://localhost:3000/szinesz',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    });

    this.setState({
      regName:'',
      regAge:0,
      regMovie:''
    })
    
    await this.loadActors();
  };

deleteHandler=async(id:number)=>{
  await fetch('http://localhost:3000/szinesz/'+id, {method:'DELETE'})
  this.loadActors();
}
  
render() {
  const{regName, regAge, regMovie}=this.state;
  return <div>
    <h1>Új színész felvétele</h1>
    <div>
      Színész neve: <br /> <input type="text" value={regName} onChange={e=>this.setState({regName:e.currentTarget.value})}required/><br />
      Színész kora: <br /> <input type="text" value={regAge} onChange={e=>this.setState({regAge: parseInt(e.currentTarget.value)})}required/><br />
      Színész filmje: <br /> <input type="text" value={regMovie} onChange={e=>this.setState({regMovie:e.currentTarget.value})}required/><br />
      <button onClick={this.registerHandler} className="btn btn-success" style={{marginBottom:10, marginTop:10}}>Felvétel</button>
    </div>
    <table className='table'>
      <th>Név</th>
      <th>Kor</th>
      <th>Film</th>
      <tbody>
      {
        this.state.Actors.map(e=> <tr className='table-primary'><th>{e.nev}</th><td>{e.kor}</td><td>{e.film}</td><td><button onClick={(event)=>this.deleteHandler(e.id)} className='btn btn-outline-danger'>Törlés</button></td></tr>)
      }
      </tbody>
    </table>
    </div>
}

}


export default App;
