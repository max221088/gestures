$.fn.notes = function (options) {
	// Vars
	const params = $.extend(
		{
			saveToLs: false,
			search: false,
			headColor: "rgb(153, 231, 122)",
			contentColor: "rgb(229, 231, 122)",
			noteWidth: 200,
			noteHeight: 200,
		},
		options
	);
	console.log(params);
	const $area = $(".area");
	const $notes = $(".notes");
	const $areaWidth = window.visualViewport.width;
	const $areaHeight = $(".area").outerHeight();

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

	// Controllers
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
		$area.html(template);
		$(".box").css("width", params.noteWidth + "px");
		$(".box").css("height", params.noteHeight + "px");
		$(".header").css("background-color", params.headColor);
		$(".content").css("background-color", params.contentColor);
		$(".header").keyup(function () {
			boxes[activeBoxIndex].head = $(this).val();
			if (params.saveToLs) {
				localStorage.setItem("coords", JSON.stringify(boxes));
			}
		});
		$(".content").keyup(function () {
			boxes[activeBoxIndex].cont = $(this).val();

			if (params.saveToLs) {
				localStorage.setItem("coords", JSON.stringify(boxes));
			}
		});
	}

	// Init actions
	if (localStorage.getItem("coords")) {
		boxes = JSON.parse(localStorage.getItem("coords"));
		boxGenerator(boxes);
	}

	if (params.search) {
		let templateSearch =
			"<div class=search> <input type=text class=search-notes " +
			"placeholder=Поиск по заметкам/></div>";
		$notes.append(templateSearch);
	}
	$(".btn").click(function () {
		boxes.push({
			x: 0,
			y: 0,
			head: "",
			cont: "",
		});
		boxGenerator(boxes);
	});

	if (params.search) {
		$(".search-notes").keyup(function () {
			let query = $(".search-notes").val().toLowerCase();
			filtNotes = boxes.filter(function (el) {
				if (el.head.toLowerCase().indexOf(query) != -1) {
					return true;
				} else {
					if (el.cont.toLowerCase().indexOf(query) != -1) {
						return true;
					} else {
						return false;
					}
				}
			});
			boxGenerator(filtNotes);
		});
	}

	// Actions
	$area.mousedown(function (event) {
		if (event.target.offsetParent.classList.contains("box")) {
			activeBox = event.target.offsetParent;
			activeBoxIndex = activeBox.getAttribute("data-index");
			action = true;
			startCoords.x = event.pageX;
			startCoords.y = event.pageY;
			saveCoords.y = boxes[activeBoxIndex].y;
			saveCoords.x = boxes[activeBoxIndex].x;
		}
	});

	$area.mouseup(function () {
		action = false;
		if (save) {
			boxes[activeBoxIndex].x = distance.x;
			boxes[activeBoxIndex].y = distance.y;
			if (params.saveToLs) {
				localStorage.setItem("coords", JSON.stringify(boxes));
			}
			save = false;
		}
	});

	$area.mousemove(function (event) {
		if (action) {
			distance.y = saveCoords.y + event.pageY - startCoords.y;
			distance.x = saveCoords.x + event.pageX - startCoords.x;
			if (distance.x > $areaWidth - params.noteWidth) {
				distance.x = $areaWidth - params.noteWidth;
				move(distance);
			} else {
				move(distance);
			}
			if (distance.y > $areaHeight - params.noteHeight) {
				distance.y = $areaHeight - params.noteHeight;
				move(distance);
			} else {
				move(distance);
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
};
