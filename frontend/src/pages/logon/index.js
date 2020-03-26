import React, {useState} from 'react';
import {FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import api from '../../servece/api';
import "./style.css";

import herosImg from '../../assets/heroes.png';
import logImg from "../../assets/logo.svg";
const Logon = () => {
    const [id, setId] = useState('')
    const history = useHistory()
    const handleLogoin = async (e) => {
        e.preventDefault()
        try{
        const response = await api.post('session', { id });
        localStorage.setItem('ongId', id);
        localStorage.setItem('ongName', response.data.name);
        history.push('/profile')
    }catch{
        alert("deu merda")

    }
    }
    return(
        <div className="logon-container"> 
            <section className="form">
                <img src={logImg} alt="be the hero"/>

                <form onSubmit={handleLogoin}>
                    <h1>Make your registration</h1>
                    <input
                     placeholder="Enter your ID"
                     value={id}
                     onChange={e => setId(e.target.value)} 
                     />
                    <button type='submit' className="button">Enter</button>
                   
                    <Link className='back-link' to="/register">
                        <FiLogIn className="icon" size={16} color="#e02041" />
                            Have i no registration
                    </Link>
                </form>
            </section>

            <img src={herosImg} alt="People hugging"/>
        </div>
    )
}

export default Logon;