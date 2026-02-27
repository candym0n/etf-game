// CelebrationScreen.tsx
import React from "react";
import {
    Box,
    Typography,
    Button,
    Chip,
    Stack,
    Paper,
    IconButton,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import StarIcon from "@mui/icons-material/Star";
import PaidIcon from "@mui/icons-material/Paid";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import CloseIcon from "@mui/icons-material/Close";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

const etfTickers = ["SPY", "QQQ", "VTI", "ARKK", "GLD", "XLV", "XLF", "IWM"];
const etfTags = [
    "Low fees",
    "Diversified",
    "Broad market",
    "Long-term",
    "Awesome",
];

const CelebrationScreen = () => {
    const [width, height] = [
        typeof window !== "undefined" ? window.innerWidth : 1920,
        typeof window !== "undefined" ? window.innerHeight : 1080,
    ];
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const navigate = useNavigate();

    const onClose = () => {
        navigate("/");
    }

    return (
        <Box
            sx={{
                position: "fixed",
                inset: 0,
                zIndex: 1400,
                bgcolor:
                    "radial-gradient(circle at top, #001b48 0%, #000814 45%, #000000 100%)",
                color: "common.white",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
            }}
        >
            {/* Confetti */}
            <Confetti
                width={width}
                height={height}
                numberOfPieces={550}
                gravity={0.3}
                recycle={false}
                colors={["#00e676", "#00b0ff", "#ffea00", "#ff4081", "#7c4dff"]}
            />

            {/* Sparkle particles */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    mixBlendMode: "screen",
                    opacity: 0.4,
                }}
            >
                {Array.from({ length: 90 }).map((_, i) => (
                    <Box
                        key={i}
                        sx={{
                            position: "absolute",
                            width: 3,
                            height: 3,
                            borderRadius: "50%",
                            bgcolor: i % 3 === 0 ? "#ffea00" : "#00e676",
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            boxShadow: "0 0 14px currentColor",
                            animation: `sparkle 3.4s ease-in-out ${Math.random() * 2}s infinite`,
                        }}
                    />
                ))}
            </Box>

            {/* Floating gradient orbs */}
            <Box
                sx={{
                    position: "absolute",
                    width: 360,
                    height: 360,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(0,230,118,0.55), rgba(0,0,0,0))",
                    top: -80,
                    left: -40,
                    filter: "blur(2px)",
                    animation: "floatOrb1 12s ease-in-out infinite",
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    width: 440,
                    height: 440,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(0,176,255,0.45), rgba(0,0,0,0))",
                    bottom: -160,
                    right: -60,
                    filter: "blur(3px)",
                    animation: "floatOrb2 14s ease-in-out infinite",
                }}
            />

            {/* Background tickers */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.14,
                    pointerEvents: "none",
                    fontFamily: "monospace",
                }}
            >
                {Array.from({ length: 7 }).map((_, row) => (
                    <Box
                        key={row}
                        sx={{
                            position: "absolute",
                            whiteSpace: "nowrap",
                            top: `${row * 14}%`,
                            animation: `scrollTicker${row % 2 === 0 ? "Left" : "Right"
                                } ${30 + row * 3}s linear infinite`,
                        }}
                    >
                        {Array.from({ length: 40 }).map((__, i) => {
                            const ticker = etfTickers[(row + i) % etfTickers.length];
                            const change = (Math.random() * 4 - 1.5).toFixed(2);
                            const positive = Number(change) >= 0;
                            return (
                                <Typography
                                    key={`${row}-${i}`}
                                    component="span"
                                    sx={{
                                        mx: 2,
                                        color: positive ? "#00e676" : "#ff5252",
                                        fontSize: 14,
                                        textShadow: "0 0 8px rgba(0,0,0,0.8)",
                                    }}
                                >
                                    {ticker} {positive ? "▲" : "▼"} {change}%
                                </Typography>
                            );
                        })}
                    </Box>
                ))}
            </Box>

            {/* Main card */}
            <Paper
                elevation={24}
                sx={{
                    position: "relative",
                    maxWidth: 780,
                    width: "100%",
                    borderRadius: 4,
                    p: { xs: 3, sm: 5 },
                    backdropFilter: "blur(22px)",
                    background:
                        "linear-gradient(145deg, rgba(3, 37, 65, 0.94), rgba(0, 0, 0, 0.98))",
                    border: "1px solid rgba(144, 202, 249, 0.4)",
                    boxShadow:
                        "0 0 0 1px rgba(255,255,255,0.06), 0 42px 140px rgba(0,0,0,0.95)",
                    overflow: "hidden",
                    animation: "cardPulse 6s ease-in-out infinite",
                }}
            >
                {/* Glow ring inside card */}
                <Box
                    sx={{
                        position: "absolute",
                        inset: -60,
                        background:
                            "radial-gradient(circle at 50% -10%, rgba(255,234,0,0.16), transparent 60%)",
                        opacity: 0.9,
                        pointerEvents: "none",
                    }}
                />

                {/* Close */}
                {onClose && (
                    <IconButton
                        onClick={onClose}
                        size="small"
                        sx={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            color: "rgba(255,255,255,0.7)",
                            backdropFilter: "blur(8px)",
                            bgcolor: "rgba(0,0,0,0.35)",
                            "&:hover": {
                                color: "common.white",
                                bgcolor: "rgba(255,255,255,0.08)",
                            },
                        }}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                )}

                {/* Top row: pill + mini stats */}
                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mb: 3, position: "relative", zIndex: 1 }}
                >
                    <Chip
                        icon={<RocketLaunchIcon />}
                        label="ETF GAME COMPLETE"
                        color="success"
                        variant="outlined"
                        sx={{
                            fontWeight: 800,
                            letterSpacing: 2,
                            borderRadius: 999,
                            borderColor: "rgba(129,199,132,0.9)",
                            textTransform: "uppercase",
                            fontSize: 11,
                            bgcolor: "rgba(0,0,0,0.7)",
                            boxShadow: "0 0 16px rgba(0,230,118,0.32)",
                        }}
                    />

                    <Stack
                        direction="row"
                        spacing={1.2}
                        alignItems="center"
                        sx={{ display: { xs: "none", sm: "flex" } }}
                    >
                        <StatPill label="Risk" value="Balanced" neutral />
                        <StatPill label="Fees" value="Low" positive />
                        <StatPill label="Enjoyment" value="Phenomenal" positive />
                    </Stack>
                </Stack>

                {/* Center content */}
                <Box
                    sx={{
                        textAlign: "center",
                        mb: 4,
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    {/* Rotating medal stack */}
                    <Box
                        sx={{
                            mb: 2.5,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                        }}
                    >
                        <Box
                            sx={{
                                width: isMobile ? 72 : 84,
                                height: isMobile ? 72 : 84,
                                borderRadius: "50%",
                                background:
                                    "conic-gradient(from 180deg, #ffea00, #00e676, #00b0ff, #ff4081, #ffea00)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                animation: "rotateMedal 14s linear infinite",
                                boxShadow:
                                    "0 0 24px rgba(255,234,0,0.5), 0 0 60px rgba(0,176,255,0.6)",
                            }}
                        >
                            <Box
                                sx={{
                                    width: "74%",
                                    height: "74%",
                                    borderRadius: "50%",
                                    bgcolor: "rgba(0,0,0,0.9)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    border: "2px solid rgba(255,255,255,0.35)",
                                }}
                            >
                                <PaidIcon sx={{ fontSize: isMobile ? 34 : 40, color: "#ffea00" }} />
                            </Box>
                        </Box>

                        {/* Orbiting icons */}
                        <CandlestickChartIcon
                            sx={{
                                position: "absolute",
                                top: -10,
                                right: -10,
                                fontSize: 26,
                                color: "#00e676",
                                filter: "drop-shadow(0 0 10px rgba(0,230,118,0.7))",
                                animation: "orbitSmall 9s linear infinite",
                            }}
                        />
                        <ShowChartIcon
                            sx={{
                                position: "absolute",
                                bottom: -4,
                                left: -12,
                                fontSize: 22,
                                color: "#00b0ff",
                                filter: "drop-shadow(0 0 12px rgba(0,176,255,0.8))",
                                animation: "orbitSmallReverse 11s linear infinite",
                            }}
                        />
                    </Box>

                    {/* Title */}
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 900,
                            fontSize: { xs: 30, sm: 40 },
                            letterSpacing: 1.5,
                            mb: 1,
                            textTransform: "uppercase",
                            background:
                                "linear-gradient(90deg, #ffea00, #00e676, #00b0ff, #ff4081, #ffea00)",
                            backgroundSize: "320% 100%",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                            animation: "shimmerText 6.5s linear infinite, glitch 2.7s infinite",
                        }}
                    >
                        Thanks for playing!
                    </Typography>

                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: "rgba(255,255,255,0.84)",
                            maxWidth: 560,
                            mx: "auto",
                            lineHeight: 1.6,
                        }}
                    >
                        You took control of your financial future by learning how to use ETFs,
                        research, and smart investing to grow your wealth over time. You lowered
                        your risk through diversification, so one bad company couldn&apos;t
                        destroy your progress.
                    </Typography>
                </Box>

                {/* ETF tag cloud */}
                <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    useFlexGap
                    sx={{ mb: 3, position: "relative", zIndex: 1 }}
                >
                    {etfTags.map((tag, idx) => (
                        <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            icon={<StarIcon sx={{ fontSize: 16 }} />}
                            sx={{
                                mb: 1,
                                borderRadius: 999,
                                bgcolor: "rgba(0,0,0,0.7)",
                                border: "1px solid rgba(255,255,255,0.24)",
                                color: "rgba(255,255,255,0.9)",
                                textTransform: "uppercase",
                                fontSize: 11,
                                animation: `tagPop 0.6s ease-out ${0.08 * idx}s both`,
                            }}
                        />
                    ))}
                </Stack>

                {/* Bottom: description + buttons */}
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2.5}
                    alignItems={{ xs: "stretch", sm: "center" }}
                    justifyContent="space-between"
                    sx={{ position: "relative", zIndex: 1 }}
                >
                    <Stack direction="row" spacing={1.4} alignItems="center">
                        <Box
                            sx={{
                                width: 44,
                                height: 44,
                                borderRadius: "50%",
                                bgcolor: "rgba(0,0,0,0.8)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "1px solid rgba(255,255,255,0.28)",
                                boxShadow: "0 0 16px rgba(0,0,0,0.9)",
                            }}
                        >
                            <CandlestickChartIcon sx={{ fontSize: 26, color: "#00e676" }} />
                        </Box>
                        <Box>
                            <Typography
                                variant="body2"
                                sx={{ color: "rgba(255,255,255,0.9)", fontWeight: 600 }}
                            >
                                ETF Game
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}
                            >
                                Unlock the benefits, risks, and best practices that turn ETFs into a
                                long-term wealth engine.
                            </Typography>
                        </Box>
                    </Stack>

                    <Stack
                        direction={{ xs: "column-reverse", sm: "row" }}
                        spacing={1.5}
                        alignItems="stretch"
                    >

                        <Button
                            variant="contained"
                            endIcon={<TrendingUpIcon />}
                            onClick={onClose}
                            sx={{
                                borderRadius: 999,
                                px: 4,
                                fontWeight: 800,
                                letterSpacing: 0.4,
                                textTransform: "uppercase",
                                background:
                                    "linear-gradient(135deg, #00e676, #00b0ff, #ffea00, #ff4081)",
                                backgroundSize: "200% 100%",
                                boxShadow:
                                    "0 0 0 1px rgba(0,0,0,0.35), 0 18px 52px rgba(0,0,0,1)",
                                animation: "ctaPulse 2.6s ease-in-out infinite",
                                "&:hover": {
                                    background:
                                        "linear-gradient(135deg, #00c853, #0091ea, #ffd600, #f50057)",
                                    backgroundSize: "220% 100%",
                                },
                            }}
                        >
                            Play again
                        </Button>
                    </Stack>
                </Stack>
            </Paper>

            {/* Keyframes */}
            <style>
                {`
          @keyframes shimmerText {
            0% { background-position: 0% 50%; }
            100% { background-position: 320% 50%; }
          }

          @keyframes floatOrb1 {
            0%,100% { transform: translate3d(0,0,0) scale(1); }
            50% { transform: translate3d(40px,40px,0) scale(1.08); }
          }
          @keyframes floatOrb2 {
            0%,100% { transform: translate3d(0,0,0) scale(1); }
            50% { transform: translate3d(-60px,-20px,0) scale(1.12); }
          }

          @keyframes scrollTickerLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes scrollTickerRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }

          @keyframes sparkle {
            0%, 100% { opacity: 0.1; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.4); }
          }

          @keyframes rotateMedal {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes orbitSmall {
            0% { transform: translate3d(0,0,0); }
            50% { transform: translate3d(6px,-6px,0); }
            100% { transform: translate3d(0,0,0); }
          }
          @keyframes orbitSmallReverse {
            0% { transform: translate3d(0,0,0); }
            50% { transform: translate3d(-6px,4px,0); }
            100% { transform: translate3d(0,0,0); }
          }

          @keyframes cardPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.01); }
          }

          @keyframes ctaPulse {
            0%, 100% { transform: translateY(0); box-shadow: 0 18px 52px rgba(0,0,0,1); }
            50% { transform: translateY(-2px); box-shadow: 0 26px 66px rgba(0,0,0,1); }
          }

          @keyframes tagPop {
            0% { opacity: 0; transform: translateY(6px) scale(0.9); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }

          @keyframes glitch {
            0% { text-shadow: 0 0 transparent; }
            16% { text-shadow: 1px 0 #ff4081, -2px 0 #00e676; }
            17% { text-shadow: -1px 0 #ffea00, 2px 0 #00b0ff; }
            18% { text-shadow: 0 0 transparent; }
            60% { text-shadow: 0 0 transparent; }
            61% { text-shadow: -1px 0 #ff4081, 3px 0 #00b0ff; }
            62% { text-shadow: 2px 0 #ffea00, -2px 0 #00e676; }
            63% { text-shadow: 0 0 transparent; }
            100% { text-shadow: 0 0 transparent; }
          }
        `}
            </style>
        </Box>
    );
};

type StatPillProps = {
    label: string;
    value: string;
    positive?: boolean;
    neutral?: boolean;
};

const StatPill: React.FC<StatPillProps> = ({
    label,
    value,
    positive,
    neutral,
}) => {
    const color = neutral
        ? "rgba(255,255,255,0.9)"
        : positive
            ? "#00e676"
            : "#ff5252";

    return (
        <Box
            sx={{
                px: 1.6,
                py: 0.8,
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.25)",
                bgcolor: "rgba(0,0,0,0.7)",
                minWidth: 90,
            }}
        >
            <Typography
                variant="caption"
                sx={{
                    color: "rgba(255,255,255,0.7)",
                    textTransform: "uppercase",
                    letterSpacing: 0.6,
                }}
            >
                {label}
            </Typography>
            <Typography
                variant="body2"
                sx={{ fontWeight: 700, color, lineHeight: 1.3 }}
            >
                {value}
            </Typography>
        </Box>
    );
};

export default CelebrationScreen;
