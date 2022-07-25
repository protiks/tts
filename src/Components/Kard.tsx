import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';

const Kard = ({ id, name, starGazerCount, singleStarGazerAvatar, singleStarGazerName }: any) => {
    const [transparent, setTransparent] = useState<boolean>(false)
    const [opacity, setOpacity] = useState<number>(1)

    useEffect(() => {
        transparent ? setOpacity(0.5) : setOpacity(1)
        localStorage.getItem(id) ? setTransparent(true) : null
    }, [setOpacity, id, transparent])

    
    const handleClick = () => {
        console.log(id, transparent, opacity)
        if (localStorage.getItem(id) === id) {
            setTransparent(true)
        } else {
            localStorage.setItem(id, id)
        }
        if (transparent) {
            localStorage.removeItem(id)
        }
        setTransparent(!transparent)
    }

    return (
        <div onClick={handleClick} style={{ backgroundColor: '#a2d2ff', margin: 5, borderRadius: 5, opacity: opacity}}>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8, marginBottom: 8 }}>
                {name ? name : 'No_Title'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffafcc' }}>
                <Avatar src={singleStarGazerAvatar} />
                <Typography style={{ marginLeft: 8, lineBreak: 'loose' }} variant="body2" sx={{ fontSize: 14 }} color="text.secondary">
                    {singleStarGazerName} and {starGazerCount - 1} others have Starred this Repo
                </Typography>
            </div>
            {/* <Button onMouseOver={() => console.log(id)} onClick={() => openInNewTab('www.googsdsle.com')}> */}
            Repository
            {/* <a href={'//www.mylink.com'} target="_blank" > mylink </a> */}
            {/* </Button> */}
        </div>

    )
}

export default Kard