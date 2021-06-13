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
  const { match } = props
  const query = queryString.parse(props.location.search)

  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [prevPage, setPrevPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const ROOT_API = 'https://api.stackexchange.com/2.2/';



  async function fetchAPI(page) {
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
  }

  useEffect(() => {
    fetchAPI(page)
  }, [])

  useEffect(() => {
    if (query.page != page) {
      setPrevPage(page)
      setPage(parseInt(query.page))
      fetchAPI(page)

    } else {
      setPage(1)
    }
  }, [query.page])


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
        {page > 1 && <PaginationLink to={`${match.url}?page=${page - 1}`}>Previous</PaginationLink>}
        {data.has_more && <PaginationLink to={`${match.url}?page=${page + 1}`}>Next</PaginationLink>}
      </PaginationBar>
    </FeedWrapper>
  )
}

export default Feed

