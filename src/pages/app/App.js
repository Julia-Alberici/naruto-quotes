import React, { useState, useEffect } from 'react';
import NarutoPic from "../../images/naruto.png";
import styled from "styled-components";
import { Quotes } from "../../components";
import { getQuote } from '../../services';
import jutsoSound from "../../sounds/jutso.mp3";

const jutso = new Audio(jutsoSound);

export function App() {
  const [quoteState, setQuoteState] = useState({
    quote:'loading quote...',
    speaker:'loading speaker'
  })

  const onRender = async () =>{
    const quote = await getQuote();
    
    setQuoteState(quote);
  }
  
  const onUpdate = async () =>{
    const quote = await getQuote();

    setQuoteState(quote);
    jutso.play();
  
  }

  useEffect(() => {
    onRender();
  }, []);

  return (
    <Content>
      <Quotes {...quoteState} onUpdate={onUpdate} />
      <NarutoImg src={NarutoPic} alt="Naruto with a kunai" />
    </Content>
  );
}

const Content = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 50px;
`

const NarutoImg = styled.img`
  align-self: flex-end;
  max-width: 50vw;
`


