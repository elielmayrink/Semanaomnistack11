import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import logoImg from '../../assets/logo.svg';
//import api from '../../servece/api';
import './style.css';
import api from '../../servece/api';

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const hystory = useHistory()

   async function handleRegister (e) {
        e.preventDefault()
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }
        try{ const response = await api.post('ongs', data)
        alert(`Your access id is: ${response.data.id}`)
        hystory.push('/')
    }
        catch(err){
            alert("falhou")
        }
       
    };
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the hero"/>

                    <h1>Register</h1>
                    <p>Register, enter the platform and help people to be a hero</p>
                    <Link className='back-link' to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                         Back to logon
                    </Link>

                </section>
                <form onSubmit={handleRegister}>
                    <input 
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)} 
                    />

                    <input 
                    type='email' 
                    placeholder="E-mail" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                     />

                    <input 
                    placeholder="Whatsapp"
                    valeu={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                     />

                    <div className="input-group">
                        <input 
                        placeholder="City"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        />
                        <input
                        placeholder="UF"
                        style={{width: 80}}
                        valeu={uf}
                        onChange={e => setUf(e.target.value)}  
                        />
                    </div>
                    <button className="button" type="submit">Register</button>

                </form>
            </div>
        </div>
    )
}

export default Register;