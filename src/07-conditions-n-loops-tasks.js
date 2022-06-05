/* *************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling  *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration              *
 *                                                                                                *
 ************************************************************************************************ */

/**
 * Returns the 'Fizz','Buzz' or an original number using the following rules:
 * 1) return original number
 * 2) but if number multiples of three return 'Fizz'
 * 3) for the multiples of five return 'Buzz'
 * 4) for numbers which are multiples of both three and five return 'FizzBuzz'
 *
 * @param {number} num
 * @return {any}
 *
 * @example
 *   2 =>  2
 *   3 => 'Fizz'
 *   5 => 'Buzz'
 *   4 => 4
 *  15 => 'FizzBuzz'
 *  20 => 'Buzz'
 *  21 => 'Fizz'
 *
 */
function getFizzBuzz(num) {
  return [
    [num, 'Buzz'],
    ['Fizz', 'FizzBuzz'],
  ][+(num % 3 === 0)][+(num % 5 === 0)];
}

/**
 * Returns the factorial of the specified integer n.
 *
 * @param {number} n
 * @return {number}
 *
 * @example:
 *   1  => 1
 *   5  => 120
 *   10 => 3628800
 */
function getFactorial(n) {
  if (n > 0) {
    return n * getFactorial(n - 1);
  }
  return 1;
}

/**
 * Returns the sum of integer numbers between n1 and n2 (inclusive).
 *
 * @param {number} n1
 * @param {number} n2
 * @return {number}
 *
 * @example:
 *   1,2   =>  3  ( = 1+2 )
 *   5,10  =>  45 ( = 5+6+7+8+9+10 )
 *   -1,1  =>  0  ( = -1 + 0 + 1 )
 */
function getSumBetweenNumbers(n1, n2) {
  return (n2 * (n2 + 1)) / 2 - ((n1 - 1) * n1) / 2;
}

/**
 * Returns true, if a triangle can be built with the specified sides a, b, c
 * and false in any other ways.
 *
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {bool}
 *
 * @example:
 *   1,2,3    =>  false
 *   3,4,5    =>  true
 *   10,1,1   =>  false
 *   10,10,10 =>  true
 */
function isTriangle(a, b, c) {
  return a + b > c && a + c > b && b + c > a;
}

/**
 * Returns true, if two specified axis-aligned rectangles overlap, otherwise false.
 * Each rectangle representing by object
 *  {
 *     top: 5,
 *     left: 5,
 *     width: 20,
 *     height: 10
 *  }
 *
 *  (5;5)
 *     -------------
 *     |           |
 *     |           |  height = 10
 *     -------------
 *        width=20
 *
 * NOTE: Please use canvas coordinate space (https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#The_grid),
 * it differs from Cartesian coordinate system.
 *
 * @param {object} rect1
 * @param {object} rect2
 * @return {bool}
 *
 * @example:
 *   { top: 0, left: 0, width: 10, height: 10 },
 *   { top: 5, left: 5, width: 20, height: 20 }    =>  true
 *
 *   { top: 0, left: 0, width: 10, height: 10 },
 *   { top:20, left:20, width: 20, height: 20 }    =>  false
 *
 */
function doRectanglesOverlap(rect1, rect2) {
  // prettier-ignore
  class Rect {
    constructor({
      top, left, width, height,
    }) {
      this.tl = { x: left, y: top }; /* top left */
      this.br = { x: left + width, y: top + height }; /* bottom right */
    }
  }

  const R1 = new Rect(rect1);
  const R2 = new Rect(rect2);

  if (R1.tl.x > R2.br.x || R2.tl.x > R1.br.x) {
    return false;
  }

  if (R1.tl.y > R2.br.y || R2.tl.y > R1.br.y) {
    return false;
  }

  return true;
}

/**
 * Returns true, if point lies inside the circle, otherwise false.
 * Circle is an object of
 *  {
 *     center: {
 *       x: 5,
 *       y: 5
 *     },
 *     radius: 20
 *  }
 *
 * Point is object of
 *  {
 *     x: 5,
 *     y: 5
 *  }
 *
 * @param {object} circle
 * @param {object} point
 * @return {bool}
 *
 * @example:
 *   { center: { x:0, y:0 }, radius:10 },  { x:0, y:0 }     => true
 *   { center: { x:0, y:0 }, radius:10 },  { x:10, y:10 }   => false
 *
 */
