const pets = []
const prev = document.querySelector(".slider__cards_prev")
const main = document.querySelector(".slider__cards_main")
const next = document.querySelector(".slider__cards_next")

function getData() {
	fetch("/data.json")
		.then(res => res.json())
		.then(data => pets.push(...data))
		.then(() => addPopUps())
		.then(() => createSlider())
}
getData()

function addPopUps() {
	for (let pet of pets) {
		const popUp = new PopUp(pet).createElement()
		popUp.dataset.name = pet.name
		document.body.prepend(popUp)
	}
}

function createSlider() {
	pets.forEach((pet, idx) => {
		if (idx < 3) {
			prev.append(new Pet(pet).createElement())
		} else if (idx < 7 && idx > 3) {
			main.append(new Pet(pet).createElement())
		} else {
			next.append(new Pet(pet).createElement())
		}
	})
}

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

const slider = document.querySelector(".slider__container")
slider.addEventListener("click", e => openPopUp(e))

function openPopUp(e) {
	const name = e.target.closest(".slider__card").querySelector("h4").innerText
	const popUp = document.querySelector(`section[data-name="${name}"]`)
	body.classList.add("scroll-prevent")
	popUp.classList.add("open")
}
