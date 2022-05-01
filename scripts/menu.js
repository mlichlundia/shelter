const menu = document.querySelector("header nav")
const menuLinks = document.querySelectorAll("header nav a")

menu.addEventListener("click", e => {
	const link = e.target.closest("a")
	menuLinks.forEach(item => item.classList.remove("active"))
	link.classList.toggle("active")
	console.log(e.target.closest("a"))
})
