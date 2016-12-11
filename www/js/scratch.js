class CustomElem extends HTMLElement {
  // Exectuted when element is created
  constructor() {
    super();
    
    // Set properties
    this._someProp1 = null;
    this._someProp2 = null;
    
    // Add event listeners
    this.addEventListener('click', e => {
      this._clickFunction();
    });
    
  }
  
  _clickFunction() {
    // click behavior
  }
  
  //
  static get observedAttributes() { return ["someprop1", "someprop2"]; }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name);
    
    switch (name) {
      case "data-test1":
        this._attrOne = newValue;
        break;
      case "data-test2":
        this._attrTwo = newValue;
        break;
      case "someprop1":
        this._someProp1 = newValue;
        break;
      case "someprop2":
        this._someProp1 = newValue;
        break;
      default:
    }

    this._updateRendering();
  }
  connectedCallback() {
    this._updateRendering();
  }
  
  // GETTERS AND SETTERS FOR PROPERTIES
  get someprop1() {
    return this._someProp1;
  }
  set someprop1(v) {
    this.setAttribute("someprop1", v);
  }
  get someprop2() {
    return this._someProp2;
  }
  set someprop2(v) {
    this.setAttribute("someprop2", v);
  }

  _updateRendering() {
    console.log("UPDATE RENDERING");
    var theInset = this.getElementsByClassName('inset')[0];
    theInset.innerHTML = this._attrOne;
  }
}

customElements.define("custom-elem", CustomElem);