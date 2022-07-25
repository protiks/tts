import React from 'react'
import { ChangeEvent, useEffect, useState } from 'react'
import { gql, useQuery, useLazyQuery } from '@apollo/client'
import { get_data } from '../utils/query'
import Results from './Results'
import { Input } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
interface Stargazers {
    avatarUrl: string
    __typename: string

}

interface Edges {
    node: {
        name: string
        stargazers: Stargazers[]
        __typename: string
    }
    __typename: string
}

interface Data {
    search: Edges[]
    __typename: string
}

const MainInput = () => {
    const [inputValue, setInputValue] = useState('')
    const [name, setName] = useState<any>()
    const [noResult, setNoResult] = useState<boolean>(false)
    const [starGazer, setStarGazers] = useState()

    const [bringData, { data, error, loading }] = useLazyQuery(get_data(inputValue))

    useEffect(() => {
        inputValue && bringData()
        setNoResult(false)
        if (data) {
            if (!data.search.edges[0]) {
                setNoResult(true)
            }
            let arr: any[] = []
            let name = data.search.edges
            name.map((i: any) => {
                let singleStarGazer = i.node.stargazers.nodes
                if (singleStarGazer[0]) {
                    arr.push({
                        id: i.node.id,
                        name: i.node.name,
                        homePageUrl: i.node.homepageUrl,
                        starGazerCount: i.node.stargazerCount,
                        singleStarGazerName: singleStarGazer[0].name && singleStarGazer[0].name,
                        singleStarGazerAvatar: singleStarGazer[0].avatarUrl && singleStarGazer[0].avatarUrl
                    })
                }
                setName(arr)

            })
        }

    }, [inputValue, bringData, data, setNoResult])

    const handleInput = (e: any) => {
        setInputValue(e.target.value)
    }
    const handleButton = () => {
        setInputValue('')
        localStorage.clear()
    }
    return (
        <>
            <div style={{ justifyContent: 'center', display: 'flex', paddingTop: 150, alignContent: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                    <Input sx={{ boxShadow: 2 }} autoFocus onChange={(e) => handleInput(e)} value={inputValue} />
                    <Button onClick={handleButton}variant="outlined" startIcon={<DeleteIcon />}>
                       clear
                    </Button>
                </div>
            </div>
            {inputValue && loading ? <div><div style={{}}><iframe src="https://giphy.com/embed/kUTME7ABmhYg5J3psM" width="100%" height="100%" style={{}} frameBorder="0" className="giphy-embed"></iframe></div></div> : null}
            {inputValue && noResult ? <div><div style={{}}><iframe src="https://giphy.com/embed/26xBIygOcC3bAWg3S" width="100%" height="100%"></iframe></div><p>Nothing Found</p></div> : null}
            {/* {inputValue && noResult ? <div>No Result</div> : null} */}
            {/* {name! && inputValue && <div>{inputValue}</div>} */}
            {name && inputValue && !noResult && !loading && <Results names={name} />}

        </>
    )
}

export default MainInput