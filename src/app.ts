import Component from "./lib/dom";
import Router from "./lib/router";
import { routes } from "./routes";

type MyState = {
  list: Array<{ title: string }>;
};

class App extends Component<never, MyState> {
  protected mounted(): void {
    new Router(this.node, routes);
  }
}

export default App;
