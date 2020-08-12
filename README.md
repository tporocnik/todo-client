# Todo app client

Run local webserver because of cross-origin problems e.g. the one coming with python
    python -m http.server 8080

* lithtml
* layout (flex?)
* shadow dom
* browsersync?
* testing?
## Templating

What is a template? A reusable HTML String with placehodlers for dynamic inserts.
Can be done with ECMA backticks. Sometimes a little bit tricky when it comes to bind handler functions. You have to escape yourself to avoid malicious injections.
Lit-html is a template library original included in Polymer and under the hood uses ECMA Template String functionality. ITs very fast and has a couple of nice features.

## CSS

Wing CSS https://kbrsh.github.io/wing/