import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Song from "./Song";

// make a description
const AllSongs = (props) => {
    const [songs, setSongs] = useState([]);
    const url = "https://cs571.org/s23/hw5/api/songs";

    // returns jsx for summary of songs
    function displaySummary(songs) {
        let num_songs = songs.length;

        // calculate number of genres
        let num_genres = songs.reduce((prev, curr) => {
            if (!prev.includes(curr.genre))
                prev.push(curr.genre);
            return prev;
        }, []).length;

        // calculate total length of songs in seconds
        let total_length = 0;
        songs.forEach((song) => {
            let song_length = song.length.split(":");
            total_length += parseInt(song_length[0]) * 60 + parseInt(song_length[1]);
        });

        return <div>
            <p>We have {num_songs} songs in {num_genres} genres for a total of {total_length} seconds of music!</p>
        </div>
    }

    // whenever page is reloaded, fetch data from url
    useEffect(() => {
        fetch(url, {
            method: "GET",
            headers: {
                "X-CS571-ID": "bid_f6cf574eb476d5ada941"
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setSongs(data);
            })
    }, []);

    return <div>
        <h1>Songs</h1>
        {
            displaySummary(songs)
        }
        <Container fluid>
            <Row>
                {
                    songs.map((song) => {
                        return <Col xs={12} sm={6} md={4} lg={3} xl={2} key={song.id}>
                            <Song img={song.img}
                            id={song.id}
                            title={song.title}
                            genre={song.genre}
                            artist={song.artist}
                            year={song.year}
                            length={song.length}/>
                        </Col>
                    })
                }
            </Row>
        </Container>
    </div>
}

export default AllSongs;