// src/components/PiePreview.tsx
import React from "react";
import { Box } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart"; // self-contained pie component [web:32][web:35]

export interface AllocationData {
    value: number,
    label: string
}

type PiePreviewProps = {
    data: AllocationData[];
}

const PiePreview: React.FC<PiePreviewProps> = ({ data }) => {
    const indexedData = data.map((val: AllocationData, id: number) => ({ ...val, id }));

    return (
        <Box sx={{ height: 400, p: 2, display: "flex", flexDirection: "column" }}>
            <Box sx={{ flex: 1 }}>
                <PieChart
                    height={320}
                    series={[
                        {
                            data: indexedData,
                            innerRadius: 60,
                            outerRadius: 140,
                            paddingAngle: 4,
                            cornerRadius: 4,
                        },
                    ]}
                />
            </Box>
        </Box>
    );
};

export default PiePreview;
