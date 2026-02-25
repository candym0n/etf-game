const DATA_SCALE_DOWN_FACTOR = 2;

import { useState, useMemo, useEffect } from "react";
import { LineChart, type LineSeries } from "@mui/x-charts/LineChart";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Typography,
  useTheme,
} from "@mui/material";
import market from "../assets/data/market.json";

interface GraphPreviewProps {
  stocks: string[];
}

type TimePeriod = "gfc" | "covid";

interface MarketPeriodData {
  dates: string[];
  stocks: Record<string, number[]>;
}

type MarketData = Record<TimePeriod, MarketPeriodData>;

const marketData = market as MarketData;

const UI_TIME_PERIODS: { id: number; label: string; period: TimePeriod }[] = [
  { id: 1, label: "Time period 1", period: "gfc" },
  { id: 2, label: "Time period 2", period: "covid" },
  { id: 3, label: "Time period 3", period: "gfc" },
  { id: 4, label: "Time period 4", period: "covid" },
  { id: 5, label: "Time period 5", period: "gfc" },
];

const ANIMATION_DURATION = 10000;
const ANIMATION_FPS = 30;

const GraphPreview: React.FC<GraphPreviewProps> = ({ stocks }) => {
  const theme = useTheme();
  const [selectedPeriodId, setSelectedPeriodId] = useState<number | "">("");
  const [activePeriod, setActivePeriod] = useState<TimePeriod | null>(null);
  const [visiblePoints, setVisiblePoints] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const { dates, stockSeriesFull } = useMemo(() => {
    if (!activePeriod) {
      return { dates: [] as string[], stockSeriesFull: [] as LineSeries[] };
    }

    const periodData = marketData[activePeriod];

    const scaledDates = periodData.dates.filter(
      (_, i) => i % DATA_SCALE_DOWN_FACTOR === 0,
    );

    const series: LineSeries[] = stocks
      .filter((ticker) => ticker in periodData.stocks)
      .map((ticker) => ({
        id: ticker,
        label: ticker,
        data: periodData.stocks[ticker].filter(
          (_, i) => i % DATA_SCALE_DOWN_FACTOR === 0,
        ),
        showMark: false,
      }));

    return {
      dates: scaledDates,
      stockSeriesFull: series,
    };
  }, [activePeriod, stocks]);

  const animatedSeries = useMemo<LineSeries[]>(() => {
    if (!dates.length || visiblePoints <= 0) return [];

    return stockSeriesFull.map((s) => ({
      ...s,
      data: s.data?.slice(0, visiblePoints),
    }));
  }, [stockSeriesFull, visiblePoints, dates.length]);

  useEffect(() => {
    if (!activePeriod || !dates.length) return;

    setIsAnimating(true);
    setVisiblePoints(0);

    const totalPoints = dates.length;
    const stepTime = 1000 / ANIMATION_FPS;
    const steps = Math.max(1, Math.floor(ANIMATION_DURATION / stepTime));
    const pointsPerStep = Math.max(1, Math.ceil(totalPoints / steps));

    let currentPoints = 0;

    const intervalId = window.setInterval(() => {
      currentPoints += pointsPerStep;

      if (currentPoints >= totalPoints) {
        currentPoints = totalPoints;
        setVisiblePoints(currentPoints);
        setIsAnimating(false);
        window.clearInterval(intervalId);
      } else {
        setVisiblePoints(currentPoints);
      }
    }, stepTime);

    return () => window.clearInterval(intervalId);
  }, [activePeriod, dates.length]);

  const handleTimePeriodChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    if (value === "") {
      setSelectedPeriodId("");
      return;
    }

    const id = Number(value);
    setSelectedPeriodId(id);
  };

  const handleGoClick = () => {
    if (selectedPeriodId === "") return;

    const period = UI_TIME_PERIODS.find((p) => p.id === selectedPeriodId);
    if (!period) return;

    setActivePeriod(period.period);
  };

  const selectLabelId = "time-period-select-label";
  const selectId = "time-period-select";

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Market preview
      </Typography>

      <LineChart
        height={400}
        xAxis={
          dates.length
            ? [
                {
                  data: dates,
                  scaleType: "band",
                  label: "Time",
                  tickInterval: (_, index) =>
                    index % (DATA_SCALE_DOWN_FACTOR * 5) === 0,
                },
              ]
            : []
        }
        series={animatedSeries}
        grid={{ horizontal: true }}
        showToolbar
        sx={{
          ".MuiChartsLegend-root": {
            bgcolor: theme.palette.background.default,
          },
        }}
      />

      <Box
        sx={{
          mt: 2,
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel id={selectLabelId}>Time period</InputLabel>
          <Select
            labelId={selectLabelId}
            id={selectId}
            value={selectedPeriodId === "" ? "" : String(selectedPeriodId)}
            label="Time period"
            onChange={handleTimePeriodChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {UI_TIME_PERIODS.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={handleGoClick}
          disabled={selectedPeriodId === "" || isAnimating}
        >
          {isAnimating ? "Animating..." : "Go"}
        </Button>
      </Box>
    </Box>
  );
};

export default GraphPreview;
