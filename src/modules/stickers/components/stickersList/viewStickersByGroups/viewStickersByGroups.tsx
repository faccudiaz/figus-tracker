import React from 'react'
import { StickerModel } from '../stickersListContainer'

const ViewStickersByGroups: React.FC<any> = ({ stickers }) => {
    return (
        <div>
            <ul>
                {stickers.map((sticker: StickerModel) => (
                    <li key={"sticker" + sticker.code}>
                        {sticker.code}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ViewStickersByGroups