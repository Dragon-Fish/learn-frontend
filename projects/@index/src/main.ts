import './styles/index.sass'

;(document.getElementById('full-year') as HTMLSpanElement).innerText =
  new Date().getFullYear().toString()
