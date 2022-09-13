import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Typography } from '@mui/material';

interface HeaderStickerListProps {
    handleChange: (event: SelectChangeEvent) => void
    orderBy: string,
}

const HeaderStickerlist: React.FC<HeaderStickerListProps> = ({ handleChange, orderBy }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', }}>
            <Box sx={{ alignSelf: 'center' }}>
                <Typography variant='h5'>Mis figuritas</Typography>
            </Box>
            <Box sx={{ minWidth: 150 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Mostrar por</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={orderBy}
                        label="Mostrar por"
                        onChange={handleChange}
                    >
                        <MenuItem value={"all"}>Todas</MenuItem>
                        <MenuItem value={"groups"}>Grupos</MenuItem>
                        <MenuItem value={"countries"}>Países</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </div>
    )
}

export default HeaderStickerlist