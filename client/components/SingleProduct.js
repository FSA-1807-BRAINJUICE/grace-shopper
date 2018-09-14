import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../store/products'
import Button from '@material-ui/core/Button'

class SingleProduct extends Component {
  componentDidMount(){
    const productId = Number(this.props.match.params.productId)
    this.props.fetchSingleProduct(productId);
  }
  render(){
    const { name, imgUrl, price, description } = this.props.product;
    return (
      <div className='single-product'>
        <div className='single-product-image'>
          <img src={'/'+imgUrl} />
        </div>
        <div className='single-product-info'>
          <h2>{name}</h2>
          <h4>${price}</h4>
          <p>{description}</p>
          <Button size='small' color='primary' variant='contained'>Add to Cart</Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  product: state.products.selected
})

const mapDispatchToProps = dispatch => ({
  fetchSingleProduct(id){
    dispatch(fetchSingleProduct(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
