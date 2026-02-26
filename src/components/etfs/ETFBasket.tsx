import ETFCard, { type ETF } from "./ETFCard";
import { usePortfolioStore } from "../../store/portfolioStore";
import { Box, Stack } from "@mui/material";

const ETFBasket = () => {
    const equityETFs = usePortfolioStore(state => state.equityETFs);
    const bondETFs = usePortfolioStore(state => state.bondETFs);
    const removeEquityETF = usePortfolioStore(state => state.removeEquityETF);
    const removeBondETF = usePortfolioStore(state => state.removeBondETF);

    return (
        <Box
            sx={{
                width: "100%",
                height: "70vh",
                border: "2px dotted",
                borderColor: "grey.400",
                borderRadius: 2,
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                color: "grey.500",
                bgcolor: "grey.50",
                boxSizing: "border-box",
                p: 2,
                overflowY: "auto",
                overflowX: "hidden",
            }}
        >
            <Stack
                direction="row"
                spacing={2}
                flexWrap="wrap"
                justifyContent="center"
                alignItems="stretch"
                sx={{ width: "100%", gap: 2 }}
            >
                {equityETFs.map((etf: ETF, index: number) => (
                    <ETFCard
                        key={etf.ticker + '-' + index}
                        ticker={etf.ticker}
                        type="equity_etfs"
                        isAdd={false}
                        onAction={() => removeEquityETF(index)}
                    />
                ))}
                
                {bondETFs.map((etf: ETF, index: number) => (
                    <ETFCard
                        key={etf.ticker + '-' + index}
                        ticker={etf.ticker}
                        type="bond_etfs"
                        isAdd={false}
                        onAction={() => removeBondETF(index)}
                    />
                ))}
            </Stack>
        </Box>
    );
};

export default ETFBasket;
