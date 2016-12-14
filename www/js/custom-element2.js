class CustomElem extends HTMLElement {
  constructor() {
    // Must be executed first in the constructor
    super();
    
    var shadowRoot = this.attachShadow({mode: 'open'});
    
    // Intialize class properties
    this._someProp1 = null;
    this._someProp2 = null;
    
    var resetCss = "html{box-sizing:border-box}*,:after,:before{box-sizing:inherit}*{padding:0;margin:0;}";
    shadowRoot.innerHTML = "<style>"+resetCss+" :host-context(#test1-container) { padding: 0px; background: #DDD; } :host(#test1) { display: block; padding: 10px !important; background: #444; } .inset { display: block; width: 100%; padding: 20px; background: #f46524; color: #000; font-size: 26px; } ::slotted(h2) { color: #FFF; } custom-elem:not(:defined) { display: block; width: 100%; height: 100px; background: red; }</style>";
    // <slot name=\"slot1\"></slot>
    // <slot select=\"img\"></slot>

    var initVal = this.getAttribute("someprop1");
    
    shadowRoot.appendChild(
      (function() {
        var insetDiv = document.createElement('div')
        insetDiv.className = 'inset';
        insetDiv.innerHTML = initVal;
        return insetDiv;
      })()
    );
    
    this.addEventListener('click', e => {
      if(this.disabled) {
        return;
      }
      this.toggleElem(10);
    });
    
  }
  
  toggleElem(degrees) {
    $(this).css({'transform' : 'rotate('+ degrees +'deg)'});
  }

  // Set array of attributes to be accessible by getters and setters
  static get observedAttributes() { return ["someprop1", "someprop2"]; }

  connectedCallback() {
    this._someProp1 = this.getAttribute("someprop1");
    this._someProp2 = this.getAttribute("someprop2");
    this._updateRendering();
  }
  
  // Executes whenever an attribute is changed
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "someprop1":
        this._someProp1 = newValue;
        break;
      case "someprop2":
        this._someProp2 = newValue;
        break;
      default:
    }

    this._updateRendering();
  }
  
  // Getters and setters
  get someprop1() {
    console.log("Getting someprop1");
    return this._someProp1;
  }
  set someprop1(v) {
    console.log("Setting someprop1");
    this.setAttribute("someprop1", v);
  }
  get someprop2() {
    console.log("Getting someprop2");
    return this._someProp2;
  }
  set someprop2(v) {
    console.log("Getting someprop2");
    this.setAttribute("someprop2", v);
  }

  _updateRendering() {
    console.log("Updating rendering");
    console.log(this.shadowRoot.querySelector('.inset'));
    
    var theInset = this.shadowRoot.querySelector('.inset');
    theInset.innerHTML = this._someProp1;
  }
}

customElements.define("custom-elem", CustomElem);
