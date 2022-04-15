import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    margin-left: auto;
    margin-right: auto;
    width: 1000px;
    height: 60px;
    /* background-color: grey; */
    position: sticky;
    `

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

`
const Left = styled.div`
    
`

const Logo = styled.h1`
    font-weight: bold;
`
// const Category = styled.
const Right = styled.div`
    
`





const Navbar = () => {
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Logo>No-Cloth</Logo>
                </Left>
                <Left>left</Left>
                {/* <Left /> */}
            </Wrapper>
        </Container>
    )
}

export default Navbar