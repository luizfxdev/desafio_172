// Função principal para ordenar os fragmentos de código
function sortFragments(input) {
  // Passo 1: Converter a string de entrada em um array de fragmentos
  const fragments = input.split(',').map(fragment => fragment.trim())

  // Passo 2: Adicionar parênteses aos fragmentos que não os possuem
  const processedFragments = fragments.map(fragment => {
    if (!fragment.endsWith('()') && !fragment.endsWith(');')) {
      return fragment.endsWith(')') ? fragment : fragment + '()'
    }
    return fragment
  })

  // Passo 3: Ordenar os fragmentos baseado em uma lógica específica
  // Neste exemplo, usamos uma ordem pré-definida baseada em ações típicas
  const actionOrder = {
    iniciar: 1,
    autenticar: 2,
    conectar: 3,
    destruir: 4,
    carregar: 5
  }

  // Passo 4: Ordenar os fragmentos
  const sortedFragments = processedFragments.sort((a, b) => {
    const actionA = a.split('(')[0].toLowerCase()
    const actionB = b.split('(')[0].toLowerCase()

    const orderA = actionOrder[actionA] || Object.keys(actionOrder).length + 1
    const orderB = actionOrder[actionB] || Object.keys(actionOrder).length + 1

    return orderA - orderB
  })

  // Passo 5: Juntar os fragmentos ordenados em uma string
  return sortedFragments.join(' ')
}

// Função para exibir os passos do cálculo
function displayCalculationSteps(input, output) {
  const stepsContainer = document.getElementById('calculation-steps')
  stepsContainer.innerHTML = ''

  // Passo 1: Mostrar a entrada original
  const step1 = document.createElement('p')
  step1.textContent = `1. Entrada original: ${input}`
  stepsContainer.appendChild(step1)

  // Passo 2: Mostrar os fragmentos separados
  const fragments = input.split(',').map(f => f.trim())
  const step2 = document.createElement('p')
  step2.textContent = `2. Fragmentos identificados: [${fragments.join(', ')}]`
  stepsContainer.appendChild(step2)

  // Passo 3: Mostrar os fragmentos processados
  const processedFragments = fragments.map(fragment => {
    if (!fragment.endsWith('()') && !fragment.endsWith(');')) {
      return fragment.endsWith(')') ? fragment : fragment + '()'
    }
    return fragment
  })
  const step3 = document.createElement('p')
  step3.textContent = `3. Fragmentos formatados: [${processedFragments.join(', ')}]`
  stepsContainer.appendChild(step3)

  // Passo 4: Explicar a ordenação
  const step4 = document.createElement('p')
  step4.textContent = '4. Ordenação aplicada:'
  stepsContainer.appendChild(step4)

  const orderList = document.createElement('ul')
  orderList.style.marginLeft = '20px'
  orderList.style.marginTop = '5px'

  const actionOrder = {
    iniciar: 1,
    autenticar: 2,
    conectar: 3,
    destruir: 4,
    carregar: 5
  }

  for (const [action, order] of Object.entries(actionOrder)) {
    const item = document.createElement('li')
    item.textContent = `${order}. ${action}()`
    orderList.appendChild(item)
  }

  stepsContainer.appendChild(orderList)

  // Passo 5: Mostrar o resultado final
  const step5 = document.createElement('p')
  step5.textContent = `5. Resultado ordenado: ${output}`
  stepsContainer.appendChild(step5)
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  const sortBtn = document.getElementById('sort-btn')
  const resetBtn = document.getElementById('reset-btn')
  const inputField = document.getElementById('input-fragments')
  const outputField = document.getElementById('output-result')

  // Botão de ordenar
  sortBtn.addEventListener('click', () => {
    const input = inputField.value
    if (!input.trim()) {
      alert('Por favor, insira os fragmentos de código.')
      return
    }

    const sortedCode = sortFragments(input)
    outputField.textContent = sortedCode

    // Mostrar os passos do cálculo
    displayCalculationSteps(input, sortedCode)
  })

  // Botão de resetar
  resetBtn.addEventListener('click', () => {
    inputField.value = ''
    outputField.textContent = ''
    document.getElementById('calculation-steps').innerHTML = ''
  })
})
