import Header from '../components/Header';
import * as React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Search = () => {

  const baseURL = "/token";
  let navigate = useNavigate();

  React.useEffect(() => {

    axios.get(baseURL)
    .then((response) => {
      console.log(response.data)
      if ( response.data.valid === false ){ 
        console.log('Token NOT valid')
        return navigate("/");
      }else { 
        console.log('Token valid')
        return navigate("/search");
      }
    })
    .catch(err => {
          console.log(err)
    })

    axios.get('/search')
    .then((response) => {
      console.log(response)
    })
    .catch(err => {
      console.log(err)
    })

}, [navigate]);


  return (
    <div>
      <Header />
    <div className="App" style={styles.app}>
        
    <h2 style={styles.title}>Search</h2>


    </div>
    </div>
  );
}

export default Search;

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
    background: '#11998e',  /* fallback for old browsers */
    background: '-webkit-linear-gradient(to right, #38ef7d, #11998e)', /* Chrome 10-25, Safari 5.1-6 */
    background: 'linear-gradient(to right, #38ef7d, #11998e)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  },

  h2: {
    fontWeight: '700',

  },

  h3: {
    color: '#b3b1b1',
  },
    
}



