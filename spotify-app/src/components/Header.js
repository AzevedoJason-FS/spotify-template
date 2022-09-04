const Header = ( ) => {
    return(
        <header style={styles.header}>
            <h2 style={styles.title}>Spotify</h2>
        </header>
    )
}

export default Header;

const styles = {
    header: {
        height: '100%',
        width: '160px',
        position: 'fixed',
        zIndex: '1', 
        top: '0', 
        left: '0',
        backgroundColor: '#111', 
        overflowX: 'hidden',
        paddingTop: '20px',
    },

    title: {
        color: 'white'
    }
}