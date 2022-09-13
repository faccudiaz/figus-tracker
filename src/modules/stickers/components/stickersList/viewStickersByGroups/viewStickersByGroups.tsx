import React, { useEffect, useState } from 'react'
import { StickerModel } from '../stickersListContainer'

const ViewStickersByGroups: React.FC<any> = ({ stickers }) => {
    const stickersPerGroup = 20 * 4;
    const [stickersOfGroups, setStickersOfGroups] = useState<any[][]>([[]])

    useEffect(() => {
        console.log('dsjdhsak')
        const stickersChunk = sliceIntoChunks(stickers, stickersPerGroup)
        setStickersOfGroups(stickersChunk)
    }, [stickers, stickersPerGroup])

    const sliceIntoChunks = (arr: Array<any>, chunkSize: number) => {
        const res = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            const chunk = arr.slice(i, i + chunkSize);
            res.push(chunk);
        }
        // console.log({ res })
        return res;
    }

    return (
        <>
            {
                stickersOfGroups.map((stickersPerCountry: StickerModel[], index) => (
                    <div style={{}}>
                        <h2>Grupo {index + 1}</h2>
                        {stickersPerCountry.map((sticker: StickerModel) => (
                            <div style={{ gap: 10, border: '1px solid black' }}>
                                <h2 style={{ margin: 'unset' }}>{sticker.code}</h2>
                            </div>
                        ))}
                    </div>
                ))
            }
        </>
    )
}

export default ViewStickersByGroups