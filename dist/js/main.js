/*! amex-gbt-portal v0.0.1 | (c) 2020 Lewis | MIT License | https://bitbucket.org/mishaosinovskiy/amex-gbt-portal/src/master/ */
document.addEventListener('click', (function (event) {
	if (!event.target.matches('#click-me')) return;
	alert('You clicked me!');
}), false);