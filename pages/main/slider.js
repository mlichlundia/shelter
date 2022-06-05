const sliderContainer = document.querySelector(".slider__container")
const sliderWrapper = document.querySelector(".slider__cards")

const mainCards = document.querySelector(".slider__cards_main")
const prevCards = document.querySelector(".slider__cards_prev")
const nextCards = document.querySelector(".slider__cards_next")

const sliderCards = []

const prevSwipe = document.querySelector(".slider__arrow_prev")
const nextSwipe = document.querySelector(".slider__arrow_next")

fetch("/data.json")
	.then(res => res.json())
	.then(data => sliderCards.push(...data))

nextSwipe.addEventListener("click", showNext)
prevSwipe.addEventListener("click", showPrev)

//
//
//
//
function showNext() {
	sliderWrapper.classList.add("transition-next")
	nextSwipe.removeEventListener("click", showNext)
	prevSwipe.removeEventListener("click", showPrev)
}

function showPrev() {
	sliderWrapper.classList.add("transition-prev")
	nextSwipe.removeEventListener("click", showNext)
	prevSwipe.removeEventListener("click", showPrev)
}

sliderWrapper.addEventListener("animationend", e => animationHandler(e))

function animationHandler(e) {
	let current

	if (e.animationName === "move-right") {
		sliderWrapper.classList.remove("transition-next")
		current = nextCards
		mainCards.innerHTML = current.innerHTML
	} else {
		sliderWrapper.classList.remove("transition-prev")
		current = prevCards
		mainCards.innerHTML = current.innerHTML
	}

	current.innerHTML = ""

	generatedCards().forEach(item => {
		const card = new Pet(item).createElement()
		current.append(card)
	})

	nextSwipe.addEventListener("click", showNext)
	prevSwipe.addEventListener("click", showPrev)
}
//
//
//
//
function generatedCards() {
	const cards = []
	const nums = new Set()

	while (nums.size < 3) {
		nums.add(getRandom(0, sliderCards.length - 1))
	}

	nums.forEach(item => cards.push(sliderCards[item]))

	return cards
}

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min)) + min
}
