const menu = document.querySelector("header nav")
const menuLinks = document.querySelectorAll("header nav a")

const burger = document.querySelector(".menu__burger")
const body = document.querySelector("body")
const menuList = document.querySelector("header nav ul")

const logoTitle = document.querySelector("header .container a h1")
const logoParagraph = document.querySelector("header .container a p")

let width = window.innerWidth

window.addEventListener("resize", onresize)
if (window.innerWidth < 768) {
	menu.style.pointerEvents = "none"
}
function onresize() {
	width = window.innerWidth
	menu.style.pointerEvents = "all"
	menu.style.background = "rgba(41, 41, 41, 0.6)"
	body.classList.remove("scroll-prevent")

	if (window.innerWidth < 768) {
		menu.style.pointerEvents = "none"
		menu.style.background = ""
	}
}

menuList.addEventListener("click", e => {
	e.stopPropagation()
	const link = e.target.closest("a")
	if (e.target === link) {
		menuLinks.forEach(item => item.classList.remove("active"))
		link.classList.toggle("active")

		toggleBurger()
		logoUnset()
	}
})

menu.addEventListener("click", e => {
	if (e.target === menu) {
		toggleBurger()
		return
	}
})

burger.addEventListener("click", toggleBurger)

window.addEventListener("resize", onResize)

function toggleBurger() {
	if (width < 768) {
		menu.style.pointerEvents =
			menu.style.pointerEvents === "none" ? "all" : "none"
		menu.style.background =
			menu.style.background === "" ? "rgba(41, 41, 41, 0.6)" : ""
	}
	burger.classList.toggle("menu__burger_active")
	burger.classList.toggle("menu__burger_light")
	body.classList.toggle("scroll-prevent")
	menuList.classList.toggle("nav_active")
	changeLogoColor()
}

function onResize() {
	burger.classList.remove("menu__burger_active")
	burger.classList.remove("menu__burger_light")
	body.classList.remove("scroll-prevent")
	menuList.classList.remove("nav_active")
	logoUnset()
}

function changeLogoColor() {
	logoTitle.classList.toggle("logo__title_light")
	logoParagraph.classList.toggle("logo__paragraph_light")
}

function logoUnset() {
	logoTitle.classList.remove("logo__title_light")
	logoParagraph.classList.remove("logo__paragraph_light")
}
