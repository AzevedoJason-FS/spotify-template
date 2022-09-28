import Header from '../components/Header';
import * as React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Search = () => {

  const [track, setTrack] = React.useState('');
  const [artist, setArtist] = React.useState('');
  const [album, setAlbum] = React.useState('');
  const [token, setToken] = React.useState('');

  const baseURL = "/token";
  let navigate = useNavigate();

  React.useEffect(() => {

    axios.get(baseURL)
    .then((response) => {
      if ( response.data.valid === true ){ 
        const token = response.data.valid
        setToken(token)
        return navigate("/search");
      }else{ 
        return navigate("/");
      }
    })
    .catch(err => {
          console.log(err)
    })

   getArtist();
   getTopTrack();
   getAlbum();

  }, [navigate]);

const getTopTrack = () => {
  axios.get('/artist-top-tracks/7dGJo4pcD2V6oG8kP0tJRR')
  .then((response) => {
    const data = response.data.tracks
    setTrack(data)
  })
  .catch(err => {
    console.log(err)
  })
}

const getArtist = () => {
  axios.get('/artist/7dGJo4pcD2V6oG8kP0tJRR')
  .then((response) => {
    const data = response.data
    setArtist(data)

  })
  .catch(err => {
    console.log(err)
  })
}

const getAlbum = () => {
  axios.get('/album/2cWBwpqMsDJC1ZUwz813lo')
  .then((response) => {
    const data = response.data.items
    setAlbum(data)
  })
  .catch(err => {
    console.log(err)
  })
}

  return (
    <div>
      <Header />
    <div className="App" style={styles.app}>

    <div style={{
      backgroundImage: `url('${artist && artist.images[0].url}')`,
      width: '100%',
      objectFit: 'cover',
      backgroundSize: 'cover',
      height: '20rem',
      backgroundPosition: '25% 20%'
    }}>
      <h2 style={styles.title}>{artist.name}</h2>
      {
        artist.popularity > 80 ?
          (<h4 style={styles.subTitle}>Popular Artist</h4>) 
          :
          (<h4 style={styles.subTitle}>{artist.popularity}</h4>) 
      }
    </div>

      <div style={styles.main}>
        <div>
          <h2 style={styles.gridTitle}>TOP TRACKS</h2>
          <div style={styles.grid}>
            {track.length > 0 ? (
                    track.map((track) => {
                        return (
                            <div key={track.id} style={styles.track}>
                            <h2 style={styles.trackName}><a href={track.external_urls.spotify}>{track.name}</a></h2>
                            <img src={track.album.images[2].url} alt={track.name} />
                            </div>
                        )
                    })
            ) : (
                    <p>uh oh! No Results</p>
                )
            }
          </div>
        </div>

        <div>
          <h2 style={styles.gridTitle}>BEST SELLING ALBUM (Marshall Mathers LP)</h2>
          <div style={styles.grid}>
            {album.length > 0 ? (
                    album.map((album) => {
                        return (
                          <div key={album.id} style={styles.track}>
                            <h2 style={styles.trackName}><a href={album.external_urls.spotify}>{album.name}</a></h2>
                            </div>
                        )
                    })
            ) : (
                    <p>uh oh! No Results</p>
                )
            }
          </div>
        </div>
    </div>
  </div>
</div>
  );
}

export default Search;

const styles = {
  app: {
    backgroundColor: 'rgb(27 31 35 / 2%)',
    minHeight: '100vh',
    marginLeft:'160px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  title: {
    fontSize: '6rem',
    padding: '20px',
    color: 'white',
    marginTop: '1rem'
  },

  subTitle: {
    fontSize: '1.5rem',
    padding: '20px',
    color: 'white',
    marginTop: '1rem'
  },

  h2: {
    fontWeight: '700',

  },

  h3: {
    color: '#b3b1b1',
  },

  gridTitle: {
    color: 'black',
    fontWeight: '600'
  },

  main: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 2fr)',
    gap: '20px',
    padding: '40px'
  },

  grid: {
    display: 'grid',
    padding: '10px',
    gridTemplateColumns: 'repeat(3, 2fr)',
    gap: '4px',
    justifyItems: 'center',
    boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
    borderRadius: '10px',
    background: 'white'
  },

  trackName: {
    fontSize: '14px'
  },

  track: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },

    
}



