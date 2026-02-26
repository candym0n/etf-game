import ETFCard, { type ETF, type ETFType } from "./ETFCard";
import { usePortfolioStore } from "../../store/portfolioStore";
import { Box, Stack, Typography } from "@mui/material";
import investments from "../../assets/data/investments.json";
import type React from "react";

interface ETFTrayProps {
    type: ETFType
}

const ETFTray: React.FC<ETFTrayProps> = ({ type }) => {
    const addEquityETF = usePortfolioStore(state => state.addEquityETF);
    const addBondETF = usePortfolioStore(state => state.addBondETF);

    const etfs = investments[type] as ETF[];

    return (
        <Box
            sx={{
                width: "100%",
                height: "70vh",
                border: 1,
                borderColor: "grey.300",
                borderRadius: 2,
                bgcolor: "background.paper",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                p: 2,
                overflowY: "scroll",
            }}
        >
            <Typography variant="subtitle2" sx={{ mb: 1, color: "text.secondary" }}>
                Available 
            </Typography>

            <Box
                sx={{
                    flex: 1,
                    pr: 1, // a bit of space for scrollbar
                }}
            >
                <Stack
                    direction="column"
                    spacing={1.5}
                    sx={{ width: "100%" }}
                >
                    {etfs.map((etf: ETF) => (
                        <ETFCard
                            key={etf.ticker}
                            ticker={etf.ticker}
                            isAdd={true}
                            type={type}
                            onAction={() => type === "equity_etfs" ? addEquityETF(etf) : addBondETF(etf)}
                        />
                    ))}
                </Stack>
            </Box>
        </Box>
    );
};

export default ETFTray;
