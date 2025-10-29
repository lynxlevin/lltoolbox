import { AppBar, Container, Dialog, FormLabel, Grid, TextField, Toolbar, Typography } from '@mui/material';
import Decimal from 'decimal.js';
import { useState } from 'react';

const DilutionCalculator = () => {
    const [originalConcentration, setOriginalConcentration] = useState<Decimal | null>(null);

    const pcr_1_te = originalConcentration === null ? '?' : `1 : ${originalConcentration.mul(10).minus(1)}`;
    const pcr_2_te = originalConcentration === null ? '?' : `2 : ${originalConcentration.mul(10).minus(1).mul(2)}`;

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
                        setOriginalConcentration(new Decimal(event.target.value));
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
                            {pcr_1_te}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>PCR産物 : TE(μL)</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h5" ml={3} color="red">
                            {pcr_2_te}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Dialog>
    );
};

export default DilutionCalculator;
