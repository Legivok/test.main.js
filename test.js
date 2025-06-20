const standartConfig = {
  supplies: {
    delay: 50,
    multiply: 1,
    repair: !1,
    shield: !1,
    damage: !1,
    speed: !1,
    mine: !1,
  },
  menu: { posY: "1rem", posX: "1rem" },
  binds: { menu: "KeyM", mines: "Quote", supplies: "Semicolon" },
};
let config = JSON.parse(localStorage.getItem("BetterConfig")) || standartConfig;
const saveConfig = () => {
  localStorage.setItem("BetterConfig", JSON.stringify(config));
};
saveConfig(),
  (unsafeWindow.betterSettings = {
    changeBind: {
      menu: (e) => {
        (config.binds.menu = e), saveConfig();
      },
      mines: (e) => {
        (config.binds.mines = e), saveConfig();
      },
      supplies: (e) => {
        (config.binds.supplies = e), saveConfig();
      },
    },
    resetConfig: () => {
      (config = standartConfig), saveConfig();
    },
  });

const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap";
document.head.appendChild(fontLink);

const styleElement = document.createElement("style");
document.head.appendChild(styleElement),
  (styleElement.textContent = `\n@keyframes animIn {\n    from {\n        opacity: 0;\n        transform: translateY(5rem) scale(0.9);\n        filter: blur(20px);\n    }\n    to {\n        opacity: 1;\n        transform: translateY(0) scale(1);\n        filter: blur(0);\n    }\n}\n\n@keyframes animOut {\n    from {\n        opacity: 1;\n        transform: translateY(0) scale(1);\n        filter: blur(0);\n    }\n    to {\n        opacity: 0;\n        transform: translateY(-5rem) scale(0.9);\n        filter: blur(20px);\n    }\n}\n.animIn {\n    animation: animIn 0.3s forwards;\n}\n.animOut {\n    animation: animOut 0.3s forwards;\n}\n.better_window{\nfont-family: 'Press Start 2P', cursive;\n    opacity: 0;\n    display: none;\n    position: fixed;\n    width: 17rem;\n    top:${config.menu.posY};\n    left:${config.menu.posX};\n    padding: 1rem;\n    background: rgba(0,0,0,.5);\n    backdrop-filter: blur(3px);\n    border-radius: 1.5rem;\n    z-index: 9998;\n    font-size: 1.5rem;\n    color: white;\n    transition: opacity 0.5s, transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);\n    user-select: none;\n    text-align: center;\n}\n.switch_container{\n    display: flex;\n    justify-content: space-between;\n}\n.switch:hover{\n    transform: scale(1.05);\n}\n.switch{\n    margin: .2rem;\n    width: 2.7rem;\n    height: 2.7rem;\n    border: .15rem solid rgba(255, 255, 255, 0.2);\n    border-radius: 1rem;\n    text-align: center;\n    cursor: pointer;\n    transition: transform 0.3s ease-in-out;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n.switch img{\n    width: 2rem;\n    height: 2rem;\n    transition: filter 0.3s ease-in-out;\n}\n.switch_off{\n    filter: contrast(0%);\n}\n.switch_on{\n    filter: contrast(100%);\n}\n.better_slider{\n    -webkit-appearance: none;\n    appearance: none;\n    background: rgb(200, 200, 200);\n    margin: .5rem;\n    width: 7rem;\n    border-radius: .5rem;\n    height: .7rem;\n}\n.better_slider::-webkit-slider-thumb{\n    -webkit-appearance: none;\n    appearance: none;\n    width: 1rem;\n    height: 1rem;\n    background: rgb(50, 50, 50);\n    cursor: pointer;\n    border-radius: 50%;\n}\n`);
const floatingWindow = document.createElement("div");
floatingWindow.classList.add("better_window");
const title = document.createElement("div");
title.classList.add("better_title"),
  (title.textContent = "Better\nclicker+"),
  floatingWindow.appendChild(title);

