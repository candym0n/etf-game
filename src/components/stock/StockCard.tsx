import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import investments from '../../assets/data/investments.json';

export interface Stock {
    ticker: string;
    name: string;
    logo: string;
    field: string;
}

interface StockCardProps {
    ticker: string;
    onAction: () => void; // used for add or remove
    isAdd?: boolean;      // true = add, false = remove
}

const StockCard: React.FC<StockCardProps> = ({
    ticker,
    onAction,
    isAdd = true,
}) => {
    const stock: Stock | undefined = (investments.stocks as Stock[]).find(
        (inv) => inv.ticker === ticker
    );

    if (!stock) return null;

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
                    pointerEvents: 'none',
                }}
            >
                {isAdd ? (
                    <AddIcon fontSize="small" />
                ) : (
                    <DeleteIcon fontSize="small" />
                )}
            </IconButton>

            <Box
                component="img"
                src={stock.logo}
                alt={stock.name}
                sx={{
                    width: '80%',
                    height: '60%',
                    objectFit: 'contain',
                    borderRadius: 2,
                    mt: 0.5,
                }}
            />
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
                {stock.name}
            </Typography>
        </Box>
    );
};

export default StockCard;
