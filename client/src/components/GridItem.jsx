import React from 'react'
import { Image, Card } from 'react-bootstrap'
import './styles/css/GridItem.css'

export default function GridItem({ name, image }) {
  return (
    <Card className="GridItem">
      <Card.Title>{name}</Card.Title>
      <Card.Body>
        <Card.Img
          src={image}
        />
      </Card.Body>
    </Card>
  )
}
