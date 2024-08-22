import React from 'react';
import { Box, Typography, Card, CardContent, Grid, useMediaQuery, useTheme, IconButton } from '@mui/material';
import PersistentDrawerLeft from "../components/dashboard";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md')); 
    const drawerWidth = 240;
    const navigate = useNavigate()

    const addCart = ()=>{
        navigate('/dashboard/room')
    }

    return (
        <>
            <PersistentDrawerLeft />
            <Box
                sx={{
                    padding: 3,
                    marginLeft: isMobile ? 0 : `${drawerWidth}px`,
                    transition: 'margin-left 0.3s',
                }}
            >
                <Typography 
                sx={{padding: '10px'}}
                variant="h4" gutterBottom>
                    Welcome to the Hotel Management System
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={4}>
                        <Card>
                            <CardContent sx={{backgroundColor:'#00f5d4'}}>
                                <Typography variant="h6">Total Bookings</Typography>
                                <Typography variant="h4">123</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Card>
                            <CardContent sx={{backgroundColor:'#8eecf5'}}>
                                <Typography variant="h6">Upcoming Bookings</Typography>
                                <Typography variant="h4">5</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Card sx={{backgroundColor: '#b5e2fa'}}>
                            <CardContent>
                                <Typography variant="h6">Revenue This Month</Typography>
                                <Typography variant="h4">$2,345</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Card sx={{backgroundColor: '#caf0f8'}}>
                            <CardContent>
                                <Typography variant="h6">Book A Room</Typography>
                                <IconButton onClick={addCart} color="primary" aria-label="add to shopping cart">
                                 <AddShoppingCartIcon />
                                </IconButton>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
