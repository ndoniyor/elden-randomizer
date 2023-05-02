import React from 'react'
import { useState, useEffect } from 'react';
import GridItem from './GridItem';
import { Container, Row, Col } from 'react-bootstrap';

import "./styles/css/ArmorCard.css";

export default function ArmorCard(props) {
  const [armor, setArmor] = useState([])

  useEffect(() => {
    console.log(props.armor)
    setArmor(props.armor);
  }, [props])

  return (
    <Container>
      <Row>
        {armor.name ?
          <Col>
            <GridItem
              name={armor.name}
              image={armor.image}
            />
          </Col> : 
          Object.keys(armor).length > 0 &&
          armor.map((armorPiece) => {
            return (
              <Col>
                <GridItem
                  name={armorPiece.name}
                  image={armorPiece.image}
                />
              </Col>)
          })
        }
      </Row>
    </Container>
  )
}
