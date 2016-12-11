/*
// Create a class for the element
class XProduct extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
    
    // Create a standard img element and set it's attributes.
    var img = document.createElement('img');
    img.alt = this.getAttribute('data-name');
    img.src = this.getAttribute('data-img');
    
    img.width = '150';
    img.height = '150';
    img.className = 'product-img';
    
    // Create a shadow root
    var shadow = this.attachShadow({mode: 'open'});
    
    // Add the image to the shadow root.
    shadow.appendChild(img);

    // Add an event listener to the image.
    img.addEventListener('click', () => {
      window.location = this.getAttribute('data-url');
    });

    // Create a link to the product.
    var link = document.createElement('a');
    link.innerText = this.getAttribute('data-name');
    link.href = this.getAttribute('data-url');
    link.className = 'product-name';

    // Add the link to the shadow root.
    shadow.appendChild(link);
  }
}

// Define the new element
customElements.define('x-product', XProduct);
*/

class CustomElem extends HTMLElement {
  constructor() {
    // Must be executed first in the constructor
    super();
    
    // Intialize class properties
    this._attrOne = null;
    this._attrTwo = null;
    this._someAttr1 = null;
    this._someAttr2 = null;
    
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
    var theInset = this.getElementsByClassName('inset')[0];
    theInset.innerHTML = this._someAttr1;
  }
}

customElements.define("custom-elem", CustomElem);





//
class TransparentImg1 extends HTMLElement {
  constructor() {
    super();
    var img = document.createElement('img');
    img.src = this.getAttribute('src');
    this.appendChild(img);
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