import { injectCss } from "../utils";

export class CalculatorButton {
  private root: HTMLButtonElement;

  constructor(text: string) {
    this.root = this.createRoot(text);
  }

  public addClass(className: string) {
    this.root.classList.add(className);
    return this;
  }

  public onClick(listener: () => void) {
    this.root.addEventListener("click", listener);
    return this;
  }

  public renderTo(container: Element) {
    this.initCss();
    container.append(this.root);
  }

  private createRoot(text: string) {
    const root = document.createElement("button");
    root.classList.add("calculator_button");
    root.innerText = text;
    return root;
  }

  protected initCss() {
    injectCss(
      /* css*/ `
    .calculator_button {
      padding: 10px;
      font-size: 18px;
      border: 1px solid #ccc;
      border-radius: 3px;
      background: #fff;
      cursor: pointer;
    }
    .calculator_button:hover {
      opacity: 0.9;
    }

          `,
      "calculator_button"
    );
  }
}
