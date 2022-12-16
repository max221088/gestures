const $area = document.querySelector(".area");
const $box = document.querySelector(".box");
let action = false;
let startCoords = {
	x: 0,
	y: 0,
};
let saveCoords = {
	x: 0,
	y: 0,
};

let distance = {
	x: 0,
	y: 0,
};

function move(coords) {
	$box.style.top = coords.y + "px";
	$box.style.left = coords.x + "px";
}

$box.addEventListener("mousedown", function (e) {
	//console.log(e);
	action = true;
	startCoords.x = e.pageX;
	startCoords.y = e.pageY;
	console.log(33);
});

$area.addEventListener("mouseup", function (e) {
	//console.log(2);
	action = false;
	saveCoords.y = distance.y;
	saveCoords.x = distance.x;
});

$area.addEventListener("mousemove", function (e) {
	//console.log(3);
	if (action) {
		distance.y = saveCoords.y + e.pageY - startCoords.y;
		distance.x = saveCoords.x + e.pageX - startCoords.x;
		move(distance);
	}
});
