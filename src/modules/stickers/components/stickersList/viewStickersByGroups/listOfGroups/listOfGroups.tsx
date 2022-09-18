import React from 'react';
import Item from '../../../../../shared/components/item/item';
import { StickerModel } from '../../stickersListContainer';

const ListOfGroups: React.FC<any> = ({ groupOfStickers }) => {
  return (
    <>
      {/* <div>
                <h1>Grupo { }</h1>
            </div> */}
      {groupOfStickers.map((stickersCountryOfGroup: StickerModel[]) => (
        <div>
          {/* <h1>separador</h1> */}
          <div style={{ display: 'flex', gap: 2 }}>
            {stickersCountryOfGroup.map((sticker: StickerModel) => (
              <div style={{ border: '1px solid black' }}>{sticker.code}</div>
              // <Item>{sticker.code}</Item>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default ListOfGroups;

// return groupOfStickers.map((stickersCountryOfGroup: StickerModel[]) => (
//     <div>
//         {/* <h1>separador</h1> */}
//         <div style={{ display: 'flex', gap: 2, overflowX: 'auto' }}>
//             {stickersCountryOfGroup.map((sticker: StickerModel) => (
//                 // <div style={{ border: '1px solid black', }}>{sticker.code}</div>
//                 <Item>{sticker.code}</Item>
//             ))}
//         </div>
//     </div>
// ))
