import Header from '../components/Header';
import * as React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const baseURL = "/token";
  let navigate = useNavigate();


  React.useEffect(() => {

    axios.get(baseURL)
    .then((response) => {
      if ( !response || response == null || response && response.data.valid === false ){ 
        return navigate("/");
      }else if(response && response.data.valid === true) { 
        return navigate("/search");
      }
    })
    .catch(err => {
      if (err.response && err.response.status === 500){
        console.clear()
    }
    })


}, [navigate ]);
    
  return (
    <div>
      <Header />
    <div className="App" style={styles.app}>
    <h2 style={styles.title}>Spotify</h2>
    <h2 style={styles.h2}>Hello</h2>
    <div id="login">
     <h1>First, log in to spotify</h1>
     <a href="http://localhost:3001/login">Log in</a>
    </div>
    <div id="loggedin">
    </div>

    </div>
    </div>
  );
}

export default Home;

const styles = {
  app: {
    backgroundColor: 'white',
    minHeight: '100vh',
    marginLeft:'160px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  title: {
    fontSize: '4rem',
    padding: '20px',
    color: 'white',
    background: 'linear-gradient(to right, #38ef7d, #11998e)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  },

  h2: {
    fontWeight: '700',

  },

  h3: {
    color: '#b3b1b1',
  },
    
}
