import { Button, FormControl, MenuItem, OutlinedInput, Select, InputLabel, Box } from '@mui/material';
import React, { useState } from 'react';
import { registerUser } from '../../services/authService';

const RegisterUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password, role);
      alert('User registered successfully');
    } catch (error) {
      alert('Error registering user');
    }
  };

  return (
    <Box className='ecom-login-container' component="form" onSubmit={handleRegister} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormControl>
        <OutlinedInput
          size="small"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FormControl>

      <FormControl>
        <OutlinedInput
          size="small"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </FormControl>

      <FormControl>
        <InputLabel id="role-label">Role</InputLabel>
        <Select
          labelId="role-label"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          size="small"
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
      </FormControl>

      <Button type="submit" variant="contained">
        Register
      </Button>
    </Box>
  );
};

export default RegisterUser;
