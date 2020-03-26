import React, { useState, useEffect }from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from "../../servece/api";

import LogoImg from '../../assets/logo.svg';
import './style.css'
const Profile = () => {
    const [incidents, setIncidents] = useState([])
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId])

    const handleDeletIncident = async (id) => {
        try{
           await api.delete(`incedents/${id}`, {
               headers: {
                   Authorization: ongId,
               }
           })
           setIncidents(incidents.filter(incident => incident.id !== id))
        }catch(err){
            alert('erro ao deletar incident')
        }
    }

    const handleLogout = () => {
        localStorage.clear();
        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={LogoImg} alt='Be the hero' />
                <span>Wecome {ongName}</span>
                <Link to="/incidents/new" className='button'>New incident</Link>
                <button onClick={() => handleLogout()} type="button"> 
                    <FiPower size={18} color='#e02041' />
                </button>
            </header>

            <h1>Registered incidents</h1>

            <ul>
                {incidents.map(incident => (
                         <li key={incident.id}>
                         <strong>Incident:</strong>
                         <p>{incident.title}</p>
     
                         <strong>Description:</strong>
                         <p>{incident.description}</p>
     
                         <strong>Value</strong>
                         <p>{Intl.NumberFormat('pt-br', { style: "currency", currency: "BRL"})
                             .format(incident.value)}</p>
     
                         <button onClick={() => handleDeletIncident(incident.id)} type="button">
                             <FiTrash2 size={20} color="#a8a8b3" />
                         </button>
     
                     </li>
                ))}
            </ul>
        </div>
    )
}


export default Profile