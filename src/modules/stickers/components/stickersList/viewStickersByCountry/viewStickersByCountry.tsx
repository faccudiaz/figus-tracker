import React, { useEffect, useState } from 'react';
import Item from '../../../../shared/components/item/item';
import { StickerModel } from '../stickersListContainer';

interface ViewStickersByCountryProps {
  handleClickSticker: Function;
  stickers: StickerModel[];
  checkIsStickerObtainedByUser: Function;
}

const ViewStickersByCountry: React.FC<ViewStickersByCountryProps> = ({
  stickers,
  handleClickSticker,
  checkIsStickerObtainedByUser
}) => {
  const stickersPerCountry = 20;
  const [stickersOfCountries, setStickersOfCountries] = useState<any[][]>([[]]);

  useEffect(() => {
    const stickersChunk = sliceIntoChunks(stickers, stickersPerCountry);
    setStickersOfCountries(stickersChunk);
  }, [stickers]);

  const sliceIntoChunks = (arr: Array<any>, chunkSize: number) => {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    // console.log({ res })
    return res;
  };

  return (
    <>
      {stickersOfCountries.map((stickersPerCountry: StickerModel[], index) => {
        return (
          <div key={'parent-' + index}>
            <span
              className={`fi fi-${stickersPerCountry[0]?.country?.toLocaleLowerCase()}`}
              style={{ height: 50, width: 50 }}
              key={stickersPerCountry[0]?.country?.toLocaleLowerCase()}
            ></span>
            <div
              key={'stickersPerCountry-div-' + index}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                textAlign: 'center',
                gap: 10
              }}
            >
              {stickersPerCountry.map((sticker: StickerModel) => (
                <Item
                  key={'item-' + sticker.code}
                  onClick={() => handleClickSticker(sticker)}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: checkIsStickerObtainedByUser(sticker.code) ? 'green' : ''
                  }}
                >
                  <span>{sticker.code}</span>
                </Item>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ViewStickersByCountry;
