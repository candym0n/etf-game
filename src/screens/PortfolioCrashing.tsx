import {
    Container,
    Grid,
    Box,
    Typography,
    Paper,
    Button
} from "@mui/material";

import Header from "../components/Header";
import GraphPreview from "../components/GraphPreview";

import investments from "../assets/data/investments.json";
import { useStateStore } from "../store/stateStore";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import DataAnalysis from "../components/DataAnalysis";
import { usePortfolioStore } from "../store/portfolioStore";

import { type AllocationData } from "../components/PiePreview";

type ResultState = {
    title: string;
    body: string;
    tone: "success" | "error";
};

const SUCCESS_MESSAGE: ResultState = {
    title: "Nice diversification 🎉",
    body: "Your portfolio was well diversified, so its value continued to grow steadily.",
    tone: "success"
};

const FAILURE_MESSAGE: ResultState = {
    title: "Your portfolio took a hit 📉",
    body: "You concentrated too much in equity ETFs, so your portfolio was facing some serious risk.",
    tone: "error"
};

const PortfolioCrashing = () => {
    const crashed = useStateStore(state => state.simulationPlayed);
    const acknowledgeCrash = useStateStore(state => state.playSimulation);
    const [result, setResult] = useState<ResultState | null>(null);
    const equityETFs = usePortfolioStore(state => state.equityETFs);
    const bondETFs = usePortfolioStore(state => state.bondETFs);
    const [allocations, setAllocations] = useState<AllocationData[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
            setAllocations([
                { label: "Bond ETFs", value: bondETFs.length },
                { label: "Equity ETFs", value: equityETFs.length }
            ]);
        }, [bondETFs, equityETFs]);

    const onCrash = () => {
        if (crashed) {
            setResult(SUCCESS_MESSAGE);
        } else {
            setResult(FAILURE_MESSAGE);
            acknowledgeCrash();
        }
    };

    const isSuccess = result?.tone === "success";

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
                <Header title="Phase Four: Test your portfolio against the market!" />

                <Grid
                    container
                    spacing={3}
                    sx={{ alignItems: "stretch" }}
                >
                    <Grid size={{ xs: 12, md: 12 }}>
                        <GraphPreview
                            onCrash={onCrash}
                            showPortfolio
                            equityETFs={investments.equity_etfs.map(a => a.ticker)}
                            bondETFs={investments.bond_etfs.map(a => a.ticker)}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        {result && (
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 2,
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    bgcolor: "background.paper",
                                    borderRadius: 3,
                                    border: 1,
                                    borderColor: isSuccess ? "success.light" : "error.light"
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 1,
                                        color: "black"
                                    }}
                                >
                                    {result.title}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: "black"
                                    }}
                                >
                                    {result.body}
                                </Typography>

                                <Button
                                    variant="contained"
                                    color={isSuccess ? "success" : "error"}
                                    onClick={() => navigate(isSuccess ? "/finish" : "/phase-three")}
                                >
                                    {isSuccess ? "Continue" : "Try Again"}
                                </Button>
                            </Paper>
                        )}
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        {result && <DataAnalysis equityETFs={equityETFs} bondETFs={bondETFs} allocData={allocations} period={"covid"} /> /* Yes, I know. Sorry. */}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default PortfolioCrashing;
