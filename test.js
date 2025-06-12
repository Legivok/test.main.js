// Konfiguráció kezdete
const standartConfig = {
  supplies: {
    delay: 50,
    multiply: 1,
    repair: false,
    shield: false,
    damage: false,
    speed: false,
    mine: false
  },
  menu: {
    posY: "1rem",
    posX: "1rem"
  },
  binds: {
    menu: "Numpad0",
    mines: "KeyM",
    supplies: "Semicolon"
  }
};

let config = JSON.parse(localStorage.getItem("RendaConfig")) || standartConfig;
const saveConfig = () => {
  localStorage.setItem("RendaConfig", JSON.stringify(config));
};
saveConfig();

unsafeWindow.rendaSettings = {
  changeBind: {
    menu: e => {
      config.binds.menu = e;
      saveConfig();
    },
    mines: e => {
      config.binds.mines = e;
      saveConfig();
    },
    supplies: e => {
      config.binds.supplies = e;
      saveConfig();
    }
  },
  resetConfig: () => {
    config = standartConfig;
    saveConfig();
  }
};

const root = window;
const emulateSupply = code => {
  root.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, code }));
  root.dispatchEvent(new KeyboardEvent("keyup", { bubbles: true, code }));
};

let lastClickTime = Date.now();
function activateSupplies() {
  if (config.supplies.delay !== 0 && Date.now() - lastClickTime < config.supplies.delay) {
    requestAnimationFrame(activateSupplies);
  } else {
    if (config.supplies.repair) emulateSupply("Digit1");
    if (config.supplies.shield) emulateSupply("Digit2");
    if (config.supplies.damage) emulateSupply("Digit3");
    if (config.supplies.speed) emulateSupply("Digit4");
    if (config.supplies.mine) {
      for (let i = 0; i < config.supplies.multiply; i++) {
        emulateSupply(config.binds.mines);
      }
    }
    lastClickTime = Date.now();
    requestAnimationFrame(activateSupplies);
  }
}
activateSupplies();
