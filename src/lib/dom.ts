class Component<P = never, S = never> {
  node: HTMLElement | Element;
  props: P;
  state = {} as S;
  constructor(node: HTMLElement | Element, props: P = {} as P) {
    this.node = node;
    this.props = props;
    this.bootStrap();
  }
  private bootStrap() {
    this.setup?.();
    this.renderDOM();
  }
  private renderDOM() {
    this.node.innerHTML = this.render();
    this.mounted?.();
    this.setEvent?.();
  }
  protected setEvent?(): void;
  protected setup?(): void;
  protected mounted?(): void;
  protected render() {
    return "";
  }

  protected attachEvent(
    $el: string,
    eventType: string,
    listener: (evt: Event) => void
  ) {
    const _$el = Array.from(this.node.querySelectorAll($el));
    this.node.addEventListener(eventType, (event) => {
      const el = event.target as Element;
      if (_$el.includes(el)) {
        listener(event);
      }
    });
  }
  protected setState(newState: Partial<S>) {
    this.state = { ...this.state, ...newState };
    this.renderDOM();
  }
}

export default Component;
