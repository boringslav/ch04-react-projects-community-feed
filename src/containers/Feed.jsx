import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import Card from '../components/Card/Card';

const FeedWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 5%;
`;

const Alert = styled.div`
  text-align: center;
`;



function Feed() {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const ROOT_API = 'https://api.stackexchange.com/2.2/';

  useEffect(() => {
    (async () => {
      try {
        const data = await fetch(
          `https://api.stackexchange.com/2.2/questions?order=desc&sort=activity&tagged=reactjs&site=stackoverflow`,
        )
        const dataJSON = await data.json()
        console.log(dataJSON)
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

  return (
    <FeedWrapper>
      {/* {data.items.map(item => (
        <Link key={item.question_id} data={item}>
          <Card data={item} />
        </Link>
      ))} */}
    </FeedWrapper>
  )
}

export default Feed

