"use strict";
import * as model from "./model.js";
import view from "./view.js";

const controlUpdateCurrSymbolsArr = (symbol) => {
  model.state.currSymbolsArr.push(symbol);
};

const controlUpdateMultiplierBoxesArr = (multiplierBoxes, j) => {
  if (j === 0) model.state.leftMultiplierBoxesArr.push(multiplierBoxes);
  if (j === 1) model.state.rightMultiplierBoxesArr.push(multiplierBoxes);
};

const controlIncreaseWager = () => {
  if (model.state.wager === model.state.coins || view.btnsBlock) return;
  model.state.wager++;
  view.updateWager(model.state.wager);
};

const controlDecreaseWager = () => {
  if (model.state.wager === 1 || view.btnsBlock) return;
  model.state.wager--;
  view.updateWager(model.state.wager);
};

const controlSpin = () => {
  if (model.state.wager > model.state.coins || view.btnsBlock) return;
  view.btnsBlock = true;
  model.state.coins -= model.state.wager;
  view.updateCoins(model.state.coins);
  view.slideSymbolsOut(model.state.currSymbolsArr);
  const result =
    model.state.data[Math.floor(Math.random() * model.state.data.length)];
  view.updateSymbols(
    result.response.results,
    model.state.reelContainersArr,
    model.state.currSymbolsArr,
    model.state.symbolsPathArr,
    controlUpdateCurrSymbolsArr
  );
  view.checkForWin(result.response.results, controlWinner);
};

const controlWinner = (winMultiplier) => {
  const multiplierBoxesToAnimate =
    model.findMultiplierBoxesToAnimate(winMultiplier);
  view.animateMultiplierBoxes(multiplierBoxesToAnimate);
  model.state.coins += model.state.wager * winMultiplier;
  view.updateCoins(model.state.coins);
  const symbolsToAnimate = model.findSymbolsToAnimate();
  view.animateWinningSymbols(symbolsToAnimate);
};

const init = () => {
  const app = new PIXI.Application({
    width: 1920,
    height: 1080,
    backgroundColor: 0x4abdac,
  });
  document.body.appendChild(app.view);
  model.loadAssets(app, initContinued);
};

const initContinued = (app) => {
  model.createGameContainer(app);
  model.createReelContainers();
  view.renderAndStyleReelContainers(
    model.state.reelContainersArr,
    app,
    model.state.gameContainer
  );
  view.addRandomSymbols(
    model.state.reelContainersArr,
    model.state.symbolsPathArr,
    controlUpdateCurrSymbolsArr
  );
  view.renderGameContainer(app, model.state.gameContainer);
  view.renderMultiplierDisplays(
    app,
    model.state.multipliers,
    controlUpdateMultiplierBoxesArr
  );
  view.renderTextAndBoxes(app);
  view.addIncreaseWagerHandler(controlIncreaseWager);
  view.addDecreaseWagerHandler(controlDecreaseWager);
  view.addSpinHandler(controlSpin);
};

window.addEventListener("load", () => {
  init();
});