function isInsideCircle(circle, point) {
  // prettier-ignore
  return (
    Math.sqrt(
      (point.x - circle.center.x) ** 2 + (point.y - circle.center.y) ** 2,
    ) < circle.radius
  );
}

/**
 * Returns the first non repeated char in the specified strings otherwise returns null.
 *
 * @param {string} str
 * @return {string}
 *
 * @example:
 *   'The quick brown fox jumps over the lazy dog' => 'T'
 *   'abracadabra'  => 'c'
 *   'entente' => null
 */
function findFirstSingleChar(str) {
  const distinctChars = str
    .split('')
    .filter((x, i, a) => ![...a.slice(0, i), ...a.slice(i + 1)].includes(x));

  return distinctChars.length > 0 ? distinctChars[0] : null;
}

/**
 * Returns the string representation of math interval,
 * specified by two points and include / exclude flags.
 * See the details: https://en.wikipedia.org/wiki/Interval_(mathematics)
 *
 * Please take attention, that the smaller number should be the first in the notation
 *
 * @param {number} a
 * @param {number} b
 * @param {bool} isStartIncluded
 * @param {bool} isEndIncluded
 * @return {string}
 *
 * @example
 *   0, 1, true, true   => '[0, 1]'
 *   0, 1, true, false  => '[0, 1)'
 *   0, 1, false, true  => '(0, 1]'
 *   0, 1, false, false => '(0, 1)'
 * Smaller number has to be first :
 *   5, 3, true, true   => '[3, 5]'
 *
 */
function getIntervalString(a, b, isStartIncluded, isEndIncluded) {
  const left = isStartIncluded ? '[' : '(';
  const right = isEndIncluded ? ']' : ')';
  const first = Math.min(a, b);
  const last = Math.max(a, b);

  return `${left}${first}, ${last}${right}`;
}

/**
 * Reverse the specified string (put all chars in reverse order)
 *
 * @param {string} str
 * @return {string}
 *
 * @example:
 * 'The quick brown fox jumps over the lazy dog' => 'god yzal eht revo spmuj xof nworb kciuq ehT'
 * 'abracadabra' => 'arbadacarba'
 * 'rotator' => 'rotator'
 * 'noon' => 'noon'
 */
function reverseString(str) {
  return str.split('').reverse().join('');
}

/**
 * Reverse the specified integer number (put all digits in reverse order)
 *
 * @param {number} num
 * @return {number}
 *
 * @example:
 *   12345 => 54321
 *   1111  => 1111
 *   87354 => 45378
 *   34143 => 34143
 */
function reverseInteger(num) {
  function reverse(a, n) {
    if (n === 0) return a;
    const d = n % 10;
    const r = Math.floor(n / 10);
    return reverse(a * 10 + d, r);
  }

  return reverse(0, num);
}

/**
 * Validates the CCN (credit card number) and return true if CCN is valid
 * and false otherwise.
 *
 * See algorithm here : https://en.wikipedia.org/wiki/Luhn_algorithm
 *
 * @param {number} cnn
 * @return {boolean}
 *
 * @example:
 *   79927398713      => true
 *   4012888888881881 => true
 *   5123456789012346 => true
 *   378282246310005  => true
 *   371449635398431  => true
 *
 *   4571234567890111 => false
 *   5436468789016589 => false
 *   4916123456789012 => false
 */
function isCreditCardNumber(ccn) {
  let n = ccn;
  let i = 1;
  let sum = 0;

  while (n > 0) {
    let d = 0;
    if (n > Number.MAX_SAFE_INTEGER) {
      d = Number(n.toString().split('').pop());
    } else {
      d = n % 10;
    }

    if (i % 2 === 0) {
      d *= 2;
    }

    if (d > 9) {
      d -= 9;
    }

    sum += d;
    i += 1;
    n = Math.floor(n / 10);
  }

  return sum % 10 === 0;
}

