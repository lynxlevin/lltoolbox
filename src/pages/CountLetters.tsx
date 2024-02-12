import CloseIcon from '@mui/icons-material/Close';
import { AppBar, Button, Container, Dialog, FormControlLabel, Grid, IconButton, Stack, Switch, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CountLetters = () => {
    const navigate = useNavigate();

    const [input, setInput] = useState('');
    const [selection, setSelection] = useState('');
    const [willCountSelection, setWillCountSelection] = useState(true);

    // MYMEMO: debounce
    const updateSelection = (e: React.SyntheticEvent<HTMLDivElement, Event>) => {
        if (!willCountSelection) return;
        const { selectionStart, selectionEnd } = e.target as HTMLTextAreaElement;
        setSelection(input.slice(selectionStart, selectionEnd));
    };

    // MYMEMO: debounce
    // MYMEMO: 一つの処理にまとめた方がいいのかも。useMemoでObject? useStateのObjectを更新する形？
    const getLengthWithSpace = (text: string) => {
        // console.log('getLengthWithSpace');
        return text.replace(/\n/g, '').length.toLocaleString();
    };

    // MYMEMO: debounce
    const getLengthWithoutSpace = (text: string) => {
        return text.replace(/\s|　/g, '').length.toLocaleString();
    };

    // MYMEMO: debounce
    const getLineCount = (text: string) => {
        const newLineCount = text.replace(/\n$/, '').match(/\n/g)?.length ?? 0;
        return (text.length > 0 ? newLineCount + 1 : 0).toLocaleString();
    };

    // MYMEMO: debounce
    const getParagraphCount = (text: string) => {
        const paragraphMarkCount = text.match(/\n(?:　|\s+|「|『|＜|《|〈|≪|（|“|‘|\(|"|')./g)?.length ?? 0;
        return (text.length > 0 ? paragraphMarkCount + 1 : 0).toLocaleString();
    };

    const inputCounts = useMemo(() => {
        return {
            lengthWithSpace: getLengthWithSpace(input),
            lengthWithoutSpace: getLengthWithoutSpace(input),
            lineCount: getLineCount(input),
            paragraphCount: getParagraphCount(input),
        };
    }, [input]);

    // MYMEMO: 無駄な描画がないかチェック
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
                    onSelect={updateSelection}
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
                            <Tooltip title='動作が遅い場合は、オフにしてください。'>
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
                            <Typography>{getLengthWithSpace(selection)}</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography>文字数（スペース無視）</Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ textAlign: 'right' }}>
                            <Typography>{getLengthWithoutSpace(selection)}</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography>行数</Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ textAlign: 'right' }}>
                            <Typography>{getLineCount(selection)}</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography>段落数</Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ textAlign: 'right' }}>
                            <Typography>{getParagraphCount(selection)}</Typography>
                        </Grid>
                    </Grid>
                </Stack>
            </Container>
        </Dialog>
    );
};

export default CountLetters;
