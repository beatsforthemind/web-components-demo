class CustomElem extends HTMLElement {
  constructor() {
    // Must be executed first in the constructor
    super();
    
    var shadowRoot = this.attachShadow({mode: 'open'});
    
    // Intialize class properties
    this._attrOne = null;
    this._attrTwo = null;
    this._someAttr1 = null;
    this._someAttr2 = null;
    
    
    var resetCss = "html{box-sizing:border-box}*,:after,:before{box-sizing:inherit}*{padding:0;margin:0;}";
    shadowRoot.innerHTML = "<style>"+resetCss+":host-context(#test1-container) { padding: 0px; background: #DDD; } :host(#test1) { display: block; padding: 10px !important; background: #444; } .inset { display: block; width: 100%; padding: 20px; background: #f46524; color: #000; font-size: 26px; }";

    var initVal = this.getAttribute("someattr1");
    
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
  static get observedAttributes() { return ["someattr1", "someattr1"]; }

  connectedCallback() {
    this._someAttr1 = this.getAttribute("someattr1");
    this._someAttr2 = this.getAttribute("someattr2");
    this._updateRendering();
  }
  
  // Executes whenever an attribute is changed
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "data-test1":
        this._attrOne = newValue;
        break;
      case "data-test2":
        this._attrTwo = newValue;
        break;
      case "someattr1":
        this._someAttr1 = newValue;
        break;
      case "someattr1":
        this._someAttr1 = newValue;
        break;
      default:
    }

    this._updateRendering();
  }
  
  // Getters and setters
  get someattr1() {
    console.log("Getting someattr1");
    return this._someAttr1;
  }
  set someattr1(v) {
    console.log("Setting someattr1");
    this.setAttribute("someattr1", v);
  }
  get someattr2() {
    console.log("Getting someattr2");
    return this._someAttr2;
  }
  set someattr2(v) {
    console.log("Getting someattr2");
    this.setAttribute("someattr2", v);
  }

  _updateRendering() {
    console.log("Updating rendering");
    console.log(this.shadowRoot.querySelector('.inset'));
    
    var theInset = this.shadowRoot.querySelector('.inset');
    theInset.innerHTML = this._someAttr1;
  }
}

customElements.define("custom-elem", CustomElem);
