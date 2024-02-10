import Component from "../lib/dom";

class Login extends Component {
  protected render(): string {
    return `
    <h1>Login Page</h1>
    <ul>
      <li><a href="/" data-link>go Home</a></li>
      <li><a href="/about/100" data-link>go About</a></li>
    </ul>`;
  }
}

export default Login;