const createBindChanger = (label, key, changeFn, target = floatingWindow) => {
  const container = document.createElement("div");
  container.style.marginTop = "0.5rem";
  container.style.display = "flex";
  container.style.justifyContent = "space-between";
  container.style.alignItems = "center";

  const span = document.createElement("span");
  span.textContent = label + ":";
  span.style.marginRight = "0.5rem";
  container.appendChild(span);

  const button = document.createElement("button");
  button.textContent = config.binds[key].replace("Key", "").replace("Digit", "");
  button.style.padding = "0.2rem 0.6rem";
  button.style.borderRadius = "0.5rem";
  button.style.border = "none";
  button.style.cursor = "pointer";
  button.style.background = "#444";
  button.style.color = "#fff";
  button.style.fontSize = "1rem";

  button.addEventListener("click", () => {
    button.textContent = "Press a key...";
    const listener = (ev) => {
      if (key === "mines" && ev.code === "Digit5") {
        alert("⚠️ '5' is the default mine key in the game. Please choose a different key.");
        button.textContent = config.binds[key].replace("Key", "").replace("Digit", "");
        document.removeEventListener("keydown", listener);
        return;
      }

      config.binds[key] = ev.code;
      button.textContent = ev.code.replace("Key", "").replace("Digit", "");
      changeFn(ev.code);
      saveConfig();
      document.removeEventListener("keydown", listener);
    };
    document.addEventListener("keydown", listener);
  });

  container.appendChild(button);
  target.appendChild(container);
};

const switchContainer = document.createElement("div");
switchContainer.classList.add("switch_container"),
  floatingWindow.appendChild(switchContainer);
