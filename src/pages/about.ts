import Component from "../lib/dom";

type MyProps = {
  params: string;
};
class About extends Component<MyProps> {
  protected render(): string {
    return `
    <h1>About Page ${this.props.params}</h1>
    <ul>
      <li><a href="/" data-link>go Home</a></li>
      <li><a href="/login" data-link>go Login</a></li>
    </ul>`;
  }
}

export default About;
