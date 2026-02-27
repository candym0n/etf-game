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
import DataAnalysis from "../components/DataAnalysis";
import investments from "../assets/data/investments.json";
import { useStateStore } from "../store/stateStore";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useETFStore } from "../store/etfStore";
import { type Stock } from "../components/stock/StockCard";
import { type AllocationData } from "../components/PiePreview";

type ResultState = {
    title: string;
    body: string;
    tone: "success" | "error";
};

const SUCCESS_MESSAGE: ResultState = {
    title: "Nice diversification 🎉",
    body: "Your ETF was well diversified, so it was less prone to risk.",
    tone: "success"
};

const FAILURE_MESSAGE: ResultState = {
    title: "Your ETF took a hit 📉",
    body: "You concentrated too much in bank stocks, so your ETF was very volatile.",
    tone: "error"
};

const ETFCrashing = () => {
    const stocks = useETFStore(state => state.stocks);
    const crashed = useStateStore(state => state.simulationPlayed);
    const acknowledgeCrash = useStateStore(state => state.playSimulation);
    const resetSimulation = useStateStore(state => state.resetSimulation);
    const [result, setResult] = useState<ResultState | null>(null);
    const [allocations, setAllocations] = useState<AllocationData[]>([]);
    const navigate = useNavigate();

    const onCrash = () => {
        if (crashed) {
            setResult(SUCCESS_MESSAGE);
        } else {
            setResult(FAILURE_MESSAGE);
            acknowledgeCrash();
        }
    };

    const isSuccess = result?.tone === "success";

    useEffect(() => {
        if (!stocks.length)
            return void setAllocations([{
                label: "Nothing",
                value: 1
            }]);

        const countByField = stocks.reduce<Record<Stock['field'], number>>((accum, curr) => {
            accum[curr.field] = (accum[curr.field] || 0) + 1;
            return accum;
        }, {});

        setAllocations(Object.entries(countByField).map(([field, count]) => ({
            label: field,
            value: count
        })));
    }, [stocks]);

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
                        <GraphPreview
                            onCrash={onCrash}
                            showETF
                            equityETFs={["SPX"]}
                            stocks={investments.stocks.map(a => a.ticker)}
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
                                    onClick={() => navigate(isSuccess ? (resetSimulation(), "/phase-three") : "/phase-one")}
                                >
                                    {isSuccess ? "Continue" : "Try Again"}
                                </Button>
                            </Paper>
                        )}
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        {result && <DataAnalysis data={allocations} />}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default ETFCrashing;