const repairSwitch = document.createElement("div");
repairSwitch.classList.add("switch");
const repairImg = document.createElement("img");
repairImg.classList.toggle("switch_on", config.supplies.repair),
  repairImg.classList.toggle("switch_off", !config.supplies.repair),
  (repairImg.src =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzMiIGhlaWdodD0iMzMiIHZpZXdCb3g9IjAgMCAzMyAzMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNS40OTk1IDEuNUwyMC45OTk1IDZWOEwyNC45OTk1IDEySDI2Ljk5OTVMMzEuNDk5NSA3LjVIMzIuOTk5NVYxMEMzMi45OTk1IDE1LjUyMjggMjguNTIyNCAyMCAyMi45OTk1IDIwQzIxLjUzMjIgMjAgMjAuMTM4NiAxOS42ODQgMTguODgzMyAxOS4xMTYyTDYuOTk5OTMgMzAuOTk5OUM1LjYxOTIyIDMyLjM4MDcgMy4zODA2MSAzMi4zODA3IDEuOTk5ODkgMzFDMC42MTkxOSAyOS42MTkzIDAuNjE5MTc3IDI3LjM4MDcgMS45OTk4NSAyNkwxMy44ODMzIDE0LjExNjJDMTMuMzE1NiAxMi44NjA5IDEyLjk5OTUgMTEuNDY3MyAxMi45OTk1IDEwQzEyLjk5OTUgNC40NzcxNSAxNy40NzY3IDAgMjIuOTk5NSAwSDI1LjQ5OTVWMS41WiIgZmlsbD0iI0JGRTUwMCIvPgo8L3N2Zz4K"),
  repairSwitch.appendChild(repairImg),
  repairSwitch.addEventListener("click", () => {
    (config.supplies.repair = !config.supplies.repair),
      repairImg.classList.toggle("switch_on", config.supplies.repair),
      repairImg.classList.toggle("switch_off", !config.supplies.repair),
      saveConfig();
  }),
  switchContainer.appendChild(repairSwitch);
const shieldSwitch = document.createElement("div");
shieldSwitch.classList.add("switch");
const shieldImg = document.createElement("img");
shieldImg.classList.toggle("switch_on", config.supplies.shield),
  shieldImg.classList.toggle("switch_off", !config.supplies.shield),
  (shieldImg.src =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yOS4zNTg1IDIwLjI2MTdDMjYuNjE0MSAyOC45Njc0IDE2IDMyIDE2IDMyQzE2IDMyIDIgMjggMiAxNlY1LjUwODZDMiA0LjYxNTY0IDIuNTkxOTUgMy44MzA4NyAzLjQ1MDU2IDMuNTg1NTVMMTYgMEwyOC41NDk0IDMuNTg1NTVDMjkuNDA4IDMuODMwODcgMzAgNC42MTU2NCAzMCA1LjUwODZWMTJWMTZDMzAgMTYgMzAgMTYgMzAgMTZDMzAgMTcuNTUxNCAyOS43NjYgMTguOTY5MSAyOS4zNTg1IDIwLjI2MTdaTTI2IDEwLjg1NzFWNy4wMTcyMUwxNiA0LjE2MDA2TDYgNy4wMTcyMVYxNkM2IDIwLjIwOTEgOC4zOTA3NCAyMy4xNDkyIDExLjMyNSAyNS4yNDUxQzEyLjc3OTMgMjYuMjgzOSAxNC4yNTk1IDI3LjAyNzIgMTUuMzg4MiAyNy41MTA5QzE1LjYwOSAyNy42MDU1IDE1LjgxNCAyNy42ODkyIDE2IDI3Ljc2MjRMMTYgOEwyNiAxMC44NTcxWiIgZmlsbD0iI0VBREM5OSIvPgo8L3N2Zz4K"),
  shieldSwitch.appendChild(shieldImg),
  shieldSwitch.addEventListener("click", () => {
    (config.supplies.shield = !config.supplies.shield),
      shieldImg.classList.toggle("switch_on", config.supplies.shield),
      shieldImg.classList.toggle("switch_off", !config.supplies.shield),
      saveConfig();
  }),
  switchContainer.appendChild(shieldSwitch);
const damageSwitch = document.createElement("div");
damageSwitch.classList.add("switch");
const damageImg = document.createElement("img");
damageImg.classList.toggle("switch_on", config.supplies.damage),
  damageImg.classList.toggle("switch_off", !config.supplies.damage),
  (damageImg.src =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00IDEuMzMzMzNMMCAyNkwyMCAxMkw2IDMyTDMwLjY2NjcgMjhMMjAgMjRMMzIgMEw4IDEyTDQgMS4zMzMzM1oiIGZpbGw9IiNGRjMzMzMiLz4KPC9zdmc+Cg=="),
  damageSwitch.appendChild(damageImg),
  damageSwitch.addEventListener("click", () => {
    (config.supplies.damage = !config.supplies.damage),
      damageImg.classList.toggle("switch_on", config.supplies.damage),
      damageImg.classList.toggle("switch_off", !config.supplies.damage),
      saveConfig();
  }),
  switchContainer.appendChild(damageSwitch);
const speedSwitch = document.createElement("div");
speedSwitch.classList.add("switch");
const speedImg = document.createElement("img");
speedImg.classList.toggle("switch_on", config.supplies.speed),
  speedImg.classList.toggle("switch_off", !config.supplies.speed),
  (speedImg.src =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgMTMuODM5N0MyIDEyLjY3MiAyLjUxMDI1IDExLjU2MjYgMy4zOTY4MyAxMC44MDI3TDE2IDBMMjguNjAzMiAxMC44MDI3QzI5LjQ4OTcgMTEuNTYyNiAzMCAxMi42NzIgMzAgMTMuODM5N1YyMEwxNiA4TDIgMjBWMTMuODM5N1oiIGZpbGw9IiNGRkZGMDAiLz4KPHBhdGggZD0iTTIgMjUuODM5N0MyIDI0LjY3MiAyLjUxMDI1IDIzLjU2MjYgMy4zOTY4MyAyMi44MDI3TDE2IDEyTDI4LjYwMzIgMjIuODAyN0MyOS40ODk3IDIzLjU2MjYgMzAgMjQuNjcyIDMwIDI1LjgzOTdWMzJMMTYgMjBMMiAzMlYyNS44Mzk3WiIgZmlsbD0iI0ZGRkYwMCIvPgo8L3N2Zz4K"),
  speedSwitch.appendChild(speedImg),
  speedSwitch.addEventListener("click", () => {
    (config.supplies.speed = !config.supplies.speed),
      speedImg.classList.toggle("switch_on", config.supplies.speed),
      speedImg.classList.toggle("switch_off", !config.supplies.speed),
      saveConfig();
  }),
  switchContainer.appendChild(speedSwitch);
const mineSwitch = document.createElement("div");
mineSwitch.classList.add("switch");
const mineImg = document.createElement("img");
mineImg.classList.toggle("switch_on", config.supplies.mine),
  mineImg.classList.toggle("switch_off", !config.supplies.mine),
  (mineImg.src =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00IDIxLjAwOThWMTAuOTkwMkwxMC45OTAyIDRIMjEuMDA5OEwyOCAxMC45OTAyVjIxLjAwOThMMjEuMDA5OCAyOEgxMC45OTAyTDQgMjEuMDA5OFpNOC43NDc1NSAwLjU4NTc4NkM5LjEyMjYyIDAuMjEwNzEzIDkuNjMxMzMgMCAxMC4xNjE4IDBIMjEuODM4MkMyMi4zNjg3IDAgMjIuODc3NCAwLjIxMDcxNCAyMy4yNTI1IDAuNTg1Nzg3TDMxLjQxNDIgOC43NDc1NUMzMS43ODkzIDkuMTIyNjIgMzIgOS42MzEzMyAzMiAxMC4xNjE4VjIxLjgzODJDMzIgMjIuMzY4NyAzMS43ODkzIDIyLjg3NzQgMzEuNDE0MiAyMy4yNTI1TDIzLjI1MjUgMzEuNDE0MkMyMi44Nzc0IDMxLjc4OTMgMjIuMzY4NyAzMiAyMS44MzgyIDMySDEwLjE2MThDOS42MzEzMyAzMiA5LjEyMjYyIDMxLjc4OTMgOC43NDc1NSAzMS40MTQyTDAuNTg1Nzg2IDIzLjI1MjVDMC4yMTA3MTMgMjIuODc3NCAwIDIyLjM2ODcgMCAyMS44MzgyVjEwLjE2MThDMCA5LjYzMTMzIDAuMjEwNzE0IDkuMTIyNjIgMC41ODU3ODYgOC43NDc1NUw4Ljc0NzU1IDAuNTg1Nzg2Wk0xNiAyM0MxOS44NjYgMjMgMjMgMTkuODY2IDIzIDE2QzIzIDEyLjEzNCAxOS44NjYgOSAxNiA5QzEyLjEzNCA5IDkgMTIuMTM0IDkgMTZDOSAxOS44NjYgMTIuMTM0IDIzIDE2IDIzWiIgZmlsbD0iIzM2QjI0QSIvPgo8L3N2Zz4K"),
  mineSwitch.appendChild(mineImg),
  mineSwitch.addEventListener("click", () => {
    (config.supplies.mine = !config.supplies.mine),
      mineImg.classList.toggle("switch_on", config.supplies.mine),
      mineImg.classList.toggle("switch_off", !config.supplies.mine),
      saveConfig();
  }),
  switchContainer.appendChild(mineSwitch);
const multiplySlider = document.createElement("input");
multiplySlider.classList.add("better_slider"),
  (multiplySlider.type = "range"),
  (multiplySlider.min = 1),
  (multiplySlider.max = 10),
  (multiplySlider.value = config.supplies.multiply),
  multiplySlider.addEventListener("input", ({ target: e }) => {
    (config.supplies.multiply = parseInt(e.value)), saveConfig();
  }),
  floatingWindow.appendChild(multiplySlider);
const multiplyLabel = document.createElement("span");
(multiplyLabel.textContent = `Multiply: ${config.supplies.multiply}`),
  setInterval(() => {
    multiplyLabel.textContent = `Multiply: ${config.supplies.multiply}`;
  }, 100),
  floatingWindow.appendChild(multiplyLabel);
const delaySlider = document.createElement("input");
delaySlider.classList.add("better_slider"),
  (delaySlider.type = "range"),
  (delaySlider.min = 0),
  (delaySlider.max = 300),
  (delaySlider.step = 5),
  (delaySlider.value = config.supplies.delay),
  delaySlider.addEventListener("input", ({ target: e }) => {
    (config.supplies.delay = parseInt(e.value)), saveConfig();
  }),
  floatingWindow.appendChild(delaySlider);
const delayLabel = document.createElement("span");
(delayLabel.textContent = `Delay: ${config.supplies.delay}`),
  setInterval(() => {
    delayLabel.textContent = `Delay: ${config.supplies.delay}`;
  }, 100),
  floatingWindow.appendChild(delayLabel);
const emulateSupply = (e) => {
  root.dispatchEvent(
    new KeyboardEvent("keydown", { bubbles: !0, code: "Digit" + e }),
  ),
    root.dispatchEvent(
      new KeyboardEvent("keyup", { bubbles: !0, code: "Digit" + e }),
    );
};
let lastClickTime = Date.now();
function activateSupplies() {
  if (
    0 != config.supplies.delay &&
    Date.now() - lastClickTime < config.supplies.delay
  )
    requestAnimationFrame(activateSupplies);
  else {
    config.supplies.repair && emulateSupply("1"),
      config.supplies.shield && emulateSupply("2"),
      config.supplies.damage && emulateSupply("3"),
      config.supplies.speed && emulateSupply("4");
    for (let e = 0; e < config.supplies.multiply; e++)
      config.supplies.mine && emulateSupply("5");
    (lastClickTime = Date.now()), requestAnimationFrame(activateSupplies);
  }
}
activateSupplies();
const openMenu = () => {
    (floatingWindow.style.display = "block"),
      floatingWindow.classList.remove("animOut"),
      floatingWindow.classList.add("animIn"),
      (isMenuOpen = !0);
  },
  closeMenu = () => {
    floatingWindow.classList.remove("animIn"),
      floatingWindow.classList.add("animOut"),
      floatingWindow.addEventListener(
        "animationend",
        () => {
          floatingWindow.classList.contains("animOut") &&
            (floatingWindow.style.display = "none");
        },
        { once: !0 },
      ),
      (isMenuOpen = !1);
  };
let isMenuOpen = !1;
document.addEventListener("keyup", ({ code: e }) => {
  if (
    null ===
    document.querySelector(".BattleHudComponentStyle-hudContainer input")
  )
    switch (e) {
      case config.binds.menu:
        isMenuOpen
          ? (floatingWindow.classList.remove("animIn"),
            floatingWindow.classList.add("animOut"),
            floatingWindow.addEventListener(
              "animationend",
              () => {
                floatingWindow.classList.contains("animOut") &&
                  (floatingWindow.style.display = "none");
              },
              { once: !0 },
            ),
            (isMenuOpen = !1))
          : ((floatingWindow.style.display = "block"),
            floatingWindow.classList.remove("animOut"),
            floatingWindow.classList.add("animIn"),
            (isMenuOpen = !0));
        break;
      case config.binds.mines:
        (config.supplies.mine = !config.supplies.mine),
          mineImg.classList.toggle("switch_on", config.supplies.mine),
          mineImg.classList.toggle("switch_off", !config.supplies.mine),
          saveConfig();
        break;
      case config.binds.supplies:
        (config.supplies.shield = !config.supplies.shield),
          shieldImg.classList.toggle("switch_on", config.supplies.shield),
          shieldImg.classList.toggle("switch_off", !config.supplies.shield),
          (config.supplies.damage = !config.supplies.damage),
          damageImg.classList.toggle("switch_on", config.supplies.damage),
          damageImg.classList.toggle("switch_off", !config.supplies.damage),
          (config.supplies.speed = !config.supplies.speed),
          speedImg.classList.toggle("switch_on", config.supplies.speed),
          speedImg.classList.toggle("switch_off", !config.supplies.speed),
          saveConfig();
    }
});
let offsetX,
  offsetY,
  isDragging = !1,
  canDrag = !0;
floatingWindow.addEventListener(
  "mousedown",
  ({ target: e, clientX: i, clientY: n }) => {
    e.classList.contains("switch") || e.classList.contains("better_slider")
      ? (canDrag = !1)
      : ((canDrag = !0),
        (isDragging = !0),
        (offsetX = i - floatingWindow.getBoundingClientRect().left),
        (offsetY = n - floatingWindow.getBoundingClientRect().top));
  },
),
  document.addEventListener("mousemove", ({ clientX: e, clientY: i }) => {
    if (isDragging && canDrag) {
      const n = e - offsetX + "px",
        s = i - offsetY + "px";
      (floatingWindow.style.left = n),
        (floatingWindow.style.top = s),
        (config.menu.posX = n),
        (config.menu.posY = s);
    }
  }),
  document.addEventListener("mouseup", () => {
    (isDragging = !1), saveConfig();
  }),
  document.body.appendChild(floatingWindow);

// ----- BIND SETTINGS PANEL -----
const bindPanel = document.createElement("div");
bindPanel.classList.add("better_window");
bindPanel.style.zIndex = 9999;
bindPanel.style.top = "4rem";
bindPanel.style.left = "4rem";
bindPanel.style.display = "none";

const bindTitle = document.createElement("div");
bindTitle.textContent = "Bind Settings";
bindTitle.style.marginBottom = "1rem";
bindTitle.style.fontWeight = "bold";
bindPanel.appendChild(bindTitle);

// Bind beállítások UI
createBindChanger("Menu key", "menu", unsafeWindow.betterSettings.changeBind.menu, bindPanel);
createBindChanger("Mine key", "mines", unsafeWindow.betterSettings.changeBind.mines, bindPanel);
createBindChanger("Supplies key", "supplies", unsafeWindow.betterSettings.changeBind.supplies, bindPanel);

document.body.appendChild(bindPanel);

// ----- GOMB a fő UI-ban (nyit/zár) -----
const openBindBtn = document.createElement("button");
openBindBtn.textContent = "Bind Settings";
openBindBtn.style.marginTop = "1rem";
openBindBtn.style.padding = "0.4rem 1rem";
openBindBtn.style.borderRadius = "0.5rem";
openBindBtn.style.background = "#444";
openBindBtn.style.color = "#fff";
openBindBtn.style.border = "0.2rem solid transparent";
openBindBtn.style.cursor = "pointer";

let isBindPanelOpen = false;
openBindBtn.addEventListener("click", () => {
  isBindPanelOpen = !isBindPanelOpen;
  if (isBindPanelOpen) {
    bindPanel.style.display = "block";
    bindPanel.classList.remove("animOut");
    bindPanel.classList.add("animIn");
    openBindBtn.style.border = "0.2rem solid #80c9ff"; // világoskék keret
  } else {
    bindPanel.classList.remove("animIn");
    bindPanel.classList.add("animOut");
    bindPanel.addEventListener("animationend", () => {
      if (!isBindPanelOpen) bindPanel.style.display = "none";
    }, { once: true });
    openBindBtn.style.border = "0.2rem solid transparent";
  }
});
floatingWindow.appendChild(openBindBtn);

// ----- BIND PANEL MOZGATHATÓVÁ TÉTELE -----
let bindOffsetX, bindOffsetY, isDraggingBind = false, canDragBind = true;

bindPanel.addEventListener("mousedown", ({ target, clientX, clientY }) => {
  if (target.tagName === "BUTTON" || target.tagName === "INPUT") {
    canDragBind = false;
    return;
  }
  canDragBind = true;
  isDraggingBind = true;
  bindOffsetX = clientX - bindPanel.getBoundingClientRect().left;
  bindOffsetY = clientY - bindPanel.getBoundingClientRect().top;
});

document.addEventListener("mousemove", ({ clientX, clientY }) => {
  if (isDraggingBind && canDragBind) {
    bindPanel.style.left = clientX - bindOffsetX + "px";
    bindPanel.style.top = clientY - bindOffsetY + "px";
  }
});

document.addEventListener("mouseup", () => {
  isDraggingBind = false;
});
