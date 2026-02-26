import React, { createContext, useContext, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

type DialogContextValue = {
    showDialog: (messages: string[], title?: string) => void;
};

const DialogContext = createContext<DialogContextValue | undefined>(undefined);

const useAppDialog = () => {
    const ctx = useContext(DialogContext);
    if (!ctx) {
        throw new Error("useAppDialog must be used within DialogProvider");
    }
    return ctx;
};

const DialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [index, setIndex] = useState(0);
    const [title, setTitle] = useState<string | undefined>(undefined);

    const showDialog = (msgs: string[], t?: string) => {
        if (!msgs.length) return;
        setMessages(msgs);
        setIndex(0);
        setTitle(t);
        setOpen(true);
    };

    const handleClose = () => {
        if (index < messages.length - 1) {
            setIndex((i) => i + 1);
        } else {
            setOpen(false);
            setMessages([]);
            setIndex(0);
            setTitle(undefined);
        }
    };

    const value: DialogContextValue = { showDialog };

    return (
        <DialogContext.Provider value={value}>
            {children}
            <Dialog open={open} onClose={handleClose}>
                {title && <DialogTitle>{title}</DialogTitle>}
                <DialogContent dangerouslySetInnerHTML={{
                    __html: messages[index]
                }} />
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </DialogContext.Provider>
    );
};

export { DialogProvider, useAppDialog };
