import { Toast } from "toaster-js"; // https://www.npmjs.com/package/toaster-js
import 'toaster-js/default.css';

// new Toast("Welcome!");
// new Toast("There is a lot of toasts!", Toast.TYPE_ERROR, Toast.TIME_NORMAL);

// let element = document.createElement("div");
// element.textContent = "You can pass any HTML elements to Toast. Clicking on this one deletes it!";
//
// let newToast = new Toast(element, Toast.TYPE_MESSAGE);
// element.addEventListener("click", () => {
//   console.log('CLICKED');
//   newToast.delete();
// });

// BASED ON toaster-js@2.2.0 2020-02-08
class Toaster {
  constructor() {
    this.Toast = Toast;
    this.message = this.message.bind(this);
  }
  getOriginalType(type) { return `TYPE_${type.toUpperCase()}`; }
  getOriginalTime(time) { return `TIME_${time.toUpperCase()}`; }
  message({
    // Required:
    text,
    // Optional:
    type = 'message', // info|message|warning|error|done
    onClick,
    removeFromDOMByClick = true,
    time = 'normal', // short|normal|long
  }) {
    let element = document.createElement("div");

    element.textContent = text;

    let newToast = new this.Toast(
      element,
      this.Toast[this.getOriginalType(type)],
      this.Toast[this.getOriginalTime(time)],
    );

    element.addEventListener("click", () => {
      if (onClick) onClick();
      if (removeFromDOMByClick) newToast.delete();
    });
  }
  help() {
    console.group('window.toaster.help()');
    console.log('EXAMPLE:');
    console.log('window.toaster.message({\n');
    [
      { 'name': 'type', 'type': 'string', default: 'message', description: 'info|message|warning|error|done' },
      { 'name': 'text', 'type': 'string' },
      { 'name': 'onClick', 'type': 'function' },
      { 'name': 'removeFromDOMByClick', 'type': 'boolean', default: true },
      { 'name': 'time', 'type': 'string', default: 'normal', description: 'short|normal|long' },
    ].forEach(e => {
      console.log('\t' + `${e.name}: ${e.description ? `${e.description} ` : ''}(${e.type}),`);
    });
    console.log('});');
    console.log('METHODS:');
    [...Object.keys(this)].forEach(e => console.log(this[e]));
    console.groupEnd('window.toaster.help()');
  }
}

// Read about styling: https://www.npmjs.com/package/toaster-js#styles
/* States:
  <div class="toast">           <div class="body info">...</div> </div>
  <div class="toast displayed"> <div class="body info">...</div> </div>
  <div class="toast deleted">   <div class="body info">...</div> </div>
*/

window.toaster = new Toaster;
