# jQuery-Modal
* lightweight Modal for jQuery
* easy to customize
* different animation styles
* adds the $.Modal function to jQuery

## Dependencies:
* jQuery >= v1.5

## How To:
simple:
```javascript
var modal = $.Modal("your modal content here");
modal.open();
```
advanced:
```javascript
var modal = $.Modal("your modal content here", {
  animation: "fade"
});
modal.open().done(function ()).fail(function ());
```
... or take a look at the examples.

## Methods:
* open() > opens the Modal and returns a promise
* close([true, false], value) > closes the Modal and resolves / rejects the promise with the value;
* $content > the content passed to the Modal as jQuery-Element
* destroy() > destroys the Modal
