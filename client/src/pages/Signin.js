import {useState} from 'react';
import { Typography, Button, Paper, TextField, Alert } from '@mui/material';
import {UseLogin} from '../hooks/useLogin'

const Signin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, isLoading, isError} = UseLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)
        console.log(email, password)
    }
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      };

    return(
        <Paper className="paper" sx={style}>
            <form onSubmit={handleSubmit} autoComplete="off" noValidate spacing={1} className="form">
                <Typography variant="h6" gutterBottom style={{fontWeight : 550}}>
                    Sign In
                </Typography>
                <TextField
                required className="textField"
                variant="outlined" 
                label="Email" fullWidth
                name="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                required className="textField"
                variant="outlined" 
                label="Password" fullWidth
                name="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />

                <Button onClick={handleSubmit} disabled={isLoading}>Sign in</Button>
            </form>
                <div>{isError && <Alert severity="error">{isError}</Alert>}</div>
        </Paper>
    )
}

export default Signin