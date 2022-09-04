import Header from './components/Header';

const App = () => {
  return (
    <div>
      <Header />
   
    <div className="App" style={styles.app}>
      
        <h2 style={styles.title}>Spotify Clone</h2>
        <h2 style={styles.h2}>Text Example</h2>
        <h3 style={styles.h3}>Text Example</h3>
    </div>
    </div>
  );
}

export default App;

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
