import StockCard, { type Stock } from "./StockCard";
import { useETFStore } from "../../store/etfStore";
import { Box, Stack, Typography } from "@mui/material";
import investments from "../../assets/data/investments.json";

const StockTray = () => {
  const stocks: Stock[] = investments.stocks as Stock[];
  const addStock = useETFStore((state) => state.addStock);

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
        Available Stocks
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
          {stocks.map((stock: Stock) => (
            <StockCard
              key={stock.ticker}
              ticker={stock.ticker}
              isAdd={true}
              onAction={() => addStock(stock)}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default StockTray;
