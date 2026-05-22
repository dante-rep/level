export const terminal = async (item) => {
    const symbol = item.symbol || "_" 
    const symbolLength = Array.from(symbol).length
    for (let i = 0; i < Array.from(item.text).length; i++) {
        if(i > 0) item.box.textContent = item.box.textContent.slice(0, -symbolLength)
        item.box.textContent += item.text[i] + symbol
        await new Promise(resolve => setTimeout(resolve, item.delay))
    }
    item.box.textContent = item.box.textContent.slice(0, -symbolLength)
}