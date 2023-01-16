const ADD_TO_CART_EVENT = 'cart/productAdded';
const REMOVE_FROM_CART_EVENT = 'cart/productRemoved';
const ADD_TO_WL_EVENT = 'wl/productAdded';
const REMOVE_FROM_WL_EVENT = 'wl/productRemoved';

class NewsletterForm extends React.Component {
  state = {
    email: '',
    formMessage: '',
    busy: false,
    submitted: false,
    successMessage: '',
  };

  validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  }

  onSubmit = (event) => {
    event.preventDefault();

    const email = this.state.email;

    this.setState({
      formMessage: '',
    });

    if (!this.validateEmail(email)) {
      this.setState({
        formMessage: '*Please use a valid email',
      });

      return;
    }

    this.setState({
      busy: true,
    });

    setTimeout(() => {
      this.setState({
        busy: false,
        email: '',
        submitted: true,
        successMessage: `${this.state.email}`,
      });
    }, 2000);
  };

  onInputChange = (event) => {
    const email = event.target.value;

    this.setState({
      email,
    });
  };

  render() {
    if (this.state.submitted) {
      return (
        <div className="sign-up-confirmation">
          <span>{this.state.successMessage}</span> subscribed.
        </div>
      );
    }

    return (
      <form action="" method="post" onSubmit={this.onSubmit}>
        <label htmlFor="email-newsletter">Sign up for our newsletter</label>
        <input
          type="email"
          name="email"
          id="email-newsletter"
          value={this.state.email}
          onChange={this.onInputChange}
        ></input>
        <div className="form-message">{this.state.formMessage}</div>
        <button
          type="submit"
          className={`${this.state.busy === true ? 'busy' : ''}`}
        >
          {this.state.busy ? <i className="fas fa-spinner icon"></i> : 'SUMBIT'}
        </button>
      </form>
    );
  }
}

const newsletterContainer = document.querySelector(
  '.footer-sign-up-newsletter',
);
ReactDOM.createRoot(newsletterContainer).render(
  <NewsletterForm></NewsletterForm>,
);

class AddToCartButton extends React.Component {
  state = {
    busy: false,
    inCart: false,
  };

  onClick = () => {
    this.setState({
      busy: true,
    });

    setTimeout(() => {
      dispatchEvent(
        new CustomEvent(
          this.state.inCart ? REMOVE_FROM_CART_EVENT : ADD_TO_CART_EVENT,
          {
            detail: {
              productId: this.props.productId,
            },
          },
        ),
      );

      this.setState({
        busy: false,
        inCart: !this.state.inCart,
      });
    }, 2000);
  };

  render() {
    const productInCart = this.state.inCart;
    const productLoading = this.state.busy;

    return (
      <button
        onClick={this.onClick}
        type="button"
        title={`${productInCart ? 'Remove' : 'Add'} product to cart`}
        className={`product-control ${productLoading === true ? 'busy' : ''}`}
        disabled={productLoading}
      >
        {productInCart ? (
          <i className="far fa-check-square"></i>
        ) : (
          <i className="far fa-plus-square"></i>
        )}
        {productLoading ? <i className="fas fa-spinner icon"></i> : <></>}
      </button>
    );
  }
}

class AddToWishlistButton extends React.Component {
  state = {
    inWl: false,
    busy: false,
  };

  onClick = () => {
    this.setState({
      busy: true,
    });

    setTimeout(() => {
      dispatchEvent(
        new CustomEvent(
          this.state.inWl ? REMOVE_FROM_WL_EVENT : ADD_TO_WL_EVENT,
          {
            detail: {
              productId: this.props.productId,
            },
          },
        ),
      );

      this.setState({
        busy: false,
        inWl: !this.state.inWl,
      });
    }, 2000);
  };

