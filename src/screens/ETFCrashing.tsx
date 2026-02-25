import {
    Container,
    Grid,
    Box
} from "@mui/material";

import Header from "../components/Header";
import GraphPreview from "../components/GraphPreview";

const ETFCrashing = () => {
    return (
        <Box
            sx={{
                display: "flex",
                mt: { xs: 8, sm: 10 },
                mb: { xs: 4, sm: 6 }
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    py: { xs: 3, sm: 4 },
                    px: { xs: 1, sm: 2 }
                }}
                disableGutters
            >
                <Header title="Phase Two: Test your ETF against the market!" />

                <Grid
                    container
                    spacing={3}
                    sx={{ alignItems: "stretch" }}
                >
                    <Grid size={{ xs: 12, md: 12 }}>
                        <GraphPreview stocks={["AAPL", "BAC", "MSFT", ""]}/>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default ETFCrashing;
