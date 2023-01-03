import React from 'react';
import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const CreateLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('');

    const navigate = useNavigate()

    const createAccount = async () => {
        try {
            if(password !== confirmPassword) {
                setError ('Password dostn confitm')
                return
            }
            await createUserWithEmailAndPassword(getAuth(), email, password )
            navigate('/articles')
        } catch (e) {
            setError(e.message);
        }
    }
    


    return (
       <>
            <h1>
            Create
            </h1>
            {error && <p>{error}</p>}
            <input 
                placeholder='your email adress'
                value={email}
                onChange={e => setEmail(e.target.value)}
             />
            <input type="password" 
                placeholder='your password'
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <input type="password" 
                placeholder='Re-enter your password'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
            />
            <button onClick={createAccount}>Create Acc</button>
            <Link to='/login'> Alredy have?</Link>
       </>
    );
};

export default CreateLogin;