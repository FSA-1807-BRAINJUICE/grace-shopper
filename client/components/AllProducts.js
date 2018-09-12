import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllProductsThunk} from '../store/products'

class AllProducts extends Component {
  componentDidMount () {
    this.props.getAllProducts();
  }
  render () {
    const products = this.props.products;
    return (
      <div className='allProductsDiv'>
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
    products: state.productsReducer.allProducts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllProducts: () => dispatch(getAllProductsThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
