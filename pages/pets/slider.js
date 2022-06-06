let width = window.innerWidth
let pageCount
let count = 0

window.addEventListener("resize", onresize)

let pets = []
const dataPets = []

const slider = document.querySelector(".slider__cards")

const toFirst = document.querySelector(".slider__arrow_prev-double")
const toLast = document.querySelector(".slider__arrow_next-double")
const prev = document.querySelector(".slider__arrow_prev")
const next = document.querySelector(".slider__arrow_next")
const pageNum = document.querySelector(".slider__page-num span")

function getData() {
	fetch("https://mlichlundia.github.io/shelter/data.json")
		.then(res => res.json())
		.then(data => {
			dataPets.push(...data)
			dataPets.pop()
		})
		.then(() => addPopUps())
		.then(() => createSlider())
		.then(() => (pageCount = checkPageCount()))
}
getData()

function createSlider() {
	pets = [
		...shuffle(dataPets),
		...shuffle(dataPets),
		...shuffle(dataPets),
		...shuffle(dataPets),
		...shuffle(dataPets),
		...shuffle(dataPets),
	]
	for (let pet of pets) {
		slider.append(new Pet(pet).createElement())
	}
}

export function addPopUps() {
	for (let pet of dataPets) {
		const popUp = new PopUp(pet).createElement()
		popUp.dataset.name = pet.name
		document.body.prepend(popUp)
	}
}

next.addEventListener("click", showNext)
prev.addEventListener("click", showPrev)
toLast.addEventListener("click", showLast)
toFirst.addEventListener("click", showFirst)

function showFirst() {
	count = 0
	pageNum.innerHTML = 1
	swipe()
}

function showLast() {
	count = pageCount - 1
	pageNum.innerHTML = pageCount
	swipe()
}

//
//
//
//
//
//
//
//
//

function swipe() {
	if (width > 1280) {
		slider.style.transform = `translate( 0, ${-count * 465 * 2}px)`
	} else if (width > 480 && width < 768) {
		slider.style.transform = `translate( 0, ${-count * 624.9 * 2}px)`
	} else {
		slider.style.transform = `translate( 0, ${-count * 465 * 3}px)`
	}

	isNextDisabled()
	isPrevDisabled()
}

function isNextDisabled() {
	next.disabled = count === pageCount - 1 ? true : false
	toLast.disabled = count === pageCount - 1 ? true : false
}

function isPrevDisabled() {
	toFirst.disabled = count === 0 ? true : false
	prev.disabled = count === 0 ? true : false
}

function showNext() {
	count++
	pageNum.innerHTML = +pageNum.innerHTML + 1
	swipe()
}

function showPrev() {
	count--
	pageNum.innerHTML -= 1
	swipe()
}

//
//
//
//
//
//
//
//
//
//

class Pet {
	constructor(pet) {
		this.name = pet.name
		this.img = pet.img
		this.type = pet.type
		this.breed = pet.breed
		this.descr = pet.description
		this.age = pet.age
		this.inoculations = pet.inoculations
		this.deseases = pet.deseases
		this.parasites = pet.parasites
		this.popUp = new PopUp(pet).createElement()
	}

	createElement() {
		const card = document.createElement("li")
		const image = document.createElement("img")
		const title = document.createElement("h4")
		const button = document.createElement("button")

		card.classList.add("slider__card")
		button.classList.add("slider__card-button")

		image.setAttribute("width", 270)
		image.setAttribute("height", 270)
		image.setAttribute("src", this.img)
		image.setAttribute("alt", "pet-friend")

		title.innerText = this.name
		button.innerText = "Learn more"

		card.append(image)
		card.append(title)
		card.append(button)
		card.append(this.popUp)

		return card
	}
}

class PopUp {
	constructor(pet) {
		this.name = pet.name
		this.img = pet.img
		this.type = pet.type
		this.breed = pet.breed
		this.descr = pet.description
		this.age = pet.age
		this.inoculations = pet.inoculations
		this.diseases = pet.diseases
		this.parasites = pet.parasites
	}

	createElement() {
		const popUp = document.createElement("section")
		const popUpContent = document.createElement("div")
		const close = document.createElement("button")
		const image = document.createElement("img")
		const info = document.createElement("div")
		const title = document.createElement("h3")
		const sub = document.createElement("h4")
		const text = document.createElement("h5")
		const list = document.createElement("ul")
		const pointOne = document.createElement("li")
		const pointTwo = document.createElement("li")
		const pointThree = document.createElement("li")
		const pointFour = document.createElement("li")

		popUp.classList.add("pop-up")
		popUpContent.classList.add("pop-up__content")
		close.classList.add("pop-up__close")
		info.classList.add("pop-up__info")

		image.setAttribute("src", this.img)

		close.innerText = "×"
		title.innerText = this.name
		sub.innerText = this.type + "-" + this.breed
		text.innerText = this.descr

		pointOne.innerHTML = `<b>Age:</b>${this.age}`
		pointTwo.innerHTML = `<b>Inoculations:</b>${this.inoculations.join(",")}`
		pointThree.innerHTML = `<b>Diseases:</b>${this.diseases.join(",")}`
		pointFour.innerHTML = `<b>Parasites:</b>${this.parasites.join(",")}`

		list.append(pointOne)
		list.append(pointTwo)
		list.append(pointThree)
		list.append(pointFour)

		info.append(title)
		info.append(sub)
		info.append(text)
		info.append(list)

		popUpContent.append(close)
		popUpContent.append(image)
		popUpContent.append(info)

		popUp.append(popUpContent)
		popUp.addEventListener("click", this.closePopUp.bind(popUp))
		close.addEventListener("click", this.closePopUp.bind(popUp))

		popUpContent.addEventListener("click", e => e.stopPropagation())
		popUp.addEventListener("click", e => e.stopPropagation())

		return popUp
	}

	closePopUp() {
		const body = document.querySelector("body")
		body.classList.remove("scroll-prevent")
		this.classList.remove("open")
	}
}

//
//
//
//
//

function shuffle(array) {
	let shuffledArray = []
	let usedIndexes = []

	let i = 0
	while (i < array.length) {
		let randomNumber = Math.floor(Math.random() * array.length)
		if (!usedIndexes.includes(randomNumber)) {
			shuffledArray.push(array[randomNumber])
			usedIndexes.push(randomNumber)
			i++
		}
	}
	return shuffledArray
}

slider.addEventListener("click", e => openPopUp(e))

function openPopUp(e) {
	const targetEl = e.target.closest(".slider__card")
	if (!targetEl) {
		return
	}
	const name = targetEl.querySelector("h4").innerText
	const popUp = document.querySelector(`section[data-name="${name}"]`)
	body.classList.add("scroll-prevent")
	popUp.classList.add("open")
}

function checkPageCount() {
	if (width > 1279) {
		return Math.ceil(pets.length / 8)
	} else if (width > 767 && width < 1280) {
		return Math.ceil(pets.length / 6)
	} else {
		return Math.ceil(pets.length / 3)
	}
}

function onresize() {
	width = window.innerWidth
	pageCount = checkPageCount()
	if (count > pageCount - 1) {
		count = pageCount - 1
		pageNum.innerHTML = pageCount
	}
	swipe()
	isNextDisabled()
	isPrevDisabled()
}
