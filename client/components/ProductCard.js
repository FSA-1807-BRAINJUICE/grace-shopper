import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {Link} from 'react-router-dom'

const styles = {
  card: {
    maxWidth: 345,
    justifySelf: 'center',
    width: '100%'
  },
  media: {
    height: 140
  },
  fullWidth: {
    width: '100%'
  }
}

const ProductCard = props => {
  const {classes} = props
  const {id, imgUrl, name, description} = props.product
  return (
    <Card className={classes.card}>
      <Link to={`/products/${id}`}>
        <CardActionArea className={classes.fullWidth}>
          <CardMedia className={classes.media} image={imgUrl} title={name} />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {name}
            </Typography>
            <Typography component="p">{description}</Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Button size="small" color="primary">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  )
}

ProductCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProductCard)
