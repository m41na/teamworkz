import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { useAppContext } from '../state/useAppState';
import MenuBar from '../containers/MenuBarContainer';

function Copyright({ title }) {
    return (
        <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                {title}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Layout({ children }) {

    const { appState: { appTitle, footerText }, setAppTitle, fetchAppTitle } = useAppContext();

    React.useEffect(() => {
        const init = async () => {
            const title = await fetchAppTitle();
            setAppTitle(title)
        }
        init();
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <CssBaseline />
            <Container component="main" sx={{ mt: 2, mb: 2 }} maxWidth="lg">
                <MenuBar title={appTitle} />
                {children}
            </Container>
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                }}
            >
                <Container maxWidth="sm">
                    <Typography variant="body1">
                        {footerText}
                    </Typography>
                    <Copyright title={appTitle} />
                </Container>
            </Box>
        </Box>
    );
}