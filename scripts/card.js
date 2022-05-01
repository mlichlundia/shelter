const cards = document.querySelectorAll(".slider__card")
console.log(cards)

cards.forEach(item => {
	item.addEventListener("mouseover", () => {
		item.classList.add("hovered-card")
		item.querySelector("button").classList.add("hovered-button")
	})

	item.addEventListener("mouseout", () => {
		item.classList.remove("hovered-card")
		item.querySelector("button").classList.remove("hovered-button")
	})
})
