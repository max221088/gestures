const $area = document.querySelector(".area");
const $bottom = document.querySelector(".btn");

const $areaWidth = window.innerWidth;
//console.log(Width);
const $areaHeight = $area.offsetHeight;
//console.log(Height);
// const $boxWidth = $box.offsetWidth;
const $boxWidth = 100;
//console.log($boxWidth);
//const $boxHeight = $box.offsetHeight;
const $boxHeight = 100;
//console.log($boxWidth);

let activeBox = null;
let activeBoxIndex = null;
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

let boxes = [];

if (localStorage.getItem("coords")) {
	boxes = JSON.parse(localStorage.getItem("coords"));
	boxGenerator(boxes);
}

function move(coords) {
	activeBox.style.top = coords.y + "px";
	activeBox.style.left = coords.x + "px";
	//console.log(activeBox);
}

function boxGenerator(list) {
	let template = "";
	for (let i = 0; i < list.length; i++) {
		template +=
			'<div class="box" style="left: ' +
			list[i].x +
			"px; top: " +
			list[i].y +
			'px;" data-index="' +
			i +
			'">' +
			(i + 1) +
			"</div>";
	}
	$area.innerHTML = template;
}

$area.addEventListener("mousedown", function (e) {
	//console.log(e);
	if (e.target.classList.value == "box") {
		activeBox = e.target;
		activeBoxIndex = e.target.getAttribute("data-index");
		//console.log(activeBox);
		action = true;
		startCoords.x = e.pageX;
		startCoords.y = e.pageY;
		saveCoords.y = boxes[activeBoxIndex].y;
		saveCoords.x = boxes[activeBoxIndex].x;

		//console.log(e.target.getBoundingClientRect().top);
	}

	//console.log(33);
});

$area.addEventListener("mouseup", function (e) {
	//console.log(2);

	action = false;
	boxes[activeBoxIndex].x = distance.x;
	boxes[activeBoxIndex].y = distance.y;
	localStorage.setItem("coords", JSON.stringify(boxes));
});

$area.addEventListener("mousemove", function (e) {
	//console.log(3);
	if (action) {
		distance.y = saveCoords.y + e.pageY - startCoords.y;
		distance.x = saveCoords.x + e.pageX - startCoords.x;
		if (distance.x > $areaWidth - $boxWidth) {
			distance.x = $areaWidth - $boxWidth;
			move(distance);
		} else {
			move(distance);
		}
		if (distance.y > $areaHeight - $boxHeight) {
			distance.y = $areaHeight - $boxHeight;
			move(distance);
			//console.log(distance);
		} else {
			move(distance);
			//console.log(distance);
		}
		if (distance.y < 0) {
			distance.y = 0;
			move(distance);
		} else {
			move(distance);
		}
		if (distance.x < 0) {
			distance.x = 0;
			move(distance);
		} else {
			move(distance);
		}
	}
});
$bottom.addEventListener("click", function () {
	boxes.push({
		x: 0,
		y: 0,
	});
	//console.log(boxes);
	boxGenerator(boxes);
});
