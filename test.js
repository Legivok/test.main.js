const standartConfig={supplies:{delay:50,multiply:1,repair:!1,shield:!1,damage:!1,speed:!1,mine:!1},menu:{posY:"1rem",posX:"1rem"},binds:{menu:"Numpad0",mines:"Numpad5",supplies:"Semicolon"}};let config=JSON.parse(localStorage.getItem("RendaConfig"))||standartConfig;const saveConfig=()=>{localStorage.setItem("RendaConfig",JSON.stringify(config))};saveConfig(),unsafeWindow.rendaSettings={changeBind:{menu:e=>{config.binds.menu=e,saveConfig()},mines:e=>{config.binds.mines=e,saveConfig()},supplies:e=>{config.binds.supplies=e,saveConfig()}},resetConfig:()=>{config=standartConfig,saveConfig()}};const styleElement=document.createElement("style");document.head.appendChild(styleElement),styleElement.textContent=`
@keyframes animIn {
    from {
        opacity: 0;
        transform: translateY(5rem) scale(0.9);
        filter: blur(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
        filter: blur(0);
    }
}

@keyframes animOut {
    from {
        opacity: 1;
        transform: translateY(0) scale(1);
        filter: blur(0);
    }
    to {
        opacity: 0;
        transform: translateY(-5rem) scale(0.9);
        filter: blur(20px);
    }
}
.animIn {
    animation: animIn 0.3s forwards;
}
.animOut {
    animation: animOut 0.3s forwards;
}
.renda_window{
    opacity: 0;
    display: none;
    position: fixed;
    width: 17rem;
    top:${config.menu.posY};
    left:${config.menu.posX};
    padding: 1rem;
    background: rgba(0,0,0,.5);
    backdrop-filter: blur(3px);
    border-radius: 1.5rem;
    z-index: 9998;
    font-size: 1.5rem;
    color: white;
    transition: opacity 0.5s, transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    user-select: none;
    text-align: center;
}
.switch_container{
    display: flex;
    justify-content: space-between;
}
.switch:hover{
    transform: scale(1.05);
}
.switch{
    margin: .2rem;
    width: 2.7rem;
    height: 2.7rem;
    border: .15rem solid rgba(255, 255, 255, 0.2);
    border-radius: 1rem;
    text-align: center;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
}
.switch img{
    width: 2rem;
    height: 2rem;
    transition: filter 0.3s ease-in-out;
}
.switch_off{
    filter: contrast(0%);
}
.switch_on{
    filter: contrast(100%);
}
.renda_slider{
    -webkit-appearance: none;
    appearance: none;
    background: rgb(200, 200, 200);
    margin: .5rem;
    width: 7rem;
    border-radius: .5rem;
    height: .7rem;
}
.renda_slider::-webkit-slider-thumb{
    -webkit-appearance: none;
    appearance: none;
    width: 1rem;
    height: 1rem;
    background: rgb(50, 50, 50);
    cursor: pointer;
    border-radius: 50%;
}
`;const floatingWindow=document.createElement("div");floatingWindow.classList.add("renda_window");const title=document.createElement("div");title.classList.add("renda_title"),title.textContent="Renda\nclicker",floatingWindow.appendChild(title);const switchContainer=document.createElement("div");switchContainer.classList.add("switch_container"),floatingWindow.appendChild(switchContainer);const repairSwitch=document.createElement("div");repairSwitch.classList.add("switch");const repairImg=document.createElement("img");repairImg.classList.toggle("switch_on",config.supplies.repair),repairImg.classList.toggle("switch_off",!config.supplies.repair),repairImg.src="data:image/svg+xml;base64,...";repairSwitch.appendChild(repairImg),repairSwitch.addEventListener("click",(()=>{config.supplies.repair=!config.supplies.repair,repairImg.classList.toggle("switch_on",config.supplies.repair),repairImg.classList.toggle("switch_off",!config.supplies.repair),saveConfig()})),switchContainer.appendChild(repairSwitch);
