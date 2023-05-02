import React from 'react'
import { useState, useEffect } from 'react';
import GridItem from './GridItem';
import { Container, Row, Col } from 'react-bootstrap';

export default function SpellCard(props) {
  const [spells, setSpells] = useState([])

  useEffect(() => {
    setSpells(props.spells);
    console.log("spells:", spells)
  }, [props])

  return (
    <Container>
      <Row>
        {
          Object.keys(spells).length > 0 &&
          spells.map((spell) => {
            return (
              <Col>
                <GridItem
                  name={spell.name}
                  image={spell.image}
                />
              </Col>)
          })
        }
      </Row>
    </Container>
  )
}
