// Esquemas de cores para o background
const colorSchemes = {
  blue: ['#001F3F', '#003366', '#004C99', '#0066CC', '#0080FF', '#3399FF'],
  green: ['#004D1A', '#006622', '#008033', '#009933', '#00B33C', '#00CC44'],
  purple: ['#2A0033', '#3F004D', '#530066', '#660080', '#7A0099', '#8F00B3'],
  red: ['#330000', '#660000', '#990000', '#CC0000', '#FF0000', '#FF3333'],
  teal: ['#003333', '#004D4D', '#006666', '#008080', '#009999', '#00B3B3'],
  orange: ['#331100', '#662200', '#993300', '#CC4400', '#FF5500', '#FF7733'],
  pink: ['#330033', '#4D004D', '#660066', '#800080', '#990099', '#B300B3'],
  yellow: ['#332600', '#664D00', '#997300', '#CC9900', '#FFBF00', '#FFD633']
}

// Colunas disponíveis
const columns = Object.keys(colorSchemes)

// Criar colunas no wrapper
function createColumns() {
  const wrapper = document.getElementById('wrapper')
  wrapper.innerHTML = ''

  columns.forEach((columnColor, index) => {
    const column = document.createElement('div')
    column.className = 'column'
    column.dataset.colorScheme = columnColor

    // Criar caixas para cada coluna
    const boxCount = Math.ceil(window.innerHeight / 16) // 1rem = 16px
    for (let i = 0; i < boxCount; i++) {
      const box = document.createElement('div')
      box.className = 'box'
      column.appendChild(box)
    }

    wrapper.appendChild(column)
  })
}

// Animar coluna
function animateColumn(column, direction = 1) {
  const boxes = Array.from(column.querySelectorAll('.box'))
  const colorScheme = colorSchemes[column.dataset.colorScheme]

  // Obter cores atuais
  const currentColors = boxes.map(box => {
    const color = box.style.backgroundColor
    return colorScheme.indexOf(rgbToHex(color)) !== -1 ? rgbToHex(color) : colorScheme[0]
  })

  // Mover cores
  if (direction > 0) {
    const lastColor = currentColors.pop()
    currentColors.unshift(lastColor)
  } else {
    const firstColor = currentColors.shift()
    currentColors.push(firstColor)
  }

  // Aplicar novas cores
  boxes.forEach((box, i) => {
    box.style.backgroundColor = currentColors[i] || colorScheme[0]
  })
}

// Inicializar colunas com cores
function initializeColumns() {
  const columns = document.querySelectorAll('.column')
  columns.forEach(column => {
    const boxes = column.querySelectorAll('.box')
    const colorScheme = colorSchemes[column.dataset.colorScheme]

    boxes.forEach((box, index) => {
      const colorIndex = index % colorScheme.length
      box.style.backgroundColor = colorScheme[colorIndex]
    })
  })
}

// Converter RGB para Hex
function rgbToHex(rgb) {
  if (!rgb) return '#000000'
  if (rgb.startsWith('#')) return rgb

  const rgbMatch = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
  if (!rgbMatch) return '#000000'

  const r = parseInt(rgbMatch[1])
  const g = parseInt(rgbMatch[2])
  const b = parseInt(rgbMatch[3])

  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
}

// Configuração inicial
createColumns()
initializeColumns()

// Animar cada coluna independentemente
document.querySelectorAll('.column').forEach((column, index) => {
  setInterval(() => {
    // Alternar direção baseado no índice da coluna
    const direction = index % 2 === 0 ? 1 : -1
    animateColumn(column, direction)
  }, 200)
})

// Recriar grid quando a janela for redimensionada
window.addEventListener('resize', () => {
  createColumns()
  initializeColumns()
})
