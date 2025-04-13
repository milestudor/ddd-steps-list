import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `ddd-steps-list`
 * 
 * @demo index.html
 * @element ddd-steps-item-list
 */
export class DddStepsListItem extends DDD {

  static get tag() {
    return "ddd-steps-list-item";
  }

  constructor() {
    super();
    this.step = 0;
    this.title = "Title";
    this.dddPrimary = false;
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/ddd-steps-list-item.ar.json", import.meta.url).href +
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
      dddPrimary: { type: Boolean, attribute: "ddd-primary", reflect: true },
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
        width: 12px;
        height: 12px;
        border-radius: 50%;
        font-size: 10px;
        font-weight: bold;
        background-color: #ddd;
        color:  #000;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      @media screen and (max-width: 600px) {
        .step-wrapper {
          flex-direction: column;
          align-items: flex-start;
        }
        .circle {
          margin-bottom: 8px;
        }
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
        <div class="content"></div>
          ${this.title ? html`<p class="title">${this.title}</p>` : ""}
          <slot></slot>
        </div>
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

customElements.define(DDDStepsListItem.tag, DDDStepsListItem);