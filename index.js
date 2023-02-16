const defaultColorHex = "#F55A5A"
const defaultColorMode = "monochrome"
const colorPicker = document.getElementById("color-picker")
const colorModeSelect = document.getElementById("color-mode-select")

colorPicker.value = defaultColorHex;
colorModeSelect.value = defaultColorMode

renderColorSchm()

document.getElementById("get-schm-btn").addEventListener("click", function(){
    renderColorSchm()
})

function renderColorSchm(){ 
    const url = getURL()  
    fetch(url, {
        headers: {'Content-Type': 'application/json'}
        }).then(resp => resp.json())
        .then(data => {
            let colorsArray = data.colors
            for (let i = 0; i < colorsArray.length; i++){
                const colorHex = i == 0 ? colorPicker.value : colorsArray[i-1].name.closest_named_hex
                document.getElementById(`color-hex-value-${i+1}`).innerText = colorHex
                document.getElementById(`color-${i+1}`).style.backgroundColor = colorHex
            }
        })}
        

function getURL(){
    return `
    https://www.thecolorapi.com/scheme?hex=${colorPicker.value.replace("#","")}&mode=${colorModeSelect.value}&count=5`
}

document.addEventListener("click", function(e){
    if (e.target.id.includes("color-hex-value-")){
        navigator.clipboard.writeText(e.target.innerText)
    } else if (e.target.id.includes("color-")){
        navigator.clipboard.writeText(e.target.style.backgroundColor)
    }
})
