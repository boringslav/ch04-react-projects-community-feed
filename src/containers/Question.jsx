import React, { useState } from 'react'
import styled from 'styled-components'

const QuestionWrapper = styled.div`
    dispay:flex;
    justify-content: space-between;
    flex-direction: column;
    margin: 5%;
`
const Alert = styled.div`
    text-align:center;
`
function Question() {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    if (loading || error) {
        return <Alert>{loading ? 'Loading...' : error}</Alert>
    }

    return (
        <QuestionWrapper>

        </QuestionWrapper>
    )
}

export default Question
