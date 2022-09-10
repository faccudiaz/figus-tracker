import React, { useState } from 'react'
import { Grid, Typography } from '@mui/material'
import MockV1 from '../../mocks/stickersMockV1.json'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const StickersList = () => {
    const [stickers] = useState(MockV1)
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <div style={{ display: 'grid', gap: 20 }}>
                    <Typography>
                        Mis figuritas
                    </Typography>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 12, md: 12 }}>
                        {stickers.map((sticker, index) => (
                            <Grid item xs={2} sm={4} md={4} key={index}>
                                <Item>{sticker.code}</Item>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </Grid>
        </Grid>
    )
}

export default StickersList