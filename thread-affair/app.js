class NewsletterForm extends React.Component {
  // state v1
  state = {
    email: '',
  };

  validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  }

  onSubmit = (event) => {
    event.preventDefault();
  };

  onInputChange = (event) => {
    // currentTarget -> elementul pe care am pus eventul
    // target -> elementul de pe care a plecat eventul
    const email = event.target.value;

    this.setState({
      email,
    });
  };

  render() {
    return (
      <form className="form-newsletter container" onSubmit={this.onSubmit}>
        <label htmlFor="field-newsletter">
          Subscribe to our <span>newsletter</span>
        </label>
        <input
          type="text"
          name="field-newsletter"
          id="field-newsletter"
          value={this.state.email}
          onChange={this.onInputChange}
          placeholder="enter your email address to receive the latest news!"
        ></input>
        <button>Subscribe</button>
      </form>
    );
  }
}

const newsletterContainer = document.querySelector('.home-newsletter');
// mount react the good way
ReactDOM.createRoot(newsletterContainer).render(
  <NewsletterForm></NewsletterForm>,
);
