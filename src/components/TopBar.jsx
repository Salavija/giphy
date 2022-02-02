import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as Teshy } from '../images/testhy.svg'

const Topbar = (props) => {
    return (
        <AppBar position="static"
            sx={{
                backgroundColor: '#2a2b2c',
                width: '100%',
                top: 0,
                height: '40px',
            }}>
            <Container maxWidth="xl"
                sx={{
                    height: '40px',
                }}>
                <Toolbar
                    sx={{
                        height: '40px',
                    }}>
                    <SvgIcon sx={{ height: '16px', width: '140px',
                    position: 'absolute',
                    left: '-64px',
                    top: '14px',
                    display: { xs: 'none', md: 'flex',  } }}>
                        <Teshy />
                    </SvgIcon>

                    <Box sx={{
                        flexGrow: 0,
                        position: 'absolute',
                        height: '40px',
                        display: 'flex',
                        flexDirection: 'row',
                        right: '0',
                        top: '8px',
                    }}>

                        <Typography component={'span'} sx={{
                            whiteSpace: 'pre-line', display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'baseline',
                        }}>
                            <i className="fas fa-info-circle"></i>
                            <Typography> &nbsp; Press  &nbsp;</Typography>
                            <Typography sx={{ whiteSpace: 'pre-line', textDecoration: 'underline' }}>spacebar</Typography>
                            &nbsp; to shuffle or &nbsp;
                        </Typography>
                        <Tooltip title="Reload">
                            <Button
                                variant="contained"
                                onClick={props.dataReloadHandler}
                                sx={{ p: 0, height: '30px', top: '-5px', width: '88px', fontSize: '12px', }}
                            >Click here</Button>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Topbar;