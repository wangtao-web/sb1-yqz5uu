import React from 'react'
import { Grid, Paper, Typography } from '@mui/material'

interface FunctionCardProps {
  title: string
  icon: React.ReactNode
  link: string
}

const FunctionCard: React.FC<FunctionCardProps> = ({ title, icon, link }) => {
  return (
    <Grid item xs={6} sm={4}>
      <Paper
        component="a"
        href={link}
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          textDecoration: 'none',
          color: 'inherit',
          transition: 'background-color 0.3s',
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        }}
      >
        {icon}
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          {title}
        </Typography>
      </Paper>
    </Grid>
  )
}

export default FunctionCard