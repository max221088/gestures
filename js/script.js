const $areaWidth = window.innerWidth;
const $areaHeight = $(".area").outerHeight();
//const $boxWidth = $box.offsetWidth;
const $boxWidth = 200;
//const $boxHeight = $box.offsetHeight;
const $boxHeight = 200;

let activeBox = null;
let activeBoxIndex = null;
let action = false;
let save = false;
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
	save = true;
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
	$(".area").html(template);
	$(".header").keyup(function () {
		boxes[activeBoxIndex].head = $(this).val();
		//console.log(boxes[activeBoxIndex].head);
		localStorage.setItem("coords", JSON.stringify(boxes));
	});
	$(".content").keyup(function () {
		boxes[activeBoxIndex].cont = $(this).val();
		//console.log(boxes[activeBoxIndex].head);
		localStorage.setItem("coords", JSON.stringify(boxes));
	});
}

$(".area").mousedown(function (event) {
	//console.log(event);
	if (event.target.offsetParent.classList.contains("box")) {
		activeBox = event.target.offsetParent;
		//console.log(activeBox);
		activeBoxIndex = activeBox.getAttribute("data-index");
		//console.log(activeBoxIndex);
		action = true;
		startCoords.x = event.pageX;
		startCoords.y = event.pageY;
		saveCoords.y = boxes[activeBoxIndex].y;
		saveCoords.x = boxes[activeBoxIndex].x;
	}
});

$(".area").mouseup(function () {
	//console.log(2);
	action = false;
	if (save) {
		boxes[activeBoxIndex].x = distance.x;
		boxes[activeBoxIndex].y = distance.y;
		localStorage.setItem("coords", JSON.stringify(boxes));
		save = false;
	}
});

$(".area").mousemove(function (event) {
	if (action) {
		distance.y = saveCoords.y + event.pageY - startCoords.y;
		distance.x = saveCoords.x + event.pageX - startCoords.x;
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

$(".btn").click(function () {
	boxes.push({
		x: 0,
		y: 0,
		head: "",
		cont: "",
	});
	//console.log(boxes);
	boxGenerator(boxes);
});

$(".search-notes").keyup(function () {
	let query = $(".search-notes").val().toLowerCase();
	//console.log(query);
	filtNotes = boxes.filter(function (el) {
		if (el.head.toLowerCase().indexOf(query) != -1) {
			return true;
		} else {
			//return false;
			if (el.cont.toLowerCase().indexOf(query) != -1) {
				return true;
			} else {
				return false;
			}
		}
	});
	boxGenerator(filtNotes);
	//console.log(filtNotes);
});
