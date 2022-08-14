"use strict";

export const state = {
  data: [
    {
      response: {
        results: {
          win: 0,
          symbolIDs: [2, 5, 2, 1],
        },
      },
    },

    {
      response: {
        results: {
          win: 8,
          symbolIDs: [5, 5, 5, 1],
        },
      },
    },

    {
      response: {
        results: {
          win: 0,
          symbolIDs: [0, 3, 1, 4],
        },
      },
    },

    {
      response: {
        results: {
          win: 0,
          symbolIDs: [5, 4, 1, 1],
        },
      },
    },

    {
      response: {
        results: {
          win: 2,
          symbolIDs: [1, 1, 5, 3],
        },
      },
    },

    {
      response: {
        results: {
          win: 4,
          symbolIDs: [2, 2, 2, 3],
        },
      },
    },

    {
      response: {
        results: {
          win: 4,
          symbolIDs: [5, 5, 2, 2],
        },
      },
    },

    {
      response: {
        results: {
          win: 3,
          symbolIDs: [2, 2, 3, 5],
        },
      },
    },

    {
      response: {
        results: {
          win: 0,
          symbolIDs: [4, 5, 3, 5],
        },
      },
    },

    {
      response: {
        results: {
          win: 8,
          symbolIDs: [5, 5, 5, 3],
        },
      },
    },

    {
      response: {
        results: {
          win: 9,
          symbolIDs: [3, 3, 3, 3],
        },
      },
    },

    {
      response: {
        results: {
          win: 6,
          symbolIDs: [4, 4, 4, 5],
        },
      },
    },

    {
      response: {
        results: {
          win: 1,
          symbolIDs: [0, 0, 3, 5],
        },
      },
    },

    {
      response: {
        results: {
          win: 5,
          symbolIDs: [1, 1, 1, 2],
        },
      },
    },

    {
      response: {
        results: {
          win: 0,
          symbolIDs: [2, 5, 2, 2],
        },
      },
    },

    {
      response: {
        results: {
          win: 5,
          symbolIDs: [2, 2, 2, 5],
        },
      },
    },

    {
      response: {
        results: {
          win: 0,
          symbolIDs: [4, 3, 0, 5],
        },
      },
    },

    {
      response: {
        results: {
          win: 6,
          symbolIDs: [3, 3, 3, 0],
        },
      },
    },

    {
      response: {
        results: {
          win: 8,
          symbolIDs: [2, 2, 2, 2],
        },
      },
    },

    {
      response: {
        results: {
          win: 0,
          symbolIDs: [0, 1, 5, 4],
        },
      },
    },
  ],
  reelContainersArr: [],
  currSymbolsArr: [],
  symbolsPathArr: "",
  gameContainer: "",
  coins: 10,
  wager: 1,
  multipliers: [1, 2, 3, 4, 5, 6, 8, 9],
  leftMultiplierBoxesArr: [],
  rightMultiplierBoxesArr: [],
};

export const loadAssets = (app, handler) => {
  const onAssetsLoaded = (loader, res) => {
    state.symbolsPathArr = [
      res.cherry.spineData,
      res.lemon.spineData,
      res.orange.spineData,
      res.plum.spineData,
      res.grape.spineData,
      res.melon.spineData,
    ];
    handler(app);
  };

  app.loader
    .add("cherry", "./../assets/symbols/symbol_00.json")
    .add("lemon", "./../assets/symbols/symbol_01.json")
    .add("orange", "./../assets/symbols/symbol_02.json")
    .add("plum", "./../assets/symbols/symbol_03.json")
    .add("grape", "./../assets/symbols/symbol_04.json")
    .add("melon", "./../assets/symbols/symbol_05.json")
    .load(onAssetsLoaded);
};

export const createGameContainer = (app) => {
  state.gameContainer = new PIXI.Container();
  const mainBackgroundRectMask = new PIXI.Graphics();
  mainBackgroundRectMask.beginFill();
  mainBackgroundRectMask.drawRect(
    100,
    100,
    app.view.width - 200,
    app.view.height - 400
  );

  state.gameContainer.mask = mainBackgroundRectMask;
};

export const createReelContainers = () => {
  for (let i = 0; i < 4; i++) {
    state.reelContainersArr.push(new PIXI.Container());
  }
};

export const findMultiplierBoxesToAnimate = (winMultiplier) => {
  const index = state.multipliers.indexOf(winMultiplier);
  const boxesToAnimate = [
    state.leftMultiplierBoxesArr[index],
    state.rightMultiplierBoxesArr[index],
  ];
  return boxesToAnimate;
};

export const findSymbolsToAnimate = () => {
  const hashCurrSymbolsArr = [];

  state.currSymbolsArr.forEach((s) => {
    hashCurrSymbolsArr.push(s.skeleton.data.hash);
  });

  const unique = Array.from(new Set(hashCurrSymbolsArr));

  unique.forEach((s, i) => {
    const index = hashCurrSymbolsArr.findIndex((e) => e === s);
    hashCurrSymbolsArr.splice(index, 1);
  });
  const hashSymbolsToAnimateArr = Array.from(new Set(hashCurrSymbolsArr));
  console.log(hashSymbolsToAnimateArr);

  const symbolsToAnimate = [];

  hashSymbolsToAnimateArr.forEach((a) => {
    const symbolsAnimate = state.currSymbolsArr.filter(
      (symb) => symb.skeleton.data.hash === a
    );
    symbolsToAnimate.push(symbolsAnimate);
  });

  console.log(symbolsToAnimate.flat());
  return symbolsToAnimate.flat();
};
