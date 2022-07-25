import React, { useEffect } from 'react';
import { useState } from "react"
import Box from '@mui/material/Box';

import useWindowWidth from '../hooks/useWindowWidth';
import Kard from './Kard'
import { Container } from '@mui/system';

const Results = ({ names: results }: any): JSX.Element => {
    const { viewPort } = useWindowWidth()
    const [columns, setColumns] = useState<number>(2)
    const [transparent, setTransparent] = useState<boolean>(false)
    useEffect(() => {
        if (viewPort.width < 700) {
            setColumns(2)
        } else {
            setColumns(4)

        }
    }, [viewPort])


    const [opacity, setOpacity] = useState(1)
    // const [transparent, setTransparent] = useState(false)
    return (
        <>
            <Container>
                <Box sx={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                    {results.map((result: any) => {
                        if (localStorage.getItem(result.id) === result.id) {
                            // console.log('here', localStorage.getItem(result.id))
                            // setTransparent(true)
                        }
                        return (
                            <div key={result.id}>
                                <Box sx={{ boxShadow: 5 }}>
                                    <Kard
                                        key={result.id}
                                        id={result.id}
                                        name={result.name}
                                        singleStarGazer={result.singleStarGazer}
                                        singleStarGazerName={result.singleStarGazerName}
                                        starGazerCount={result.starGazerCount}
                                        singleStarGazerAvatar={result.singleStarGazerAvatar}
                                    />
                                </Box>
                            </div>
                        )
                    })}
                </Box>
            </Container>
        </>
    )
}

export default Results