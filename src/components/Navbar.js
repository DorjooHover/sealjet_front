import { Button, Stack, Grid,Box,Paper,IconButton,InputBase } from "@mui/material"
import { Search } from '@mui/icons-material' 
import Link from 'next/link'

export default function Navbar() {

     return (
          <Box className='nav'>
               <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{px: 6}}>
                    <Grid container spacing={2} >
                         <Grid item xs={2}>
                              <Link href='/'>
                                   <a><img src="/img/sealjet-logo.png" alt="" /></a>
                              </Link>
                         </Grid>
                         <Grid item xs={2}>
                              <Link href='/'>
                                   <a>Нүүр</a>
                              </Link>
                         </Grid>
                         <Grid item xs={2}>
                              <Link href='/product'>
                                   <a>Бүртээгдэхүүн</a>
                              </Link>
                         </Grid>
                         <Grid item xs={2}>
                              <Link href='/news'>
                                   <a>Мэдээ</a>
                              </Link>
                         </Grid>
                         <Grid item xs={2}>
                                   <a href="#contact">Холбоо</a>
                         </Grid>
                         <Grid item xs={2}>
                              <Link href='/order'>
                                   <a>Захиалах</a>
                              </Link>
                         </Grid>
                    </Grid>
                    <Paper component='form' sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
                         <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                              <Search />
                         </IconButton>
                         <InputBase
                         sx={{ ml: 1, flex: 1 }}
                         placeholder="Бүтээгдэхүүн хайх"
                         inputProps={{ 'aria-label': 'searchh product' }}
                         />
                    </Paper>
               </Stack>
          </Box>

     )
}