'use client';
import React, { useState, useEffect } from 'react';
import { Button, Checkbox, FormControlLabel, Grid, IconButton, Slider, Tooltip, Typography } from '@mui/material';
import { FileCopyOutlined as FileCopyOutlinedIcon } from '@mui/icons-material';
import copyToClipboard from 'clipboard-copy';

function generatePassword(length: number, includeSymbols: boolean, includeNumbers: boolean): string {
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const numbers = '0123456789';
  let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  if (includeSymbols) charset += symbols;
  if (includeNumbers) charset += numbers;

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Generate a password when the component mounts
  useEffect(() => {
    const initialPassword = generatePassword(length, includeSymbols, includeNumbers);
    setPassword(initialPassword);
  }, []);

  const generateNewPassword = () => {
    const newPassword = generatePassword(length, includeSymbols, includeNumbers);
    setPassword(newPassword);
    setIsCopied(false);
  };

  const handleCopyToClipboard = () => {
    copyToClipboard(password);
    setIsCopied(true);
    setShowTooltip(true);

    setTimeout(() => {
      setShowTooltip(false);
    }, 500);

    setTimeout(() => {
      setIsCopied(false);
    }, 650);
  };

  const handlePasswordClick = () => {
    if (password) {
      setIsCopied(true);
      setShowTooltip(true);

      setTimeout(() => {
        setShowTooltip(false);
      }, 500);

      setTimeout(() => {
        setIsCopied(false);
      }, 650);
    }
  };

  return (
    <Grid
      container
      margin={0}
      height={'100vh'}
      justifyContent='center'
      alignItems='center'
      spacing={2}
      style={{ backgroundColor: '#121212' }}
    >
      <Grid item xs={12} textAlign='center'>
        <Typography variant='h4' style={{ color: 'white' }}>
          Password Generator
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        textAlign='center'
        sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center', flexDirection: 'row' }}
      >
        <div
          onClick={handlePasswordClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minWidth: '275px',
            width: '33%',
            padding: '10px',
            border: '1px solid #1976d2',
            borderRadius: '5px',
            backgroundColor: '#121212',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          <div>{password}</div>
          {password && (
            <Tooltip
              title={isCopied ? 'Copied!' : 'Copy to clipboard'}
              open={showTooltip}
              onClose={() => setShowTooltip(false)}
            >
              <IconButton onClick={handleCopyToClipboard} style={{ color: '#1976d2' }}>
                <FileCopyOutlinedIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Grid>
      <Grid item xs={12} textAlign='center'>
        <Slider
          value={length}
          onChange={(e, value) => setLength(value as number)}
          min={8}
          max={30}
          step={1}
          marks
          valueLabelDisplay='auto'
          aria-labelledby='password-length-slider'
          style={{
            minWidth: '275px',
            width: '30%',
            color: '#1976d2',
          }}
        />
        <Typography variant='body2' gutterBottom style={{ color: 'white' }}>
          Length: {length}
        </Typography>
      </Grid>
      <Grid item xs={12} textAlign='center'>
        <FormControlLabel
          control={
            <Checkbox
              sx={{ color: '#1976d2' }}
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
            />
          }
          label='Include Symbols'
          sx={{ color: 'white' }}
        />
        <FormControlLabel
          control={
            <Checkbox
              sx={{ color: '#1976d2' }}
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
          }
          label='Include Numbers'
          sx={{ color: 'white' }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        textAlign='center'
        sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center', flexDirection: 'row' }}
      >
        <Button
          variant='contained'
          onClick={generateNewPassword}
          style={{ color: 'white', marginRight: '10px', textTransform: 'none' }}
        >
          Generate Password
        </Button>
        <Button variant='contained' onClick={handleCopyToClipboard} style={{ color: 'white', textTransform: 'none' }}>
          Copy to Clipboard
        </Button>
      </Grid>
      <Grid item xs={12} textAlign='right' margin={0}>
        <Typography variant='caption' gutterBottom style={{ color: 'white' }} marginRight={4}>
          Made with 💜 by dylvaz
        </Typography>
      </Grid>
    </Grid>
  );
}
