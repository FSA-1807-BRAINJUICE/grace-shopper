import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllProductsThunk} from '../store/products'
import {addProductToCart} from '../store/cart'
import ProductCard from './ProductCard'

class AllProducts extends Component {
  componentDidMount() {
    this.props.getAllProducts()
  }
  render() {
    const products = this.props.products;
    return (
      <div className="all-products gallery">
        {
          products.map(product => (
           <ProductCard product={product} key={product.id} onClick={() => this.props.addToCart(product.id)}/>
           )
          )
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.allProducts
  }
}

const mapDispatchToProps = dispatch => (
  {
    getAllProducts: () => dispatch(getAllProductsThunk()),
    addToCart: (productId) => dispatch(addProductToCart(productId)),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
