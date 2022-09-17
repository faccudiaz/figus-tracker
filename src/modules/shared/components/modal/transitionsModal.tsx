import React, { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { Grid, IconButton, TextField } from '@mui/material';
import { addUserSticker, fetchStickerByCode, fetchUserStickers, removeUserSticker } from '../../../stickers/services/stickersServices';
import { StickerModel } from '../../../stickers/components/stickersList/stickersListContainer';

const style = {
  position: 'absolute' as 'absolute',
  top: '35%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

const TransitionsModal = () => {
  const [open, setOpen] = useState(false);
  const [valueSearch, setValueSearch] = useState("")
  const [searchResults, setSearchResults] = useState<StickerModel[]>([])
  const [userStickers, setUserStickers] = useState<StickerModel[]>([])

  useEffect(() => {
    // const stickersUser: any =  fetchUserStickers()
    // console.log({ stickersUser })
    // setUserStickers(stickersUser)
    handleFetchUserStickers()
  }, [])

  const handleFetchUserStickers = async () => {
    const stickersUser: any = await fetchUserStickers()
    setUserStickers(stickersUser)
    // console.log({ stickersUser })
  }


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClickSearch = () => {
    const stickersByCode = fetchStickerByCode(valueSearch);
    setSearchResults(stickersByCode)
  }

  const handleClickSticker: any = async (sticker: StickerModel) => {
    // let data = {}
    userStickers.some(userSticker => userSticker.code === sticker.code)
      ? handleRemoveUserSticker(sticker)
      : handleAddUserSticker(sticker)
    // console.log({ data })
  }

  const handleAddUserSticker = async (sticker: StickerModel) => {
    const data = await addUserSticker(sticker)
    data.code === 200 && (
      setUserStickers([...userStickers, sticker])
    )
  }

  const handleRemoveUserSticker = async (sticker: StickerModel) => {
    const data: any = await removeUserSticker(sticker)
    data.code === 200 && (
      // console.log('removed success')
      setUserStickers(userStickers.filter(function (userSticker) {
        return userSticker.code !== sticker.code
      }))
    )
    // console.log({ data })
  }

  const checkIsStickerObtainedByUser = (code: string) => {
    return userStickers.some(userSticker => userSticker.code === code)
  }

  return (
    <>
      <IconButton onClick={handleOpen} size="large" aria-label="search" color="inherit">
        <SearchIcon />
      </IconButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Grid style={{ margin: '10px 0px' }}>
              <Typography id="transition-modal-title" variant="h6" component="h2" style={{ margin: '20px 0px' }}>
                Búsqueda por código
              </Typography>
              <TextField
                id="outlined-basic"
                label="Código"
                variant="outlined"
                value={valueSearch}
                onChange={(e) => setValueSearch(e.target.value)}
              />
              <Button onClick={handleClickSearch}>Buscar</Button>
            </Grid>
            {searchResults.length > 0 &&
              <Box>
                <h4 style={{ margin: '10px 0px' }}>
                  Resultados
                </h4>
                <Grid container spacing={0} style={{
                  height: 320,
                  overflowX: 'hidden',
                  overflowY: 'auto',
                }}
                >
                  {searchResults.map((sticker) => (
                    <Grid item xs={6} sm={6} md={6} key={'stickerGrid-' + sticker.code}>
                      <div
                        onClick={() => handleClickSticker(sticker)}
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          border: '1px solid',
                          margin: '10px 20px',
                          height: 30,
                          width: 70,
                          cursor: "pointer",
                          backgroundColor: checkIsStickerObtainedByUser(sticker.code) ? 'green' : ''
                        }}>
                        <span>
                          {sticker.code}
                        </span>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            }
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default TransitionsModal