  render() {
    const productInWl = this.state.inWl;
    const productLoading = this.state.busy;

    return (
      <button
        onClick={this.onClick}
        type="button"
        title={`${productInWl ? 'Remove' : 'Add'} product to wishlist`}
        className={`product-control ${productLoading === true ? 'busy' : ''}`}
        disabled={productLoading}
      >
        {productInWl ? (
          <i className="fa fa-heart added"></i>
        ) : (
          <i className="far fa-heart"></i>
        )}
        {productLoading ? <i className="fas fa-spinner icon"></i> : <></>}
      </button>
    );
  }
}

class ProductTileControls extends React.Component {
  render() {
    return (
      <>
        <AddToWishlistButton
          productId={this.props.productId}
        ></AddToWishlistButton>
        <AddToCartButton productId={this.props.productId}></AddToCartButton>
      </>
    );
  }
}
const productTileControls = document.querySelectorAll('.product-tile-controls');
productTileControls.forEach((productTileControl, index) => {
  ReactDOM.createRoot(productTileControl).render(
    <ProductTileControls productId={index}></ProductTileControls>,
  );
});

class CartCounter extends React.Component {
  state = {
    cartItemsCount: 0,
    cartItems: [],
  };

  productCartAction = (event) => {
    const { detail, type: eventType } = event;
    const { productId } = detail;
    const cartItems = this.state.cartItems.slice();

    switch (eventType) {
      case ADD_TO_CART_EVENT:
        cartItems.push(productId);
        this.setState({
          cartItems,
          cartItemsCount: this.state.cartItemsCount + 1,
        });
        break;
      case REMOVE_FROM_CART_EVENT:
        this.setState({
          cartItemsCount: this.state.cartItemsCount - 1,
          cartItems: cartItems.filter((productId) => {
            return productId !== detail.productId;
          }),
        });
        break;
    }
  };

  componentDidMount() {
    addEventListener(ADD_TO_CART_EVENT, this.productCartAction);
    addEventListener(REMOVE_FROM_CART_EVENT, this.productCartAction);
  }

  componentWillUnmount() {
    removeEventListener(ADD_TO_WL_EVENT, this.wishlistAction);
    removeEventListener(REMOVE_FROM_WL_EVENT, this.wishlistAction);
  }

  render() {
    return (
      <li
        className="header-counter"
        onClick={() => {
          alert(this.state.cartItems);
        }}
      >
        <span className="qty">
          {this.state.cartItemsCount > 0 ? this.state.cartItemsCount : '0'}
        </span>
        <i className="fas fa-shopping-bag icon"></i>
      </li>
    );
  }
}

class WishlistCounter extends React.Component {
  state = {
    itemCount: 0,
    items: [],
  };

  wishlistAction = (event) => {
    const { detail, type: eventType } = event;
    const { productId } = detail;
    const items = this.state.items.slice();

    switch (eventType) {
      case ADD_TO_WL_EVENT:
        items.push(productId);
        this.setState({
          items,
          itemCount: this.state.itemCount + 1,
        });
        break;
      case REMOVE_FROM_WL_EVENT:
        this.setState({
          itemCount: this.state.itemCount - 1,
          items: items.filter((productId) => {
            return productId !== detail.productId;
          }),
        });
        break;
    }
  };

  componentDidMount() {
    addEventListener(ADD_TO_WL_EVENT, this.wishlistAction);
    addEventListener(REMOVE_FROM_WL_EVENT, this.wishlistAction);
  }

  componentWillUnmount() {
    removeEventListener(ADD_TO_WL_EVENT, this.wishlistAction);
    removeEventListener(REMOVE_FROM_WL_EVENT, this.wishlistAction);
  }

  render() {
    return (
      <li
        className="header-counter"
        onClick={() => {
          alert(this.state.items);
        }}
      >
        <span className="qty">
          {this.state.itemCount > 0 ? this.state.itemCount : '0'}
        </span>
        <i className="fas fa-heart icon"></i>
      </li>
    );
  }
}

class HeaderCounters extends React.Component {
  render() {
    return (
      <>
        <CartCounter></CartCounter>
        <WishlistCounter></WishlistCounter>
      </>
    );
  }
}

const headerCounters = document.querySelector('.header-counters');
ReactDOM.createRoot(headerCounters).render(<HeaderCounters></HeaderCounters>);
