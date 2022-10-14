import {useState} from 'react';
import { Typography, Button, Paper, TextField } from '@mui/material';


const Signin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const handleSubmit = (e) => {
        e.preventDefault()
    
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

                <Button onClick={handleSubmit}>Sign in</Button>
            </form>
        </Paper>
    )
}

export default Signin