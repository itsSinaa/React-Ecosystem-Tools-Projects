import React from 'react'
import { Container } from '@mui/material'

const Header = () => {
  return (
    <header style={{padding : ".05rem",backgroundColor : "#536DFE",color : "#fff",marginBottom : ".75rem"}}>
        <Container maxWidth="xl">
            <h1>Todo List</h1>
        </Container>
    </header>
  )
}

export default Header