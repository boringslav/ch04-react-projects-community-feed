import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import queryString from 'query-string'
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

const CardLink = styled(Link)`
text-decoration: none;
color:inherit;
`
const PaginationBar = styled.div`
width:100%;
display:flex;
justify-content: space-between;
`
const PaginationLink = styled(Link)`
padding:1%;
background: lightBlue;
color:white;
text-decoration: none;
border-radius:5px;
`

function Feed(props) {
  const query = queryString.parse(props.location.search)
  const [data, setData] = useState([])
  const [page, setPage] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const ROOT_API = 'https://api.stackexchange.com/2.2/';

  useEffect(() => {
    (async () => {

      try {
        const data = await fetch(
          `${ROOT_API}questions?order=desc&sort=activity&tagged=reactjs&site=stackoverflow${(page) ? `&page=${page}` : ''}`,
        )
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

  useEffect(() => {
    if (query.page) {
      setPage(parseInt(query.page))
    } else {
      setPage(1)
    }
  }, [])


  if (loading || error) {
    return <Alert>{loading ? 'Loading...' : error}</Alert>
  }

  return (
    <FeedWrapper>
      {data.items.map(item => (
        <CardLink key={item.question_id}
          to={`/questions/${item.question_id}`}>
          <Card data={item} />
        </CardLink>
      ))}
      <PaginationBar>
        <PaginationLink>Previous</PaginationLink>
        <PaginationLink>Next</PaginationLink>
      </PaginationBar>
    </FeedWrapper>
  )
}

export default Feed

