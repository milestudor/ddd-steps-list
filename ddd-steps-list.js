import { LitElement, html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import { DDDStepsListItem } from "./ddd-steps-list-item.js";

/**
 * `ddd-steps-list`
 * 
 * @demo index.html
 * @element ddd-steps-list
 */
export class DddStepsList extends DDD {

  static get tag() {
    return "ddd-steps-list";
  }

  constructor() {
    super();
    this.dddPrimary = false;
    this.title = "";
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
      dddPrimary: { type: Number, attribute: "ddd-primary", reflect: true },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        display: flex;
        flex-direction: column;
      }
      h3 span {
        font-size: var(--ddd-steps-list-label-font-size, var(--ddd-font-size-s));
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
      <div class="wrapper">
        <slot @slotchange="${this.onSlotChange}"></slot>
      </div>
    `;
  }
  
  firstUpdated() {
    this.verifyChildren();
  }

  onSlotChange() {
    this.verifyChildren();
  }

  verifyChildren() {
    const children = Array.from(this.children);
    let stepCount = 0;
    children.forEach((child) => {
      const tag = child.tagName.toLowerCase();
      if (tag !== 'ddd-steps-list-item') {
        this.removeChild(child);
      } else {
        stepCount++;
        child.step = stepCount;
        if (this.dddPrimary) {
          child.setAttribute('data-primary', '');
        } else {
          child.removeAttribute('data-primary');
        }
      }
    });
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    // If dddPrimary changes, update all children to reflect new value
    if (changedProperties.has('dddPrimary')) {
      const items = this.querySelectorAll('ddd-steps-list-item');
      items.forEach((item) => {
        if (this.dddPrimary) {
          item.dddPrimary = this.dddPrimary;
        } else {
          item.removeAttribute('data-primary');
        }
      });
    }
  }
}

customElements.define('ddd-steps-list', DDDStepsList);