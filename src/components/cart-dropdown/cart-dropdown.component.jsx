import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import CartItem from "../cart-item/cart-item.component";
import CustomButton from "../custom-button/custom-button.component";
import "./cart-dropdown.styles.scss";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className="empty-message">Your cart is empty</span>
      )}
      <CustomButton
        onClick={() => {
          history.push("/checkout");
          dispatch(toggleCartHidden());
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </div>
  </div>
);

//multiple ways to write this:

//1.
// const mapStateToProps = ({ cart }) => ({
//   cartItems: cart.cartItems,
// });

//2.
// const mapStateToProps = (state) => ({
//   cartItems: state.cart.cartItems,
// });

// const mapStateToProps = ({ cart: { cartItems } }) => ({
//   cartItems,
// });

//without createStructuredselector
// const mapStateToProps = (state) => ({
//   cartItems: selectCartItems(state),
// });

const mapStateToProps = () =>
  createStructuredSelector({
    cartItems: selectCartItems,
  });

export default withRouter(connect(mapStateToProps)(CartDropdown));