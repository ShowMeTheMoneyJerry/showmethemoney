console.log("Hey Esta! I'm working!");

let paragraphs = document.getElementsByTagName('p');
for (elt in paragraphs) {
	elt.style['background-color'] = '#FF00FF';
}
