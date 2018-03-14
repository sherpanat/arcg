
const lyrics = document.querySelectorAll(".lyrics");
const emojis = document.querySelectorAll(".emojis");
const textConverter = document.querySelector("#text-converter");

toggleOpacity() {
  emojis.forEach(line => line.classList.toggle('hidden'));
  lyrics.forEach(line => line.classList.toggle('visible'));
  textConverter.classList.toggle('active');
})

textConverter.addEventListener('click', toggleOpacity());
