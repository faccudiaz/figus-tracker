import React from 'react';
import Box from '@mui/material/Box';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormControl, InputLabel, MenuItem, Typography } from '@mui/material';

interface HeaderStickerListProps {
  handleChange: (event: SelectChangeEvent) => void;
  orderBy: string;
}

const HeaderStickerlist: React.FC<HeaderStickerListProps> = ({ handleChange, orderBy }) => {
  const OrderBySelect = () => {
    return (
      <Box>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Mostrar por</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={orderBy}
            label="Mostrar por"
            onChange={handleChange}
            autoWidth={true}
            SelectDisplayProps={{ style: { paddingTop: 10, paddingBottom: 10 } }}
          >
            <MenuItem value={'all'}>Todas</MenuItem>
            <MenuItem value={'groups'}>Grupos</MenuItem>
            <MenuItem value={'countries'}>Países</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ alignSelf: 'center' }}>
        <Typography variant="h6">Mis figuritas</Typography>
      </Box>
      <Box style={{ display: 'flex', alignItems: 'center' }}>
        <OrderBySelect />
      </Box>
    </div>
  );
};

export default HeaderStickerlist;
