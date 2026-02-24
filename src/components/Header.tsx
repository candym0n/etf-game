import React from 'react';
import { AppBar, Typography, Toolbar } from "@mui/material";

type HeaderProps = {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <AppBar sx={{ height: "10vh" }}>
            <Toolbar sx={{
                height: "100%",
                minHeight: "unset"
            }}>
                <Typography
                    variant="h4"
                    noWrap
                    component="div"
                    sx={{
                        flexGrow: 1,
                        textAlign: { xs: "center", sm: "left" },
                        px: { xs: 1, sm: 0 }
                    }}
                >
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
