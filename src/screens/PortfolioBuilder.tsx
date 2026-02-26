import React, { useEffect, useState } from "react";
import {
    Container,
    Grid,
    Box,
    Button,
    Typography
} from "@mui/material";
import Header from "../components/Header";
import PiePreview, { type AllocationData } from "../components/PiePreview";
import { usePortfolioStore } from "../store/portfolioStore";
import { useNavigate } from "react-router-dom";
import { useAppDialog } from "../providers/DialogProvider";
import ETFTray from "../components/etfs/ETFTray";
import investments from "../assets/data/investments.json";
import ETFBasket from "../components/etfs/ETFBasket";
import { useStateStore } from "../store/stateStore";

const PortfolioBuilder: React.FC = () => {
    const [allocations, setAllocations] = useState<AllocationData[]>([]);
    const equityETFs = usePortfolioStore(state => state.equityETFs);
    const bondETFs = usePortfolioStore(state => state.bondETFs);
    const crashed = useStateStore(state => state.simulationPlayed);
    const navigate = useNavigate();
    const { showDialog } = useAppDialog();

    useEffect(() => {
        crashed || showDialog([
            "In real life, you don't build the ETF itself. Companies create the ETFs for you. What you control is how you use existing ETFs to build your own portfolio.",
            "Another type of ETF is called <b>bond ETFs</b>, which hold bonds, such as government, corporate, or municipal bonds. They also trade on stock exchange just like a stock.",
            "Before investing in an ETF, it's important to understand what's inside it. Click on the information circles to learn more about each ETF.",
            "Select ETFs from the lists on the left to build your portfolio, and click \"Next\" when you're ready to test it against the market."
        ], "Build your portfolio");
    }, []);

    useEffect(() => {
        setAllocations([
            { label: "Bond ETFs", value: bondETFs.length },
            { label: "Equity ETFs", value: equityETFs.length }
        ]);
    }, [bondETFs, equityETFs]);

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
                <Header title="Phase Three: Build Your ETF Portfolio" />

                <Grid
                    container
                    spacing={3}
                    sx={{ alignItems: "stretch" }}
                >
                    <Grid size={{ xs: 12, md: 2 }}>
                        <Typography variant="h6" align="center" sx={{ mb: 2 }}>
                            Equity ETFs
                        </Typography>
                        <ETFTray type="equity_etfs" />
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
                        <Typography variant="h6" align="center" sx={{ mb: 2 }}>
                            Bond ETFs
                        </Typography>
                        <ETFTray type="bond_etfs" />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Typography variant="h6" align="center" sx={{ mb: 2 }}>
                            Your Portfolio
                        </Typography>
                        <ETFBasket />
                    </Grid>

                    <Grid size={{ xs: 12, md: 5 }}>
                        <Typography variant="h6" align="center" sx={{ mb: 2 }}>
                            Allocation Preview
                        </Typography>
                        <PiePreview data={allocations} />
                        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                onClick={() => navigate("/phase-four")}
                            >
                                Next
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default PortfolioBuilder;
