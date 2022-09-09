import React, { useState } from 'react'
import { Grid, Typography } from '@mui/material'
import { stickersMock } from '../../mocks/stickersMock'

const StickersList = () => {
    const [teams] = useState(stickersMock.teams)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <>
                    <Typography>
                        Mis figuritas
                    </Typography>
                    {teams.map((team) => (
                        <div style={{ display: 'flex', gap: 10 }}>
                            <span className={team.flag} style={{ width: 40 }}></span>
                            <h1 key={team.name} >
                                {team.name}
                            </h1>
                            <p style={{
                                display: "flex",
                                alignItems: "center",
                                width: "100%"
                            }}>
                                {team.stickersCollection.map((stickerNumber) => (
                                    <span>{stickerNumber} - </span>
                                ))}
                            </p>
                        </div>
                    ))}
                </>
            </Grid>
        </Grid>
    )
}

export default StickersList