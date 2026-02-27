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
import StockBasket from "../components/stock/StockBasket";
import StockTray from "../components/stock/StockTray";
import { type Stock } from "../components/stock/StockCard";
import { useETFStore } from "../store/etfStore";
import { useNavigate } from "react-router-dom";
import { useAppDialog } from "../providers/DialogProvider";
import { useStateStore } from "../store/stateStore";

const ETFBuilder: React.FC = () => {
    const stocks = useETFStore(state => state.stocks);
    const [allocations, setAllocations] = useState<AllocationData[]>([]);
    const navigate = useNavigate();
    const { showDialog } = useAppDialog();
    const crashed = useStateStore(state => state.simulationPlayed);

    useEffect(() => {
        // Show some instructions / welcome
        crashed || showDialog([
            "<b>Exchanged Traded Funds (ETFs)</b> are like baskets of securities: stocks, bonds, bundled into a single investment.",
            "ETFs trade like stocks but hold bundles of assets, usually with lower fees than mutual funds.",
            "They come in many types, but you'll start with <b>equity ETFs</b> that track market indexes.",
            "Select stocks from the list on the left to build your ETF basket."
        ], "Build your ETF");
    }, []);

    // TODO: Wrap in helper function? Also used in the other 3 phases
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
                <Header title="Phase One: Build an Equity ETF" />

                <Grid
                    container
                    spacing={3}
                    sx={{ alignItems: "stretch" }}
                >
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Typography variant="h6" align="center" sx={{ mb: 2 }}>
                            Stocks
                        </Typography>
                        <StockTray />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h6" align="center" sx={{ mb: 2 }}>
                            Your ETF
                        </Typography>
                        <StockBasket />
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
                                onClick={() => navigate("/phase-two")}
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

export default ETFBuilder;
