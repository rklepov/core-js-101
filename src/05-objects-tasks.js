/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */

/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  return {
    width,
    height,
    getArea() {
      return this.width * this.height;
    },
  };
}

/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}

/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  // return Object.setPrototypeOf(JSON.parse(json), proto);

  function JsonObject() {
    Object.assign(this, JSON.parse(json));
  }

  JsonObject.prototype = proto;

  return new JsonObject();
}

/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

/* eslint max-classes-per-file: ["error", 9] */

class SelectorItem {
  constructor(value) {
    this.value = value;
    this.order = SelectorItem.itemsOrder[this.constructor.name];
  }

  stringify() {
    return this.value;
  }
}

SelectorItem.itemsOrder = {
  Element: 0,
  Id: 1,
  Class: 2,
  Attr: 3,
  PseudoClass: 4,
  PseudoElement: 5,
};

class Element extends SelectorItem {}

class Id extends SelectorItem {
  stringify() {
    return `#${super.stringify()}`;
  }
}

class Class extends SelectorItem {
  stringify() {
    return `.${super.stringify()}`;
  }
}

class Attr extends SelectorItem {
  stringify() {
    return `[${super.stringify()}]`;
  }
}

class PseudoClass extends SelectorItem {
  stringify() {
    return `:${super.stringify()}`;
  }
}

class PseudoElement extends SelectorItem {
  stringify() {
    return `::${super.stringify()}`;
  }
}

class CombinedSelector {
  constructor(left, combinator, right) {
    this.left = left;
    this.right = right;
    this.combinator = combinator;
  }

  stringify() {
    return `${this.left.stringify()} ${
      this.combinator
    } ${this.right.stringify()}`;
  }
}

class Selector {
  constructor(item) {
    this.items = [];
    this.items.push(item);
  }

  static throwUnique() {
    // prettier-ignore
    throw new Error(
      'Element, id and pseudo-element should not occur more then one time inside the selector',
    );
  }

  static throwOrder() {
    // prettier-ignore
    throw new Error(
      'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element',
    );
  }

  hasItemOfType(cls) {
    return !!this.items.find((x) => x instanceof cls);
  }

  checkUnique(cls) {
    if (this.hasItemOfType(cls)) {
      Selector.throwUnique();
    }
  }

  checkOrder(item) {
    if (this.items.slice(-1)[0].order > item.order) {
      Selector.throwOrder();
    }
  }

  stringify() {
    return this.items.map((x) => x.stringify()).join('');
  }

  element(value) {
    this.checkUnique(Element);
    const item = new Element(value);
    this.checkOrder(item);
    this.items.push(item);
    return this;
  }

  id(value) {
    this.checkUnique(Id);
    const item = new Id(value);
    this.checkOrder(item);
    this.items.push(item);
    return this;
  }

  class(value) {
    const item = new Class(value);
    this.checkOrder(item);
    this.items.push(item);
    return this;
  }

  attr(value) {
    const item = new Attr(value);
    this.checkOrder(item);
    this.items.push(item);
    return this;
  }

  pseudoClass(value) {
    const item = new PseudoClass(value);
    this.checkOrder(item);
    this.items.push(item);
    return this;
  }

  pseudoElement(value) {
    this.checkUnique(PseudoElement);
    const item = new PseudoElement(value);
    this.checkOrder(item);
    this.items.push(item);
    return this;
  }
}

const cssSelectorBuilder = {
  element(value) {
    return new Selector(new Element(value));
  },

  id(value) {
    return new Selector(new Id(value));
  },

  class(value) {
    return new Selector(new Class(value));
  },

  attr(value) {
    return new Selector(new Attr(value));
  },

  pseudoClass(value) {
    return new Selector(new PseudoClass(value));
  },

  pseudoElement(value) {
    return new Selector(new PseudoElement(value));
  },

  combine(selector1, combinator, selector2) {
    return new CombinedSelector(selector1, combinator, selector2);
  },
};

module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
