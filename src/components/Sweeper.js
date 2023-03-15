import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Container } from '@mui/system';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

function randomInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Row = ({ items, xs, md, handlePress }) => {
    return items.map(({ cell, bomb }) => (
        <Grid item xs={xs} md={md} key={cell}>
            <Item><Button sx={{ width: "100%", backgroundColor: bomb ? 'red' : 'white' }} onClick={() => handlePress(cell)}>.</Button></Item>
        </Grid>
    ))
}

export default function Sweeper({ size }) {

    function handlePress(text) {
    }

    const grid = new Array(size * size).fill(0).map((v, i) => (Math.random() > 0.6));

    const arrays = new Array(size).fill(0).map((v, i) => {
        return new Array(size).fill(0).map((v1, i1) => {
            let cell = (i * size) + i1;
            return ({ cell, bomb: grid[cell] });
        })
    });

    return (<Container maxWidth="sm" sx={{ alignContent: "center" }}>
        <Grid container spacing={2} sx={{ mt: 2 }}>
            {arrays.map((items, i) =>
                <Row key={i} items={arrays[i]} xs={6} md={12 / items.length} handlePress={handlePress} />
            )}
        </Grid>
    </Container>)
}
