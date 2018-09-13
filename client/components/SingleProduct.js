import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../store/products'

class SingleProduct extends Component {
  componentDidMount(){
    const productId = Number(this.props.match.params.productId)
    this.props.fetchSingleProduct(productId);
  }
  render(){
    const { name } = this.props.product;
    return (
      <div className='single-product'>
        {name}
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
