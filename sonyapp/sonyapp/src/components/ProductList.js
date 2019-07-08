
import React, { Component } from "react";

import axios from "axios";

import Details from "./Details.js";
import ProductHelper, { getAllProducts,getExpireProducts,Goingtoexpire } from '../common/helper/ProductHelper';
import { Router, Route, withRouter } from "react-router";
export default class ProductList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      isItimeClcik: true,
      allProducts: [],
     
    };
    this.handleChange = this.handleChange.bind(this);
    this.clickBtn = this.clickBtn.bind(this);
  }

  render() {
    return (<div>
      <Filter data={this.state.value} handleChange={this.handleChange}></Filter>
      <h1>All Products</h1>
      <Product data={this.state.allProducts} clickBtn={this.clickBtn} />
    </div>);
  }


  componentDidMount() {
    axios.get("../assets/data/product.json").then(res => {
      this.setState({ allProducts: getAllProducts(res.data) })
       this.setState({ value: res.data });
    });
  }

  handleChange(event) {
    if (event.target.value == "All Product") {
      this.setState({ allProducts: getAllProducts(this.state.value) });
    } else if (event.target.value == "Expire soon") {
      this.setState({
        allProducts: getExpireProducts(getAllProducts(this.state.value))
      });
    } else if (event.target.value == "Exipred") {
      const expired = Goingtoexpire(getAllProducts(this.state.value));
      this.setState({ allProducts: expired });
    }
  }

  clickBtn=(productElement) =>{
    console.log("handle Item Click for Item ", productElement);
   this.props.history.push({
    pathname: "/Details",
    state: {
    element:productElement
     }
     });
    }
}



class Product extends Component {
  constructor(props) {
    super(props);
   }

  render() {
    const products = this.props.data.map(
      function (product, index) {
        return (
          <div className="col-sm-3" >
            <div className="card"  >
              <div className="" onClick={this.props.clickBtn.bind(this,product)}>
                <img src="./th.jpg" alt="Avatar" />
              </div>
              <div className="product_name">
                <hr />
                <h6>{product.name}</h6>
                <h6>{product.serialNo}</h6>
                <hr />
              </div>
            </div>
          </div>
        );
      }.bind(this)
    );
    return <div className="row">{products}</div>;
  }
}

class Filter extends Component {
  constructor(props) {
    super(props);
  }

 render() {
    return (<div className="dropdown">
      <select onChange={this.props.handleChange}>
        <option value="All Product">All Product</option>
        <option value="Expire soon">Expire soon</option>
        <option value="Exipred">Exipred</option>
      </select>
    </div>
    );
  }
}
