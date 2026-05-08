export const terminal = async (item) => {
    console.log(item)
    const symbol = item.symbol || "_" 
    for (let i = 0; i < Array.from(item.text).length; i++) {
        if(item.box.textContent.endsWith(symbol)) item.box.textContent = item.box.textContent.slice(0, -1)
        item.box.textContent += item.text[i] + symbol
        await new Promise(resolve => setTimeout(resolve, item.delay))
    }
    item.box.textContent = item.box.textContent.slice(0, -1)
}