/**
 * Returns the digital root of integer:
 *   step1 : find sum of all digits
 *   step2 : if sum > 9 then goto step1 otherwise return the sum
 *
 * @param {number} n
 * @return {number}
 *
 * @example:
 *   12345 ( 1+2+3+4+5 = 15, 1+5 = 6) => 6
 *   23456 ( 2+3+4+5+6 = 20, 2+0 = 2) => 2
 *   10000 ( 1+0+0+0+0 = 1 ) => 1
 *   165536 (1+6+5+5+3+6 = 26,  2+6 = 8) => 8
 */
function getDigitalRoot(num) {
  function sumDigits(n) {
    if (n === 0) return n;
    return (n % 10) + sumDigits(Math.floor(n / 10));
  }

  const result = sumDigits(num);

  return result > 9 ? getDigitalRoot(result) : result;
}

/**
 * Returns true if the specified string has the balanced brackets and false otherwise.
 * Balanced means that is, whether it consists entirely of pairs of opening/closing brackets
 * (in that order), none of which mis-nest.
 * Brackets include [],(),{},<>
 *
 * @param {string} str
 * @return {boolean}
 *
 * @example:
 *   '' => true
 *   '[]'  => true
 *   '{}'  => true
 *   '()   => true
 *   '[[]' => false
 *   ']['  => false
 *   '[[][][[]]]' => true
 *   '[[][]][' => false
 *   '{)' = false
 *   '{[(<{[]}>)]}' = true
 */
function isBracketsBalanced(str) {
  const brackets = {
    '[': ']',
    '{': '}',
    '(': ')',
    '<': '>',
  };
  return (
    str.split('').reduce((stack, s) => {
      if (Object.keys(brackets).includes(s)) {
        stack.unshift(s);
      } else if (Object.values(brackets).includes(s)) {
        if (stack.length === 0 || brackets[stack[0]] !== s) {
          // TODO: can be optimized, no need for further checks after first 'X'
          stack.unshift('X');
        } else {
          stack.shift();
        }
      }
      return stack;
    }, []).length === 0
  );
}

/**
 * Returns the string with n-ary (binary, ternary, etc, where n <= 10)
 * representation of specified number.
 * See more about
 * https://en.wikipedia.org/wiki/Binary_number
 * https://en.wikipedia.org/wiki/Ternary_numeral_system
 * https://en.wikipedia.org/wiki/Radix
 *
 * @param {number} num
 * @param {number} n, radix of the result
 * @return {string}
 *
 * @example:
 *   1024, 2  => '10000000000'
 *   6561, 3  => '100000000'
 *    365, 2  => '101101101'
 *    365, 3  => '111112'
 *    365, 4  => '11231'
 *    365, 10 => '365'
 */
function toNaryString(num, n) {
  if (num < 1) return '';
  return [toNaryString(Math.floor(num / n), n), String(num % n)].join('');
}

/**
 * Returns the common directory path for specified array of full filenames.
 *
 * @param {array} paths
 * @return {string}
 *
 * @example:
 *   ['/web/images/image1.png', '/web/images/image2.png']  => '/web/images/'
 *   ['/web/assets/style.css', '/web/scripts/app.js',  'home/setting.conf'] => ''
 *   ['/web/assets/style.css', '/.bin/mocha',  '/read.me'] => '/'
 *   ['/web/favicon.ico', '/web-scripts/dump', '/verbalizer/logs'] => '/'
 */
function getCommonDirectoryPath(paths) {
  const splitPaths = paths.map((x) => x.split('/'));
  const lengths = splitPaths.map((x) => x.length);
  const minPathLen = Math.min(...lengths);
  const minLenIx = splitPaths.findIndex((x) => x.length === minPathLen);

  let i = 0;
  for (; i < minPathLen; i += 1) {
    const ix = i;
    if (!splitPaths.every((x) => x[ix] === splitPaths[minLenIx][ix])) break;
  }

  return [...splitPaths[minLenIx].slice(0, i), ''].join('/');
}

