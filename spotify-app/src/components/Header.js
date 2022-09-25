import { FaSpotify } from "react-icons/fa";

const Header = ( ) => {
    return(
        <header style={styles.header}>
            <FaSpotify style={styles.icon}/>
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
        background: 'linear-gradient(to top, #38ef7d, #11998e)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        overflowX: 'hidden',
        paddingTop: '20px',
        display: 'flex',
        justifyContent: 'center'
    },

    title: {
        color: 'white'
    },

    icon: {
        color: 'white',
        fontSize: '80px'
    }
}