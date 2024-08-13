import React, { useEffect, useState } from 'react'
import { json, useNavigate } from 'react-router-dom'
import jwt from 'jsonwebtoken'

const Quote = () => {

    const navigate = useNavigate();
    const [quote, setQuote] = useState('');
    const [tempQuote, setTempQuote] = useState('');
    

    async function populateQuote() {
        const response = await fetch('http://localhost:3000/api/quote', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
        const data = await response.json();
        if(data.status === 'ok'){
            setQuote(data.quote);
        }
        else{
            alert(data.error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            const user = jwt.decode(token);
            if(!user){
                localStorage.removeItem('token');
                navigate('/login');
            }
            else{
                populateQuote();
            }
        }
        
    }, [])

    async function updateQuote(event) {
        event.preventDefault();
        const response = await fetch('http://localhost:3000/api/quote', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                quote: tempQuote,
            })
        })
        const data = await response.json();
        if(data.status === 'ok'){
            setQuote(tempQuote);
            setTempQuote('');
        }
        else{
            alert(data.error);
        }
    }

  return (
    <div>
        <h1>Your Quote: {quote || 'No Quote Found'}</h1>
        <form onSubmit={updateQuote}>
            <input type="text" placeholder='Quote' value={tempQuote} onChange = {(e) => setTempQuote(e.target.value)}/>
            <input type="submit" value="Update Quote"/>
        </form>
    </div>
  )
}

export default Quote