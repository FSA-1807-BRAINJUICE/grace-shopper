import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllProductsThunk} from '../store/products'
import ProductCard from './ProductCard'

//Unless you're really into the concept of styled components I'd veer away from this.
const styles = {
  gallery: {
    display: "grid",
    justifyContent: "center",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gridGap: "30px 30px",
    marginTop: "15px"
  }
}

//Incase you ever do...
//all-products
//all-products-title

class AllProducts extends Component {
  componentDidMount () {
    this.props.getAllProducts();
  }
  render () {
    const products = this.props.products;
    return (
      //All Divs should be classified or identified. All CSS / HTML must be KEBAB cased. all-products
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
    products: state.products.allProducts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllProducts: () => dispatch(getAllProductsThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
