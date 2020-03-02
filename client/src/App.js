import React, {Component} from 'react';
import jwt from 'jsonwebtoken'
import MasterRoute from './routes/MasterRoute';

class App extends Component{
  componentDidMount = () => {
    if(localStorage.getItem('user')){
      const {exp} = jwt.decode(localStorage.getItem('user'))
      /*if (exp < (Date.now().valueOf() / 1000)) {
        localStorage.removeItem('user')
        alert('Session Expired!!')
        window.location.reload()
      }*/
    }
  }

  render(){
    return (
      <>
        <MasterRoute />
      </>
    );
  }
}

export default App
