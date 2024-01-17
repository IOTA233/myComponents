(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.zhdgpsConstants = {}));
})(this, function(exports2) {
  "use strict";
  const EVENT_CODE = {
    tab: "Tab",
    enter: "Enter",
    space: "Space",
    left: "ArrowLeft",
    // 37
    up: "ArrowUp",
    // 38
    right: "ArrowRight",
    // 39
    down: "ArrowDown",
    // 40
    esc: "Escape",
    delete: "Delete",
    backspace: "Backspace",
    numpadEnter: "NumpadEnter",
    pageUp: "PageUp",
    pageDown: "PageDown",
    home: "Home",
    end: "End"
  };
  const amapKey = "3bb92d5a288edf34dca79cea8e0efe1f";
  const tiandituKey = "231e5d4a9a917e53a383d3d591a1ed12";
  const componentSizes = ["", "default", "small", "large"];
  const componentSizeMap = {
    large: 40,
    default: 32,
    small: 24
  };
  const weatherImages = /* @__PURE__ */ new Map([
    ["晴", "100"],
    ["多云", "101"],
    ["少云", "101"],
    ["晴间多云", "103"],
    ["阴", "104"],
    ["阵雨", "300"],
    ["强阵雨", "300"],
    ["雷阵雨", "302"],
    ["强雷阵雨", "302"],
    ["雷阵雨并伴有冰雹", "302"],
    ["小雨", "305"],
    ["中雨", "306"],
    ["大雨", "306"],
    ["极端降雨", "306"],
    ["毛毛雨/细雨", "305"],
    ["暴雨", "310"],
    ["大暴雨", "311"],
    ["特大暴雨", "312"],
    ["冻雨", "313"],
    ["小雨-中雨", "305"],
    ["中雨-大雨", "306"],
    ["大雨-暴雨", "310"],
    ["暴雨-大暴雨", "311"],
    ["大暴雨-特大暴雨", "312"],
    ["雨", "305"],
    ["小雪", "400"],
    ["中雪", "401"],
    ["大雪", "402"],
    ["暴雪", "403"],
    ["雨夹雪", "400"],
    ["雨雪天气", "400"],
    ["阵雨夹雪", "400"],
    ["小雪-中雪", "401"],
    ["中雪-大雪", "402"],
    ["大雪-暴雪", "403"],
    ["阵雪", "400"],
    ["雪", "400"],
    ["轻雾", "502"],
    ["雾", "502"],
    ["霾", "502"],
    ["扬沙", "507"],
    ["浮尘", "507"],
    ["沙尘暴", "507"],
    ["强沙尘暴", "507"],
    ["浓雾", "502"],
    ["强浓雾", "502"],
    ["中度霾", "502"],
    ["重度霾", "502"],
    ["严重霾", "502"],
    ["大雾", "502"],
    ["特强浓雾", "502"],
    ["热", "999"],
    ["冷", "999"],
    ["未知", "999"]
  ]);
  exports2.EVENT_CODE = EVENT_CODE;
  exports2.amapKey = amapKey;
  exports2.componentSizeMap = componentSizeMap;
  exports2.componentSizes = componentSizes;
  exports2.tiandituKey = tiandituKey;
  exports2.weatherImages = weatherImages;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
