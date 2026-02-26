import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import investments from '../../assets/data/investments.json';
import { useAppDialog } from '../../providers/DialogProvider';

export type ETFType = "equity_etfs" | "bond_etfs";

export interface ETF {
    ticker: string;
    name: string;
    type: ETFType;
    description: string;
}

interface ETFCardProps {
    ticker: string;
    onAction: () => void;          // used for add or remove
    isAdd?: boolean;               // true = add, false = remove
    type: ETFType;
}

const ETFCard: React.FC<ETFCardProps> = ({
    ticker,
    type,
    onAction,
    isAdd = true
}) => {
    const { showDialog } = useAppDialog();
    const etf: ETF | undefined = (investments[type] as ETF[]).find(
        (inv) => inv.ticker === ticker
    );

    if (!etf) return null;

    const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onAction();
        }
    };

    const isClickable = true;

    return (
        <Box
            onClick={onAction}
            role="button"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            sx={{
                position: 'relative',
                width: 120,
                height: 120,
                borderRadius: 3,
                bgcolor: 'background.paper',
                boxShadow: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 1,
                cursor: isClickable ? 'pointer' : 'default',
                overflow: 'hidden',
                outline: 'none',
                '&:focus-visible': isClickable
                    ? {
                        boxShadow: (theme) =>
                            `0 0 0 2px ${theme.palette.primary.main}`,
                    }
                    : undefined,
                '&:active': isClickable ? { transform: 'scale(0.98)' } : undefined,
            }}
        >
            <IconButton
                size="small"
                sx={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    bgcolor: 'background.paper',
                    boxShadow: 1,
                    '&:hover': { bgcolor: 'background.paper' },
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    onAction();
                }}
            >
                {isAdd ? (
                    <AddIcon fontSize="small" />
                ) : (
                    <DeleteIcon fontSize="small" />
                )}
            </IconButton>

            <IconButton
                size="small"
                sx={{
                    position: 'absolute',
                    top: 4,
                    left: 4,
                    bgcolor: 'background.paper',
                    boxShadow: 1,
                    '&:hover': { bgcolor: 'background.paper' },
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    showDialog([etf.description], etf.name);
                }}
            >
                <InfoOutlinedIcon fontSize="small" />
            </IconButton>
            <Typography
                variant="h6"
                align="center"
                sx={{
                    width: '100%',
                    height: '60%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: 0.5,
                    fontWeight: 600,
                    fontSize: 32,
                }}
            >
                {etf.ticker}
            </Typography>
            <Typography
                variant="body2"
                align="center"
                sx={{
                    width: '100%',
                    height: '60%',
                    display: 'flex',
                    alignItems: "flex-start",
                    justifyContent: 'center',
                    mt: 0.5,
                }}
            >
                {type === "equity_etfs" ? "Equity🏢 " : "Bond🛡️"}
            </Typography>
            <Typography
                variant="body2"
                align="center"
                sx={{
                    width: '100%',
                    px: 0.5,
                    pb: 0.5,
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                }}
            >
                {etf.name}
            </Typography>
        </Box>
    );
};

export default ETFCard;
