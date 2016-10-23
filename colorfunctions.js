
var HEIGHT = 300;
var WIDTH = 300;

var SCL = 0.25;

var redFunctionInput;
var greenFunctionInput;
var blueFunctionInput;

var redFunction;
var blueFunction;
var greenFunction;

var inputWidth = 30;
var inputHeight = 3;

function setup() {
	var scaleLabel = createSpan().elt;
	scaleLabel.innerHTML = "Scale: ";
	var scaleSlider = createSlider(0, 1, SCL, 0.005).elt;
	scaleSlider.readout = createElement("SPAN", SCL).elt;
	scaleSlider.onchange = scaleSliderChange_cb;
	createElement("BR");
	createElement("BR");

	createP("Define functions to return the RGB componenets of each pixel's color. x and y parameters represent the x and y coordinates of the pixel to color. Remember that (0, 0) is the top left! <br /> Return a value between 0 and 1");

	createP("What is mySin?<br /> mySin(a) = (sin(a) + 1) / 2 <br /> mySin has the same shape as sin, but its range is 0 to 1 instead of -1 to 1");

	createSpan("function red(x, y) {");
	createElement("BR");
	redFunctionInput = createElement("textarea").elt;
	redFunctionInput.style.paddingLeft = "2em";
	redFunctionInput.cols = inputWidth;
	redFunctionInput.rows = inputHeight;
	redFunctionInput.onchange = redFunctionInputChange_cb;
	redFunctionInput.value = "return mySin(y);";
	createElement("BR");
	createSpan("}");
	createElement("BR");
	createElement("BR");
	
	createSpan("function blue(x, y) {");
	createElement("BR");
	blueFunctionInput = createElement("textarea").elt;
	blueFunctionInput.style.paddingLeft = "2em";
	blueFunctionInput.cols = inputWidth;
	blueFunctionInput.rows = inputHeight;
	blueFunctionInput.onchange = blueFunctionInputChange_cb;
	blueFunctionInput.value = "return mySin(x);";
	createElement("BR");
	createSpan("}");
	createElement("BR");
	createElement("BR");

	createSpan("function green(x, y) {");
	createElement("BR");
	greenFunctionInput = createElement("textarea").elt;
	greenFunctionInput.style.paddingLeft = "2em";
	greenFunctionInput.cols = inputWidth;
	greenFunctionInput.rows = inputHeight;
	greenFunctionInput.onchange = greenFunctionInputChange_cb;
	greenFunctionInput.value = "return mySin(x * y);";	
	createElement("BR");
	createSpan("}");
	createElement("BR");
	createElement("BR");

	var drawButton = createButton("Draw").elt;
	drawButton.onclick = drawButtonClick_cb;
	createElement("BR");

	greenFunctionInputChange_cb();
	redFunctionInputChange_cb();
	blueFunctionInputChange_cb();

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

function redFunctionInputChange_cb() {
	var code = redFunctionInput.value;
	redFunction = new Function("x", "y", code);
}

function greenFunctionInputChange_cb() {
	var code = greenFunctionInput.value;
	greenFunction = new Function("x", "y", code);
}

function blueFunctionInputChange_cb() {
	var code = blueFunctionInput.value;
	blueFunction = new Function("x", "y", code);
}

function myRed(x, y) {
	if(redFunction)
		return redFunction(x, y);

	return mySin(y);	
}

function myGreen(x, y) {
	if (greenFunction)
		return greenFunction(x, y);

	return mySin((x * y));		
}

function myBlue(x, y) {
	if (blueFunction)
		return blueFunction(x, y);

	return mySin(x);
}

function mySin(n) {
	return (sin(n) + 1) / 2;
}

function draw() {

}

function drawIt() {
	var maxR = myRed(0, 0);
	var maxG = myGreen(0, 0);
	var maxB = myBlue(0, 0);
	var minR = maxR;
	var minG = maxG;
	var minB = maxB;

	// TODO: handle when minR == maxR, etc.

	for (var x = 0; x < WIDTH; x++) {
		for (var y = 0; y < HEIGHT; y++) {
			var r = myRed(x * SCL, y * SCL);
			var g = myGreen(x * SCL, y * SCL);
			var b = myBlue(x * SCL, y * SCL);
			minG = min(minG, g);
			maxG = max(maxG, g);
			minB = min(minB, b);
			maxB = max(maxB, b);
			minR = min(minR, r);
			maxR = max(maxR, r);
		}
	}
	for (var x = 0; x < WIDTH; x++) {
		for (var y = 0; y < HEIGHT; y++) {
			var r =255 * (myRed(x * SCL, y * SCL) - minR) / (maxR - minR);
			var g =	255 * (myGreen(x * SCL, y * SCL) - minG) / (maxG - minG);
			var b =	255 * (myBlue(x * SCL, y * SCL) - minB) / (maxB - minB);
			stroke(r, g, b);
			point(x, y);
		}
	}
}
