import Component from "../lib/dom";

class Category extends Component {
  protected render(): string {
    return `
    <h1>Category Page</h1>
    <ul>
      <li><a href="/" data-link>go Home</a></li>
      <li><a href="/about" data-link>go About</a></li>
      <li><a href="/category/etc" data-link>go Category Etc</a></li>
    </ul>`;
  }
}

export default Category;
