const $area = document.querySelector(".area");
const $bottom = document.querySelector(".btn");
const $textarea = document.querySelector(".content");
const $header = document.querySelector(".header");

const $areaWidth = window.innerWidth;
//console.log(Width);
const $areaHeight = $area.offsetHeight;
//console.log(Height);
//const $boxWidth = $box.offsetWidth;
const $boxWidth = 200;
//console.log($boxWidth);
//const $boxHeight = $box.offsetHeight;
const $boxHeight = 200;
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
			// (i + 1) +
			'<input type="text" placeholder="Заголовок" class="header" value="' +
			list[i].head +
			'"/>' +
			'<textarea class="content" placeholder="Текст заметки">' +
			list[i].cont +
			"</textarea>" +
			"</div>";
	}
	$area.innerHTML = template;
	document.querySelectorAll(".header").forEach(function (el) {
		el.addEventListener("input", function () {
			boxes[activeBoxIndex].head = this.value;
			console.log(boxes);
			localStorage.setItem("coords", JSON.stringify(boxes));
		});
	});
	document.querySelectorAll(".content").forEach(function (el) {
		el.addEventListener("input", function () {
			boxes[activeBoxIndex].cont = this.value;
			console.log(boxes);
			localStorage.setItem("coords", JSON.stringify(boxes));
		});
	});
}

$area.addEventListener("mousedown", function (e) {
	//console.log(e.path[1].classList.contains("box"));
	if (e.path[1].classList.contains("box")) {
		activeBox = e.path[1];
		activeBoxIndex = e.path[1].getAttribute("data-index");
		console.log(activeBoxIndex);
		action = true;
		startCoords.x = e.pageX;
		startCoords.y = e.pageY;
		//saveCoords.y = boxes[activeBoxIndex].y;
		//saveCoords.x = boxes[activeBoxIndex].x;
		saveCoords.y = activeBox.getBoundingClientRect().top;
		saveCoords.x = activeBox.getBoundingClientRect().left;
		console.log(saveCoords);
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
		head: "",
		cont: "",
	});
	//console.log(boxes);
	boxGenerator(boxes);
});
