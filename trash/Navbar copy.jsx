import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useMediaQuery } from "react-responsive";
import { deviceSize } from "./Responsive";
import tw from 'twin.macro'
import { PersonOutlined, Search, ShoppingBasketOutlined } from '@material-ui/icons'
import { Turn as Hamburger } from 'hamburger-react'
import { motion } from 'framer-motion'

// const Container = styled.div`
//     ${tw`

//     `}
// `

const Container = styled.div`
    z-index: 500;
    ${tw`
        bg-white
        z-30
        h-20
        w-full
        px-4
        lg:px-52
        fixed
        border-b-2
        py-5
        flex
        justify-between
        items-center
        
    `}
`
const Left = tw.div`
    flex
    items-center
`

const Logo = tw.h1`
    font-bold
    text-2xl
    mr-5
`

const Right = tw.div`
    flex
    items-end
`

const CategoryContainer = tw.div`
    flex
    items-center
    flex-col
    justify-center
    items-center
    lg:flex-row

    
`

const CategoryItem = tw.div`
    p-7
    w-full
    flex-basis[1/4]
    cursor-pointer
    text-2xl
    font-bold
    border-b-2
    text-center
    lg:ml-4
    lg:font-semibold
    lg:border-b-2
    lg:border-b-transparent
    lg:hover:border-b-blue-500
    lg:p-0
    lg:text-base
    
`

const SearchContainer = tw.div`
    border-2
    flex
    items-center
    py-1
    px-2
`

const Input = tw.input`
    border-none
    outline-none
`

const CategoryOverlay = styled(motion.div)`
  transform: translateX(4em);
    z-index: -100;
    ${tw`
        w-full  
        h-auto   
        // bg-blue-500
        position[fixed]
    `}
      
`

const HambContainer = tw.div`
    position[relative]
    top-1.5
    ml-4
`

const Navbar = () => {

    const isMobile = useMediaQuery({ maxWidth: deviceSize.mobile })
    const [isOpen, setOpen] = useState(false)
    const closeCategory = () => setOpen(false)
    const animateFrom = { opacity: 0, y: '-100%' }
    const animateTo = { opacity: 1, y: 0 }
    // const exit = { opacity: 1, y: 0 }
    // const variants = {
    //     open: { opacity: 1, x: 0 },
    //     closed: { opacity: 1, x: "-100%" }
    // }
    // const transition = { type: "spring", duration: 1, stiffness: 33, delay: 0.1 }

    const navItems = (
        <CategoryContainer>
            <CategoryItem onClick={() => isMobile && setOpen(false)}>wanita</CategoryItem>
            <CategoryItem onClick={() => isMobile && setOpen(false)}>pria</CategoryItem>
            <CategoryItem onClick={() => isMobile && setOpen(false)}>anak</CategoryItem>
            <CategoryItem onClick={() => isMobile && setOpen(false)}>bayi</CategoryItem>
        </CategoryContainer>
    )


    return (
        <div className=''>
            <Container>
                <Left>
                    <Logo>UNIKLO</Logo>
                    {!isMobile && (
                        navItems
                    )}
                </Left>
                <Right>
                    {!isMobile && (
                        <>
                            <SearchContainer >
                                <Input />
                                <Search />
                            </SearchContainer>
                            <PersonOutlined className='cursor-pointer ml-4' style={{ fontSize: 35 }} />
                        </>
                    )}
                    {isMobile && (
                        <Search className='cursor-pointer ml-4' style={{ fontSize: 35 }} />
                    )}
                    <ShoppingBasketOutlined className='cursor-pointer ml-4' style={{ fontSize: 35 }} />
                    {isMobile && (
                        // <Menu right styles={styles}>
                        //     {/* {navItems} */}
                        // </Menu>
                        <HambContainer>
                            <Hamburger toggled={isOpen} toggle={setOpen} />
                        </HambContainer>


                    )}
                </Right>
            </Container >
            {isOpen &&
                <CategoryOverlay
                    initial={animateFrom}
                    animate={animateTo}
                    exit={animateFrom}
                    transition={{ duration: 0.5 }}
                // initial={false}
                // animate={isOpen ? "open" : "close"}
                // variants={variants}
                // transition={{ duration: 0.5 }}
                >
                    {navItems}
                </CategoryOverlay>

            }
        </div>
    )
}

export default Navbar