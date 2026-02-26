import StockCard, { type Stock } from "./StockCard";
import { useETFStore } from "../../store/etfStore";
import { Box, Stack } from "@mui/material";

const StockBasket = () => {
    const stocks: Stock[] = useETFStore(state => state.stocks);
    const removeStock = useETFStore(state => state.removeStock);

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
                {stocks.map((stock: Stock, index: number) => (
                    <StockCard
                        key={stock.ticker + '-' + index}
                        ticker={stock.ticker}
                        isAdd={false}
                        onAction={() => removeStock(index)}
                    />
                ))}
            </Stack>
        </Box>
    );
};

export default StockBasket;
