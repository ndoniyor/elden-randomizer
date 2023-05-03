import React from 'react'
import { useEffect } from 'react';
import { Container, Image } from 'react-bootstrap';
import GridItem from './GridItem';
import './styles/css/MainCard.css'

//TODO
export default function MainCard(props) {
  useEffect(() => {
    console.log("props:", props);
  }, [])

  return (
    <Container className="d-flex">
      {/* <Container className="no-border">
        <GridItem
          name={props.startingClass.name}
          image={props.startingClass.image}
        />
      </Container> */}
      <Container className="wep-container">
        {props.weapons.map((weapon) => {
          return (<GridItem
            name={weapon.name}
            image={weapon.image}
          />)
        })}
      </Container>
      {props.ashesOfWar.length > 0 &&
        <Container className="wep-container">
          {props.ashesOfWar.map((ash) => {
            if (ash)
              return (<GridItem
                name={ash.name}
                image={ash.image}
              />)
          })}
        </Container>
      }

    </Container>
  )
}
