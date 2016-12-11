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
    super();
    this._attrOne = null;
    this._attrTwo = null;
    this._someProp1 = null;
    this._someProp2 = null;
    
    console.log(this);
    
    this.innerHTML = "<style>custom-elem { display: block; width: 100%; padding: 10px; background: #888; color: #000 }</style>";

    var initVal = this.dataset.test1;
    
    this.appendChild(
      (function() {
        var innerDiv = document.createElement('div')
        innerDiv.className = 'inset';
        innerDiv.innerHTML = initVal;
        return innerDiv;
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

  static get observedAttributes() { return ["data-test1", "data-test2", "someprop1", "someprop2"]; }

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



//

class TransparentImg extends HTMLImageElement {
  constructor() {
    super();
    console.log("IMAGE");
    console.log(this);
    this.style.opacity = "0.5";
  }
}
customElements.define("transparent-img", TransparentImg,  { extends: "img" });

/*
class TransparentImg extends Image {
  constructor() {
    super();
    
    console.log("IMAGE");
    console.log(this);
    
    this.style.opacity = "0.5";
  }
}
customElements.define("transparent-img", TransparentImg, { extends: "img" });
*/
/*
customElements.define('transparent-img', class extends Image {
  constructor() {
    super();
    console.log(this);
    this.style.opacity = "0.5";
  }
}, {extends: 'img'});
*/

//

