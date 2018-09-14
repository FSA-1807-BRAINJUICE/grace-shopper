import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllProductsThunk} from '../store/products'
import ProductCard from './ProductCard'

class AllProducts extends Component {
  componentDidMount () {
    this.props.getAllProducts();
  }
  render () {
    const products = this.props.products;
    return (
      <div className='all-products gallery'>
        {
          products.map(product => {
            return <ProductCard product={product} key={product.id} />
          })
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

const mapDispatchToProps = dispatch => {
  return {
    getAllProducts: () => dispatch(getAllProductsThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
