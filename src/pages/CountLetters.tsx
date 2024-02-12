import CloseIcon from '@mui/icons-material/Close';
import { AppBar, Button, Container, Dialog, FormControlLabel, Grid, IconButton, Stack, Switch, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce, useDebouncedCallback } from 'use-debounce';

const CountLetters = () => {
    const navigate = useNavigate();

    const [input, setInput] = useState('');
    const [selection, setSelection] = useState('');
    const [willCountSelection, setWillCountSelection] = useState(true);
    const [inputDebounce] = useDebounce(input, 500);

    const updateSelection = useDebouncedCallback((e: React.SyntheticEvent<HTMLDivElement, Event>) => {
        const { selectionStart, selectionEnd } = e.target as HTMLTextAreaElement;
        setSelection(input.slice(selectionStart, selectionEnd));
    }, 300); // Should be faster than input (500ms).

    const getLengthWithSpace = (text: string) => {
        return text.replace(/\n/g, '').length.toLocaleString();
    };

    const getLengthWithoutSpace = (text: string) => {
        return text.replace(/\s|　/g, '').length.toLocaleString();
    };

    const getLineCount = (text: string) => {
        const newLineCount = text.replace(/\n$/, '').match(/\n/g)?.length ?? 0;
        return (text.length > 0 ? newLineCount + 1 : 0).toLocaleString();
    };

    const getParagraphCount = (text: string) => {
        const paragraphMarkCount = text.match(/\n(?:　|\s+|「|『|＜|《|〈|≪|（|“|‘|\(|"|')./g)?.length ?? 0;
        return (text.length > 0 ? paragraphMarkCount + 1 : 0).toLocaleString();
    };

    const inputCounts = useMemo(() => {
        return {
            lengthWithSpace: getLengthWithSpace(inputDebounce),
            lengthWithoutSpace: getLengthWithoutSpace(inputDebounce),
            lineCount: getLineCount(inputDebounce),
            paragraphCount: getParagraphCount(inputDebounce),
        };
    }, [inputDebounce]);

    const selectionCounts = useMemo(() => {
        return {
            lengthWithSpace: getLengthWithSpace(selection),
            lengthWithoutSpace: getLengthWithoutSpace(selection),
            lineCount: getLineCount(selection),
            paragraphCount: getParagraphCount(selection),
        };
    }, [selection]);

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
            <Container sx={{ mt: 3, mb: 3 }}>
                <TextField
                    label='テキスト'
                    value={input}
                    onChange={event => {
                        setInput(event.target.value);
                    }}
                    onSelect={willCountSelection ? updateSelection : undefined}
                    fullWidth
                    multiline
                    minRows={8}
                    maxRows={16}
                />
                <Button
                    onClick={() => {
                        setInput('');
                        setSelection('');
                    }}
                    sx={{ ml: 'auto', display: 'block' }}
                >
                    クリア
                </Button>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={5} maxWidth='md' sx={{ ml: 'auto', mr: 'auto' }}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant='h6'>全文</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography>文字数（スペース込み）</Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ textAlign: 'right' }}>
                            <Typography>{inputCounts.lengthWithSpace}</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography>文字数（スペース無視）</Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ textAlign: 'right' }}>
                            <Typography>{inputCounts.lengthWithoutSpace}</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography>行数</Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ textAlign: 'right' }}>
                            <Typography>{inputCounts.lineCount}</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography>段落数</Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ textAlign: 'right' }}>
                            <Typography>{inputCounts.paragraphCount}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography variant='h6'>選択範囲</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ textAlign: 'right' }}>
                            <Tooltip title='動作が遅く感じる場合は、オフにしてみてください。'>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={willCountSelection}
                                            onChange={e => {
                                                setWillCountSelection(e.target.checked);
                                                setSelection('');
                                            }}
                                        />
                                    }
                                    label='計測'
                                />
                            </Tooltip>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography>文字数（スペース込み）</Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ textAlign: 'right' }}>
                            <Typography>{selectionCounts.lengthWithSpace}</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography>文字数（スペース無視）</Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ textAlign: 'right' }}>
                            <Typography>{selectionCounts.lengthWithoutSpace}</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography>行数</Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ textAlign: 'right' }}>
                            <Typography>{selectionCounts.lineCount}</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography>段落数</Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ textAlign: 'right' }}>
                            <Typography>{selectionCounts.paragraphCount}</Typography>
                        </Grid>
                    </Grid>
                </Stack>
            </Container>
        </Dialog>
    );
};

export default CountLetters;
