import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Card from '../components/Card/Card'
import { Helmet } from 'react-helmet'
const QuestionWrapper = styled.div`
    dispay:flex;
    justify-content: space-between;
    flex-direction: column;
    margin: 5%;
`
const Alert = styled.div`
    text-align:center;
`
function Question({ match }) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const ROOT_API = 'https://api.stackexchange.com/2.2/'

    useEffect(() => {
        (async () => {
            try {
                const data = await fetch(`${ROOT_API}questions/${match.params.id}?site=stackoverflow`)
                const dataJSON = await data.json()

                if (dataJSON) {
                    setData(dataJSON)
                    setLoading(false)
                }

            } catch (error) {
                setLoading(true)
                setError(error.message)
            }

        })()
    }, [])

    if (loading || error) {
        return (
            <>
                <Helmet>
                    <title>Q&A Feed - Question #{match.params.id}</title>
                </Helmet>
                <Alert>{loading ? 'Loading...' : error}</Alert>
            </>
        )
    }

    return (
        <>
            <Helmet>
                <title>Q&A Feed - Question #{match.params.id}</title>
            </Helmet>
            <QuestionWrapper>
                <Card key={data.items[0].question_id} data={data.items[0]} />
            </QuestionWrapper>
        </>
    )
}

export default Question
