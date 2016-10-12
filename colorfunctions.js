
var HEIGHT = 300;
var WIDTH = 300;

var SCL = 0.5;

var redFunctionInput;
var greenFunctionInput;
var blueFunctionInput;

function setup() {
	var scaleLabel = createSpan().elt;
	scaleLabel.innerHTML = "Scale: ";
	var scaleSlider = createSlider(0, 1, SCL, 0.005).elt;
	scaleSlider.readout = createElement("SPAN", SCL).elt;
	scaleSlider.onchange = scaleSliderChange_cb;
	createElement("BR");

	redFunctionInput = createElement("textarea").elt;
	redFunctionInput.cols = 20;
	redFunctionInput.rows = 10;

	blueFunctionInput = createElement("textarea").elt;
	blueFunctionInput.cols = 20;
	blueFunctionInput.rows = 10;

	greenFunctionInput = createElement("textarea").elt;
	greenFunctionInput.cols = 20;
	greenFunctionInput.rows = 10;
	createElement("BR");

	var drawButton = createButton("Draw").elt;
	drawButton.onclick = drawButtonClick_cb;
	createElement("BR");

	createCanvas(WIDTH, HEIGHT);
	drawIt();
}

function drawButtonClick_cb() {
	drawIt();
}

function scaleSliderChange_cb() {
	this.readout.innerHTML = this.value;
	SCL = this.value;
	//drawIt();
}

function myRed(x, y) {
	return mySin(y);
}

function myGreen(x, y) {
	return mySin((x * y));		
}

function myBlue(x, y) {
	return mySin(x);
}

function mySin(n) {
	return (sin(n) + 1) / 2;
}

function draw() {

}

function drawIt() {
	for (var x = 0; x < WIDTH; x++) {
		for (var y = 0; y < HEIGHT; y++) {
			var r = myRed(x * SCL, y * SCL) * 255;
			var g = myGreen(x * SCL, y * SCL) * 255;
			var b = myBlue(x * SCL, y * SCL) * 255;
			stroke(r, g, b);
			point(x, y);
		}
	}
}
