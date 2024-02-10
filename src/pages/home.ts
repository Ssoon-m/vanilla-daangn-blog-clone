import Component from "../lib/dom";
import Router from "../lib/router";

class Home extends Component {
  protected render(): string {
    return `
    <h1>Home Page</h1>
    <ul>
      <li><a href="/about/10" data-link>go About</a></li>
      <li><a href="/login" data-link>go Login</a></li>
    </ul>
    <button>go About!!</button>
    `;
  }
  protected setEvent(): void {
    this.attachEvent("button", "click", () => {
      Router.navigateTo(`/about/${Math.ceil(Math.random() * 10)}`);
    });
  }
}

export default Home;
