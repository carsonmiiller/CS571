import { Card, Button } from "react-bootstrap";
import { useContext } from "react";
import BadgerBeatsFavoritesContext from "../contexts/BadgerBeatsFavoritesContext";

// think about what we need as a component description
const Song = (props) => {
    const [favorites, setFavorites] = useContext(BadgerBeatsFavoritesContext);

    function toggleFav(){
        if(favorites.filter((song) => song.id === props.id).length===0){
            setFavorites([...favorites, {
                id: props.id,
                title: props.title,
                artist: props.artist,
                genre: props.genre,
                year: props.year,
                length: props.length,
                img: props.img
            }])
        } else {
            setFavorites(favorites.filter((song) => song.id !== props.id));
        }
    }

    let buttonStyle =  favorites.filter((song) => song.id === props.id).length > 0 ? "danger" : "primary";
    let buttonText =  favorites.filter((song) => song.id === props.id).length > 0 ? "Remove from Favorites" : "Add to Favorites";

    return <Card className='p-2'>
        <img src={props.img} alt="song_card"></img>
        <h3>{props.title}</h3>
        <h5>{props.artist}</h5>
        <p><em>{props.genre} | {props.year} | {props.length}</em></p>
        <Button variant={buttonStyle} onClick={toggleFav}>{buttonText}</Button>
    </Card>
}

export default Song;