/**
 * Returns the product of two specified matrixes.
 * See details: https://en.wikipedia.org/wiki/Matrix_multiplication
 *
 * @param {array} m1
 * @param {array} m2
 * @return {array}
 *
 * @example:
 *   [[ 1, 0, 0 ],       [[ 1, 2, 3 ],           [[ 1, 2, 3 ],
 *    [ 0, 1, 0 ],   X    [ 4, 5, 6 ],     =>     [ 4, 5, 6 ],
 *    [ 0, 0, 1 ]]        [ 7, 8, 9 ]]            [ 7, 8, 9 ]]
 *
 *                        [[ 4 ],
 *   [[ 1, 2, 3]]    X     [ 5 ],          =>     [[ 32 ]]
 *                         [ 6 ]]
 *
 */
function getMatrixProduct(m1, m2) {
  const result = Array(m1.length)
    .fill(0)
    .map((x, i) => Array(m2[i].length).fill(x));

  for (let i = 0; i < m1.length; i += 1) {
    for (let j = 0; j < m2[i].length; j += 1) {
      result[i][j] = m1[i].reduce((a, x, k) => a + x * m2[k][j], 0);
    }
  }
  return result;
}

/**
 * Returns the evaluation of the specified tic-tac-toe position.
 * See the details: https://en.wikipedia.org/wiki/Tic-tac-toe
 *
 * Position is provides as 3x3 array with the following values: 'X','0', undefined
 * Function should return who is winner in the current position according to the game rules.
 * The result can be: 'X','0',undefined
 *
 * @param {array} position
 * @return {string}
 *
 * @example
 *
 *   [[ 'X',   ,'0' ],
 *    [    ,'X','0' ],       =>  'X'
 *    [    ,   ,'X' ]]
 *
 *   [[ '0','0','0' ],
 *    [    ,'X',    ],       =>  '0'
 *    [ 'X',   ,'X' ]]
 *
 *   [[ '0','X','0' ],
 *    [    ,'X',    ],       =>  undefined
 *    [ 'X','0','X' ]]
 *
 *   [[    ,   ,    ],
 *    [    ,   ,    ],       =>  undefined
 *    [    ,   ,    ]]
 *
 */
function evaluateTicTacToePosition(position) {
  const SIZE = position.length;

  let rowCount = { X: 0, 0: 0, undefined: 0 };
  let colCount = { X: 0, 0: 0, undefined: 0 };
  const firstDiagCount = { X: 0, 0: 0, undefined: 0 };
  const secondDiagCount = { X: 0, 0: 0, undefined: 0 };

  function winner(counter) {
    const result = Object.entries(counter).find(([, count]) => count === SIZE);
    if (result) {
      let [item] = result;
      if (item === 'undefined') item = undefined;
      return item;
    }
    return result;
  }

  function resetCounter(counter) {
    const newCounter = {};
    Object.keys(counter).forEach((k) => {
      newCounter[k] = 0;
    });
    return newCounter;
  }

  for (let i = 0; i < SIZE; i += 1) {
    for (let j = 0; j < SIZE; j += 1) {
      let item = position[i][j];
      rowCount[item] += 1;

      item = position[j][i];
      colCount[item] += 1;

      if (i === j) {
        item = position[i][j];
        firstDiagCount[item] += 1;

        item = position[i][SIZE - j - 1];
        secondDiagCount[item] += 1;
      }
    }

    let lineWinner = winner(rowCount);
    if (lineWinner) return lineWinner;
    rowCount = resetCounter(rowCount);

    lineWinner = winner(colCount);
    if (lineWinner) return lineWinner;
    colCount = resetCounter(colCount);
  }

  const diagWinner = winner(firstDiagCount);
  if (diagWinner) return diagWinner;

  return winner(secondDiagCount);
}

module.exports = {
  getFizzBuzz,
  getFactorial,
  getSumBetweenNumbers,
  isTriangle,
  doRectanglesOverlap,
  isInsideCircle,
  findFirstSingleChar,
  getIntervalString,
  reverseString,
  reverseInteger,
  isCreditCardNumber,
  getDigitalRoot,
  isBracketsBalanced,
  toNaryString,
  getCommonDirectoryPath,
  getMatrixProduct,
  evaluateTicTacToePosition,
};
