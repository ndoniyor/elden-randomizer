import React from 'react'
import { Container, Image } from 'react-bootstrap';
import GridItem from './GridItem';


//TODO
export default function MainCard(props) {
  return (
    <Container className="d-flex justify-content-center">
      <div className="wep-container">
        {props.weapons.map((weapon)=>{
          return(<GridItem
            name={weapon.name}
            image={weapon.image}
          />)
        })}
      </div>
      <Image
        src={props.startingClass.image}
      />
      <div className="wep-container">
        {props.ashesOfWar.length>0 && props.ashesOfWar.map((ash)=>{
          return(<GridItem
            name={ash.name}
            image={ash.image}
          />)
        })}
      </div>

    </Container>
  )
}
