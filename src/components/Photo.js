import React, { useState } from "react";
import '../css/photo.css'

const Photo = (props) => {
    const [error, setError] = useState('')
    const [newBid, setNewBid] = useState({})

    const addBid = async (event) => {
        event.preventDefault();
        if (newBid.user === "" || newBid.bid === "") {
            setError('Please enter both fields')
            return
        }
        props.art.bids.forEach(bid => {
            if (newBid.bid <= bid.bid) {
                setError('New bid has to be the highest')
                return
            }
        });
        await fetch(`http://localhost:5000/api/art/${props.art._id}`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBid),
        })
        .then(res => res.json())
        .then(res => {
            if (res.error) {
                setError(res.error);
                return;
            }
        })
        .catch (err => {
            console.log(err)
            return;
        });
    }

    const handleChange = event => {
        setNewBid({
            ...newBid,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div className="photo-container">
            <div className="photo"><img src={props.art.src} alt={props.art.alt} width='200'></img></div>
            <div className="comments-section">
                <div>
                    <h4>Bids</h4>
                    <ul>
                    {props.art.bids.map((bid) => {
                        return (
                            <li key={bid._id}>{bid.user}: ${bid.bid.toFixed(0)}</li>
                        )
                    })}
                    </ul>
                </div>
            </div>
            <div className="addbid">
                {error ? (<p className='error'>{error}</p>) : (<></>)}
                <form action="" method="POST" className="comment-form" onChange={event => handleChange(event)}>
                    <input type="text" placeholder="Your name" name="user"></input>
                    <textarea type="number" placeholder="Add a higher bid" name="bid"></textarea>
                    <button type="submit" onClick={(event) => addBid(event)}>Submit Your Higher Bid</button>
                </form>
            </div>
        </div>
    )
}

export default Photo;