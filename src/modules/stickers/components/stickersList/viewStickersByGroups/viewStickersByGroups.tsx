import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Item from '../../../../shared/components/item/item';
import { StickerModel } from '../stickersListContainer';

interface ViewStickersByGroupsProps {
  handleClickSticker: Function;
  stickers: StickerModel[];
  checkIsStickerObtainedByUser: Function;
}

const ViewStickersByGroups: React.FC<ViewStickersByGroupsProps> = ({
  checkIsStickerObtainedByUser,
  handleClickSticker,
  stickers
}) => {
  const [stickersByGroups, setStickersByGroups] = useState<any>();

  useEffect(() => {
    getStickersByGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStickersByGroups = () => {
    const result = stickers.reduce(function (r: any, a: any) {
      r[a.group] = r[a.group] || [];
      r[a.group].push(a);
      return r;
    }, []);
    setStickersByGroups(result);
  };

  const sliceIntoChunks = (arr: Array<any>, chunkSize: number) => {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  };

  const FaderDiv = styled.div`
    &::-webkit-scrollbar {
      -webkit-appearance: none;
    }
  `;

  return (
    <>
      {stickersByGroups &&
        Object.keys(stickersByGroups).map((key: any) => (
          <div key={'containerKey-' + key} style={{ display: 'grid', alignItems: 'center' }}>
            <Typography variant="subtitle1" style={{ minWidth: 'fit-content' }}>
              Grupo {key}
            </Typography>
            <div key={'containerCountriesGroup-' + key} style={{ display: 'grid' }}>
              {sliceIntoChunks(stickersByGroups[key], 20).map(
                (stickersByCountry: StickerModel[], index) => (
                  <FaderDiv
                    key={'containerCountry-' + index}
                    style={{ display: 'flex', overflowX: 'auto', gap: '0px 10px', padding: '5px' }}
                  >
                    {stickersByCountry.map((sticker: StickerModel, index: number) => (
                      <Item
                        key={'item-' + sticker.code}
                        onClick={() => handleClickSticker(sticker)}
                        style={{
                          cursor: 'pointer',
                          backgroundColor: checkIsStickerObtainedByUser(sticker.code) ? 'green' : ''
                        }}
                      >
                        <p key={'p-' + sticker.code} style={{ margin: 5 }}>
                          {sticker.code}
                        </p>
                      </Item>
                    ))}
                  </FaderDiv>
                )
              )}
            </div>
            <hr />
          </div>
        ))}
    </>
  );
};

export default ViewStickersByGroups;
