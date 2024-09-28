// Register.js
import { Button, FormControl, MenuItem, OutlinedInput, Select } from '@mui/material';
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
    <FormControl className='ecom-login-container' onSubmit={handleRegister}>
      <OutlinedInput
        size="small"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <OutlinedInput
        size="small"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Select size='small' value={role} onChange={(e) => setRole(e.target.value)}>
        <MenuItem value="user">User</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
      </Select>
      <Button type="submit">Register</Button>
    </FormControl>
  );
};

export default RegisterUser;
