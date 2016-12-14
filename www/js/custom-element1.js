class CustomElem extends HTMLElement {
  constructor() {
    // Must be executed first in the constructor
    super();
    
    // Intialize class properties
    this._someProp1 = null;
    this._someProp2 = null;
    
    // console.log(this);
    
    // Insert styles
    this.innerHTML = "<style>custom-elem { display: block; width: 100%; padding: 20px; background: #f46524; color: #000; font-size: 26px; }</style>";

    // var initVal = this.dataset.test1;
    var initVal = this.getAttribute("someattr1");
    console.log(initVal);
    
    this.appendChild(
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
      this.moveElem(10);
    });
    
  }
  
  moveElem(degrees) {
    $(this).css({'transform' : 'rotate('+ degrees +'deg)'});
  }

  // Set array of attributes to be accessible by getters and setters and affect attributeChangedCallback
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
  get someattr2() {
    console.log("Getting someprop2");
    return this._someProp2;
  }
  set someprop2(v) {
    console.log("Getting someprop2");
    this.setAttribute("someprop2", v);
  }

  _updateRendering() {
    console.log("Updating rendering");
    var theInset = this.getElementsByClassName('inset')[0];
    theInset.innerHTML = this._someProp1;
  }
}

customElements.define("custom-elem", CustomElem);





//
class TransparentImg1 extends Image {
  constructor() {
    super();
    this.style.opacity = "0.5";
  }
}
customElements.define("transparent-img", TransparentImg1,  { extends: "img" });


/*
//
customElements.define('transparent-img', class extends HTMLImageElement {
  constructor() {
    super();
    this.style.opacity = "0.5";
  }
}, {extends: 'img'});
*/