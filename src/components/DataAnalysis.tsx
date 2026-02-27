import React, { useState, useEffect } from "react";
import { Paper, Typography, Box } from "@mui/material";
import { type AllocationData } from "./PiePreview";

interface DataAnalysisProps {
    data: AllocationData[];
}

interface AnalysisData {
    maxDiversification: {
        field: string,
        percent: number
    }
}

const DataAnalysis: React.FC<DataAnalysisProps> = ({ data }) => {
    const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

    useEffect(() => {
        let maxDiversification: AnalysisData["maxDiversification"];

        const maximumField = data.sort((
            prev: AllocationData,
            curr: AllocationData) =>
                curr.value - prev.value
        )[0];

        const totalElements = data.reduce((accum: number, curr: AllocationData) => accum + curr.value, 0);

        maxDiversification = {
            field: maximumField.label,
            percent: maximumField.value / totalElements
        }

        setAnalysisData({
            maxDiversification
        })
    }, [data]);

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
                Maximum Field: { analysisData?.maxDiversification.field } by: 
                <Box component="span" sx={{
                    color: analysisData?.maxDiversification.percent! >= 0.3 ? "red" : "blue",
                }}>{Math.round(analysisData?.maxDiversification.percent! * 100)}%</Box>
            </Typography>
        </Paper>
    )
}

export default DataAnalysis;
