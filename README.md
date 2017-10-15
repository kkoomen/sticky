# Sticky

Some sticky elements may contain content that doesn't fit within the viewport
height. This script alters the behavior of sticky elements by making them sticky
at the bottom, instead of the top, when needed. An element will be sticky once
the user reached the bottom of the element, but only when it expands the
viewport height. Otherwise it will use the default `position: sticky;` behavior.

Why? Well if the content is expanding the viewport and it is sticky then a user
never ever will see the bottom content within the element.

## Usage

Just create an element (how you would normally do it) with the properties:

- `position: sticky;`
- `top: 20px;`

Call `.sticky()` on your element:

```js
$('#myElement').sticky();
```

## Options

##### options.defaultPosition

- `Default: 'relative'`

- This should be the position if you wouldn't use `position: sticky;`. If the
  element was positioned `absolute` then you would specify `absolute`. Otherwise
  `relative`.

```js
$('#myElement').sticky({ defaultPosition: 'relative' });
```

##### options.breakpoints

- `Default: '[{ min: 0, max: 768}]'`

- Allow to specify breakpoints where the script should be disabled. On default
  we specify a mobile breakpoint which is in-between 0-768. If the window width
  falls in-between those ranges, we disable our script.

Example: disable the script on mobile (0-768) and in-between 1000-1400 pixels:

```js
$('#myElement').sticky({
  defaultPosition: 'relative',
  breakpoints: [
    {
      min: 0,
      max: 768,
    },
    {
      min: 1000,
      max: 1400,
    },
  ],
});
```

To allow the script always just pass in an empty array:

```js
$('#myElement').sticky({
  defaultPosition: 'relative',
  breakpoints: [],
});
```

# MIT License

Copyright 2017 Kim Koomen

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
