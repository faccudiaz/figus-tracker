import React from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Box } from '@mui/system';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  handleChange: Function,
  orderBy: string
}

const SimpleDialog: React.FC<SimpleDialogProps> = ({ onClose, selectedValue, open, orderBy, handleChange }) => {

  const handleChangeSelect = (e: SelectChangeEvent<string>) => {
    handleClose()
    handleChange(e)
  }

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Ordenar Stickers por</DialogTitle>
      <Box sx={{ minWidth: 150, padding: '10px' }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Mostrar por</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={orderBy}
            label="Mostrar por"
            onChange={(e) => handleChangeSelect(e)}
          >
            <MenuItem value={"all"}>Todas</MenuItem>
            <MenuItem value={"groups"}>Grupos</MenuItem>
            <MenuItem value={"countries"}>Países</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Dialog>
  );
}

export default SimpleDialog