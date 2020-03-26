import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../servece/api';

import logoImg from '../../assets/logo.svg';
import './style.css';

const NewIncident = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory()
    
    const handleNewIncident = async (e) => {
        e.preventDefault();
       const data = {
            title,
            description,
            value
        };
        try{
            await api.post("incedents", data, {
                headers: {
                    Authorization:  ongId
                } 
                  
            },
            history.push('/profile')   
            )
        }catch(err){
            alert('Erro ao cadastrar o caso tente novamente')
        }
       
    }

    return (
        <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="Be the hero"/>
 
                <h1>Register New incident</h1>
                <p>Describe the incident in detail</p>
                <Link className='back-link' to="/profile">
                    <FiArrowLeft size={16} color="#e02041" />
                     Back to home
                </Link>

            </section>
            <form onSubmit={handleNewIncident}>
                <input 
                placeholder="Title of incident"
                value={title}
                onChange={e => setTitle(e.target.value)}
                 />

                <textarea 
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                 />

                <input 
                placeholder="Value R$"
                valeu={value}
                onChange={e => setValue(e.target.value)}
                 />

                <button className="button" type="submit">New incident</button>

            </form>
        </div>
    </div>
    )
}

export default NewIncident;