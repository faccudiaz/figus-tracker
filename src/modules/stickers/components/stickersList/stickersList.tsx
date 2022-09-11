import React, { useState, useEffect, MouseEvent } from 'react'
import { Grid, Typography } from '@mui/material'
import MockV1 from '../../mocks/stickersMockV1.json'
import Item from '../../../shared/components/item/item';
import { StickerModel } from './stickersListContainer';

interface StickersListProps {
    fetchUserStickers: Function,
    addUserSticker: Function,
    removeUserSticker: Function,
    userStickers: StickerModel[]
}

const StickersList: React.FC<StickersListProps> = ({ userStickers, fetchUserStickers, addUserSticker, removeUserSticker }) => {
    const [stickers] = useState(MockV1)

    useEffect(() => {
        fetchUserStickers()
    }, [])

    const handleClickSticker = async (sticker: StickerModel) => {
        userStickers.some(userSticker => userSticker.code === sticker.code)
            ? removeUserSticker(sticker)
            : addUserSticker(sticker)
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <>
                    <Typography>
                        Mis figuritas
                    </Typography>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 12, md: 40 }}>
                        {stickers.map((sticker, index) => (
                            <Grid item xs={2} sm={4} md={4} key={index}>
                                <Item
                                    onClick={() => handleClickSticker(sticker)}
                                    style={{ backgroundColor: userStickers.some(userSticker => userSticker.code === sticker.code) ? 'green' : '' }}
                                >
                                    <span>{sticker.code}</span>
                                </Item>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </Grid>
        </Grid>
    )
}

export default StickersList