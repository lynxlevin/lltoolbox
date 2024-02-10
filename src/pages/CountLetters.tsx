import CloseIcon from '@mui/icons-material/Close';
import { AppBar, Button, Container, Dialog, Grid, IconButton, TextField, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialSelection = { start: 0, lineNumber: 0, columnNumber: 0 };

const CountLetters = () => {
    const navigate = useNavigate();

    const [text, setText] = useState<string>('');
    const [selection, setSelection] = useState(initialSelection);

    const updateSelectionStart = (e: React.SyntheticEvent<HTMLDivElement, Event>) => {
        const { selectionStart: start, selectionEnd: end } = e.target as HTMLTextAreaElement;
        const beforeSelection = text.slice(0, start);
        const newLineMatchesBefore = Array.from(beforeSelection.matchAll(/\n/g));
        const lineNumber = newLineMatchesBefore.length + 1;
        const startIndex = lineNumber === 1 ? 0 : newLineMatchesBefore.slice(-1)[0].index! + 1;
        const columnNumber = start - startIndex;
        setSelection({ start, lineNumber, columnNumber });
    };

    const lengthWithSpace = text.replace(/\n/g, '').length;
    const lengthWithoutSpace = text.replace(/\s|　/g, '').length;
    const newLineCount = text.match(/\n/g)?.length ?? 0;
    const lineCount = text.length > 0 ? newLineCount + 1 : 0;
    const paragraphMarkCount = text.match(/\n(?:　|\s+|「|『|＜|《|〈|≪|（|“|‘|\(|"|')./g)?.length ?? 0;
    const paragraphCount = text.length > 0 ? paragraphMarkCount + 1 : 0;

    return (
        <Dialog fullScreen open={true}>
            <AppBar position='sticky'>
                <Toolbar>
                    <IconButton
                        onClick={() => {
                            window.scroll({ top: 0 });
                            navigate('/');
                        }}
                        edge='start'
                        color='inherit'
                        aria-label='close'
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
                        文字数計測
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth='md' sx={{ mt: 3, mb: 3 }}>
                <TextField
                    label='テキスト'
                    value={text}
                    onChange={event => {
                        setText(event.target.value);
                    }}
                    onSelect={updateSelectionStart}
                    fullWidth
                    multiline
                    rows={8}
                />
                <Button
                    onClick={() => {
                        setText('');
                        setSelection(initialSelection);
                    }}
                    sx={{ ml: 'auto', display: 'block' }}
                >
                    クリア
                </Button>
                <Grid container spacing={2}>
                    <Grid item xs={7}>
                        <Typography>文字数（スペース込み）</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography>{lengthWithSpace}</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography>文字数（スペース無視）</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography>{lengthWithoutSpace}</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography>行数</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography>{lineCount}</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography>段落数</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography>{paragraphCount}</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography>カーソル位置</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography>全体の{selection.start}文字目</Typography>
                        <Typography>
                            {selection.lineNumber}行目の{selection.columnNumber}文字目
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Dialog>
    );
};

export default CountLetters;
