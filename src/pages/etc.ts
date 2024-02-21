import Component from "../lib/dom";

class Etc extends Component {
  protected render(): string {
    return `
    <h1>Etc Page</h1>
    <ul>
      <li><a href="/" data-link>go Home</a></li>
      <li><a href="/about" data-link>go About</a></li>
      <li><a href="/category" data-link>go Category</a></li>
    </ul>`;
  }
}

export default Etc;
