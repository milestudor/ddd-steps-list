import { LitElement, html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `ddd-steps-list`
 * 
 * @demo index.html
 * @element ddd-steps-item-list
 */
export class DddStepsList extends LitElement {

  static get tag() {
    return "ddd-steps-item-list";
  }

  constructor() {
    super();
    this.step = 0;
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/ddd-steps-list.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      step: { type: Number, reflect: true },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        margin-bottom: var(--ddd-spacing-6, 24px);
      }
      :host([data-primary]) .circle {
        background-color: var(--ddd-theme-default-beaverBlue, #1e407c);
        color: #fff;
      }
      .step-wrapper {
        display: flex;
        align-items: flex-start;
      }
      .circle {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        font-size: 12px;
        font-weight: bold;
        background-color: #ddd;
        color:  #000;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .content {
        flex: 1;
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
      <div class="step-wrapper">
        <div class="circle">${this.step}</div>
        <div class="content"><slot></slot></div>
      </div>
      `;

  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(DddStepsItemList.tag, DddStepsItemList);