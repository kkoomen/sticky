# Sticky | The way it should be

Some sticky elements may contain content that doesn't fit within the viewport
height. This script implements a sticky sidebar the way it should by setting
a maximum height, overflow and scrolls the element along with the content.

Why? Well if the content is expanding the viewport and it is sticky then a user
never ever will see the bottom content within the element unless the user
reaches the end of the page.

## Usage

Just create an element (how you would normally do it) with the properties:

- `position: sticky;`
- `top: 20px;`

Call `.sticky()` on your element:

```js
$('#myElement').sticky();
```

## Options

##### options.overflow

- `Default: 'hidden'`

- On default it uses `overflow: hidden;` to remove the scrollbar, but if you
  want to be able to scroll, just pass `auto`:

```js
$('#myElement').sticky({ overflow: 'auto' });
```

##### options.offsetBottom

- `Default: null`

- On default the bottom offset will be equal to the top specified via css. You
  can overwrite this value when needed.

```js
$('#myElement').sticky({
  defaultPosition: 'hidden',
  offsetBottom: 80
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
