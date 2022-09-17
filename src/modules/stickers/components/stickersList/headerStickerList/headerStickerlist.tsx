import React from 'react'
import Box from '@mui/material/Box';
import { SelectChangeEvent } from '@mui/material/Select';
import ReorderIcon from '@mui/icons-material/Reorder';
import SimpleDialog from '../../../../shared/components/dialog/simpleDialog';
import TransitionsModal from '../../../../shared/components/modal/transitionsModal';
import { Typography } from '@mui/material';

interface HeaderStickerListProps {
    handleChange: (event: SelectChangeEvent) => void
    orderBy: string,
}

const HeaderStickerlist: React.FC<HeaderStickerListProps> = ({ handleChange, orderBy }) => {
    const [selectedValue, setSelectedValue] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', }}>
            <Box sx={{ alignSelf: 'center' }}>
                <Typography variant='h6'>Mis figuritas</Typography>
            </Box>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
                <ReorderIcon onClick={handleClickOpen} />
                <SimpleDialog
                    selectedValue={selectedValue}
                    open={open}
                    onClose={handleClose}
                    handleChange={handleChange}
                    orderBy={orderBy}
                />
            </Box>
        </div>
    )
}

export default HeaderStickerlist