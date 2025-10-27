import { AppBar, Container, Dialog, FormLabel, Grid, TextField, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';

const DilutionCalculator = () => {
    const [originalConcentration, setOriginalConcentration] = useState(0);

    return (
        <Dialog fullScreen open={true}>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        希釈計算
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container sx={{ mt: 3, mb: 3 }}>
                <FormLabel>元の濃度 (ng/μL)</FormLabel>
                <TextField
                    defaultValue={originalConcentration}
                    onBlur={event => {
                        setOriginalConcentration(Number(event.target.value));
                    }}
                    fullWidth
                />
                <Grid container>
                    <Grid item xs={6}>
                        <Typography>希釈後濃度(ng/μL)</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" ml={3}>
                            0.1
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>PCR産物 : TE(μL)</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" ml={3}>
                            {originalConcentration === 0 ? '?' : `1 : ${originalConcentration * 10 - 1}`}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>PCR産物 : TE(μL)</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h5" ml={3} color="red">
                            {originalConcentration === 0 ? '?' : `2 : ${(originalConcentration * 10 - 1) * 2}`}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Dialog>
    );
};

export default DilutionCalculator;
