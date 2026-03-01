import React, { useState, useEffect } from "react";
import { Paper, Typography, Box } from "@mui/material";
import market from "../assets/data/market.json";
import { type AllocationData } from "./PiePreview";
import { type Stock } from "./stock/StockCard";
import { type ETF } from "./etfs/ETFCard";

interface DataAnalysisProps {
    allocData: AllocationData[];
    stocks?: Stock[];
    equityETFs?: ETF[];
    bondETFs?: ETF[];
    period: "gfc" | "covid";
}

interface AnalysisData {
    maxDiversification: {
        field: string,
        percent: number
    },
    HHIndex: number,
    ROI: number
}

const DataAnalysis: React.FC<DataAnalysisProps> = ({ allocData, stocks = [], equityETFs = [], bondETFs = [], period }) => {
    const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

    useEffect(() => {
        let maxDiversification: AnalysisData["maxDiversification"];

        const maximumField = allocData.sort((
            prev: AllocationData,
            curr: AllocationData) =>
            curr.value - prev.value
        )[0];

        const totalElements = allocData.reduce((accum: number, curr: AllocationData) => accum + curr.value, 0);

        maxDiversification = {
            field: maximumField.label,
            percent: maximumField.value / totalElements
        }

        const lastDay = market[period].dates.length - 1;

        let returnOnInvestment: AnalysisData["ROI"] = (
            stocks.reduce((accum, curr) => accum + (market[period].stocks as Record<string, number[]>)[curr.ticker][lastDay], 0) +
            equityETFs.reduce((accum, curr) => accum + (market[period].equity_etfs as Record<string, number[]>)[curr.ticker][lastDay], 0) +
            bondETFs.reduce((accum, curr) => accum + (market[period].bond_etfs as Record<string, number[]>)[curr.ticker][lastDay], 0)
        ) / (stocks.length + equityETFs.length + bondETFs.length) / 100 - 1;
        let HHIndex: AnalysisData["HHIndex"] = allocData.reduce((accum, curr) => accum + curr.value * curr.value, 0) / (stocks.length + equityETFs.length + bondETFs.length) ** 2;

        setAnalysisData({
            maxDiversification,
            ROI: returnOnInvestment,
            HHIndex
        })
    }, [allocData]);

    return (
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
                border: 1
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
                Analysis
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    color: "black"
                }}
            >
                <b>Dominant Field:</b> {analysisData?.maxDiversification.field} (
                <Box component="span" sx={{
                    color: analysisData?.maxDiversification.percent! > 0.5 ? "red" : "green",
                }}>{Math.round(analysisData?.maxDiversification.percent! * 100)}%</Box>)<br />
                <b>Diversification:</b> <Box component="span" sx={{
                    color: analysisData?.HHIndex! > 0.5 ? "red" : "green",
                }}>{Math.round(100 - analysisData?.HHIndex! * 100)}%</Box><br />
                <b>Return on Investment:</b> <Box component="span" sx={{
                    color: analysisData?.ROI! <= 0 ? "red" : "green",
                }}>{Math.round(analysisData?.ROI! * 100)}%</Box>
            </Typography>
        </Paper>
    )
}

export default DataAnalysis;
