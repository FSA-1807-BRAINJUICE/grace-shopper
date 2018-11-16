import React from 'react'

import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

export const SingleOrderItem = props => {
  const {imgUrl, name, description} = props.item.product
  const price = props.item.paidUnitPrice
  return (
    <TableRow className="cart-item">
      <TableCell className="cart-item-img">
        <img className='order-item-img' src={imgUrl} />
      </TableCell>
      <TableCell className="cart-item-element">{name}</TableCell>
      <TableCell className="cart-item-element">{price}</TableCell>
      <TableCell className="cart-item-element">{description}</TableCell>
    </TableRow>
  )
}
