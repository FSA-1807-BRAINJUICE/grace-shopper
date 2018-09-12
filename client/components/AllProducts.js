import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllProductsThunk} from '../store/products'
import ProductCard from './ProductCard'


const styles = {
  gallery: {
    display: "grid",
    justifyContent: "center",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridGap: "30px 20px",
    marginTop: "15px"
  }
}

class AllProducts extends Component {
  componentDidMount () {
    this.props.getAllProducts();
  }
  render () {
    const products = this.props.products;
    return (
      <div className='allProductsDiv' style = {styles.gallery}>
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
