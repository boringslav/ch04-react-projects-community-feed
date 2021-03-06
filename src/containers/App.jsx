import React from 'react'
import { Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Header from '../components/Header/Header';
import Feed from './Feed';
import Question from './Question';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const AppWrapper = styled.div`
  text-align: center;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <Header />
        <Switch>
          <Route exact path='/' component={Feed} />
          <Route path='/questions/:id' component={Question} /> //questions:id before question because switch matches first url path
          <Route path="/questions" component={Feed} />
        </Switch>
      </AppWrapper>
    </>
  )
}

export default App

