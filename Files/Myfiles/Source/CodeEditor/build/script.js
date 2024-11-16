function Hey(phrase) {
  phrase = phrase || "Hey";
  return console.log(phrase);
}

window.onload = function() {
  Hey("load success.");
}

const flask = new CodeFlask('.test', {
language: 'clike',
lineNumbers: true,
areaId: 'thing1',
ariaLabelledby: 'header1',
handleTabs: true
});

window['flask'] = flask;
