import React from 'react'
import { useState, useEffect } from 'react';
import GridItem from './GridItem';
import { Container, Row, Col } from 'react-bootstrap';

import "./styles/css/ArmorCard.css";

export default function ArmorCard(props) {
  const isTopContainerWide = props.armor.length > 1;
  const [armor, setArmor] = useState([])

  useEffect(() => {
    setArmor(props.armor);
  }, [props])

  return (
    <div className='container-wrapper'>
      <Container className={`container ${isTopContainerWide ? '' : 'with-one-item'}`}>
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
    </div>
  )
}
