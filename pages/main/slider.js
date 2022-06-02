const sliderContainer = document.querySelector(".slider__container")
const sliderCardsContainer = document.querySelector(".slider__cards")
const sliderCards = []

fetch("/data.json")
	.then(res => res.json())
	.then(data => sliderCards.push(...data))

const prev = document.querySelector(".slider__arrow_prev")
const next = document.querySelector(".slider__arrow_next")

let sliderWidth = sliderContainer.offsetWidth
let count = 0

next.addEventListener("click", showNext)
prev.addEventListener("click", showPrev)

window.addEventListener("resize", onresize)

function onresize() {
	sliderWidth = sliderContainer.offsetWidth
	swipe(count)
	isNextDisabled(count)
	isPrevDisabled(count)
}

function swipe(count) {
	sliderCardsContainer.style.transform = `translate(${-count * sliderWidth}px)`

	isNextDisabled(count)
	isPrevDisabled(count)
}

function isNextDisabled(count) {
	if (window.outerWidth > 1280) {
		next.disabled =
			count <= (sliderCards.length - 1) / 3 &&
			count > (sliderCards.length - 1) / 3 - 1
				? true
				: false
	} else if (window.outerWidth > 768) {
		next.disabled =
			count <= (sliderCards.length - 1) / 2 &&
			count > (sliderCards.length - 1) / 2 - 1
				? true
				: false
	} else {
		next.disabled = count === sliderCards.length - 1 ? true : false
	}
}

function isPrevDisabled(count) {
	prev.disabled = count === 0 ? true : false
}

function showNext() {
	count++
	swipe(count)
}

function showPrev() {
	count--
	swipe(count)
}
