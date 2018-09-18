import React from "react";

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export const SingleOrderItem = (props) => {
  const {imgUrl, name, description} = props.item.product;
  const price = props.item.paidUnitPrice;
  return (
    <TableRow>
      <TableCell>{imgUrl}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>{description}</TableCell>
    </TableRow>
  )
}
