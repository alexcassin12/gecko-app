"use strict";

class View {
  _REEL_WIDTH = 300;
  _REEL_HEIGHT = 680;
  _SYMBOL_SIZE = 230;
  _SYMBOL_SLIDE_DURATION = 2;
  _SYMBOL_SLIDE_POSITION = 800;
  _SYMBOL_SLIDE_EASE = "elastic";
  _SYMBOL_SLIDE_OUT_DURATION = 0.1;
  _coinsDisplayText;
  _wagerDisplayText;
  btnsBlock = true;
  _spinBtn;
  _increaseWagerBtn;
  _decreaseWagerBtn;

  renderAndStyleReelContainers(reelContainersArr, app, gameContainer) {
    const self = this;
    reelContainersArr.forEach(function (r, i) {
      //Style Reel Containers
      const singleReel = r;
      const reelsBackgroundRect = new PIXI.Graphics();
      reelsBackgroundRect
        .beginFill(0xf7b733)
        .lineStyle(3, 0xffffff, 1)
        .drawRect(0, 0, self._REEL_WIDTH, app.view.height - 400);
      singleReel.x = i * self._REEL_WIDTH + (i + 1) * 20 + 300;
      singleReel.y = 100;
      gameContainer.addChild(singleReel);
      singleReel.addChild(reelsBackgroundRect);
    });
  }

  addRandomSymbols(reelContainersArr, symbolsPathArr, handler) {
    const self = this;
    reelContainersArr.forEach(function (r, i) {
      const singleReel = r;
      const randomSelector = Math.floor(Math.random() * symbolsPathArr.length);
      const symbol = new PIXI.spine.Spine(symbolsPathArr[randomSelector]);
      symbol.y = self._SYMBOL_SIZE + 100;
      symbol.scale.x = 1.1;
      symbol.scale.y = 1.1;
      symbol.x = self._REEL_WIDTH / 2;
      singleReel.addChild(symbol);
      gsap.from(symbol, {
        duration: self._SYMBOL_SLIDE_DURATION,
        y: self._SYMBOL_SLIDE_POSITION,
        ease: self._SYMBOL_SLIDE_EASE,
      });
      handler(symbol);
    });
  }

  renderMultiplierDisplays(app, multipliers, handler) {
    const style = new PIXI.TextStyle({
      fontFamily: "Arial",
      fontSize: 36,
      fontStyle: "italic",
      fontWeight: "bold",
      fill: ["#FFFFFF"],
      stroke: "#4a1850",
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: "#555555",
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 2.5,
      wordWrap: true,
      wordWrapWidth: 440,
    });

    multipliers.forEach((m, i) => {
      for (let j = 0; j < 2; j++) {
        const multiplierDisplay = new PIXI.Graphics();
        multiplierDisplay.beginFill(0xffffff);
        multiplierDisplay.drawRect(0, 0, 100, 70);
        multiplierDisplay.x = 200 + j * 1400;
        multiplierDisplay.y = 100 + i * 87;
        app.stage.addChild(multiplierDisplay);

        const multiplierText = new PIXI.Text(`x ${m}`, style);
        multiplierDisplay.addChild(multiplierText);
        multiplierText.x = 18;
        multiplierText.y = 10;

        handler(multiplierDisplay, j);
      }
    });
  }

  renderGameContainer(app, gameContainer) {
    const self = this;
    app.stage.addChild(gameContainer);
    setTimeout(function () {
      self.btnsBlock = false;
    }, self._SYMBOL_SLIDE_DURATION * 1000);
  }

  renderTextAndBoxes(app) {
    const style = new PIXI.TextStyle({
      fontFamily: "Arial",
      fontSize: 36,
      fontStyle: "italic",
      fontWeight: "bold",
      fill: ["#FFFFFF"],
      stroke: "#4a1850",
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: "#555555",
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 4,
      wordWrap: true,
      wordWrapWidth: 440,
    });

    const bottomRectBackgroundColors = 0xf7b733;

    // Coins Display Box and Text
    const coinsDisplayShadow = new PIXI.Graphics();
    coinsDisplayShadow
      .beginFill(0x222222, 0.4)
      .drawCircle(app.view.width / 2 - 500 + 9, 920 + 9, 95);
    app.stage.addChild(coinsDisplayShadow);

    const coinsDisplay = new PIXI.Graphics();
    coinsDisplay
      .beginFill(bottomRectBackgroundColors)
      .lineStyle(3, 0xffffff, 1)
      .drawCircle(app.view.width / 2 - 500, 920, 95);
    app.stage.addChild(coinsDisplay);

    const coinsHeadingText = new PIXI.Text("Coins", style);
    coinsDisplay.addChild(coinsHeadingText);
    coinsHeadingText.x = app.view.width / 2 - 560;
    coinsHeadingText.y = 870;

    this._coinsDisplayText = new PIXI.Text("10", style);
    coinsDisplay.addChild(this._coinsDisplayText);
    this._coinsDisplayText.x = app.view.width / 2 - 525;
    this._coinsDisplayText.y = 930;

    // Spin Btn Box and Text
    const spinBtnShadow = new PIXI.Graphics();
    spinBtnShadow
      .beginFill(0x222222, 0.4)
      .drawCircle(app.view.width / 2 + 9, 920 + 9, 105);
    app.stage.addChild(spinBtnShadow);

    this._spinBtn = new PIXI.Graphics();
    this._spinBtn
      .beginFill(bottomRectBackgroundColors)
      .lineStyle(3, 0xffffff, 1)
      .drawCircle(app.view.width / 2, 920, 105);
    this._spinBtn.buttonMode = true;
    app.stage.addChild(this._spinBtn);

    const spinBtnText = new PIXI.Text("Spin!", style);
    this._spinBtn.addChild(spinBtnText);
    spinBtnText.x = app.view.width / 2 - 50;
    spinBtnText.y = 890;

    // Wager Display and Change Wager Btns Boxes and Texts.
    const decreaseWagerBtnShadow = new PIXI.Graphics();
    decreaseWagerBtnShadow
      .beginFill(0x222222, 0.4)
      .drawRect(app.view.width / 2 + 303 + 9, 850 + 9, 100, 150);
    app.stage.addChild(decreaseWagerBtnShadow);

    this._decreaseWagerBtn = new PIXI.Graphics();
    this._decreaseWagerBtn
      .beginFill(bottomRectBackgroundColors)
      .lineStyle(3, 0xffffff, 1)
      .drawRect(app.view.width / 2 + 303, 850, 100, 150);
    this._decreaseWagerBtn.buttonMode = true;
    app.stage.addChild(this._decreaseWagerBtn);

    const decreaseWagerBtnText = new PIXI.Text("-", style);
    this._decreaseWagerBtn.addChild(decreaseWagerBtnText);
    decreaseWagerBtnText.x = app.view.width / 2 + 340;
    decreaseWagerBtnText.y = 900;

    const wagerDisplayShadow = new PIXI.Graphics();
    wagerDisplayShadow
      .beginFill(0x222222, 0.4)
      .drawRect(app.view.width / 2 + 407 + 9, 850 + 9, 200, 150);
    app.stage.addChild(wagerDisplayShadow);

    const wagerDisplay = new PIXI.Graphics();
    wagerDisplay
      .beginFill(bottomRectBackgroundColors)
      .lineStyle(3, 0xffffff, 1)
      .drawRect(app.view.width / 2 + 407, 850, 200, 150);
    app.stage.addChild(wagerDisplay);

    const wagerHeadingText = new PIXI.Text("Wager", style);
    wagerDisplay.addChild(wagerHeadingText);
    wagerHeadingText.x = app.view.width / 2 + 450;
    wagerHeadingText.y = 870;

    this._wagerDisplayText = new PIXI.Text("1", style);
    wagerDisplay.addChild(this._wagerDisplayText);
    this._wagerDisplayText.x = app.view.width / 2 + 490;
    this._wagerDisplayText.y = 930;

    const increaseWagerBtnShadow = new PIXI.Graphics();
    increaseWagerBtnShadow
      .beginFill(0x222222, 0.4)
      .drawRect(app.view.width / 2 + 610 + 9, 850 + 9, 100, 150);
    app.stage.addChild(increaseWagerBtnShadow);

    this._increaseWagerBtn = new PIXI.Graphics();
    this._increaseWagerBtn
      .beginFill(bottomRectBackgroundColors)
      .lineStyle(3, 0xffffff, 1)
      .drawRect(app.view.width / 2 + 610, 850, 100, 150);
    this._increaseWagerBtn.buttonMode = true;
    app.stage.addChild(this._increaseWagerBtn);

    const increaseWagerBtnText = new PIXI.Text("+", style);
    this._increaseWagerBtn.addChild(increaseWagerBtnText);
    increaseWagerBtnText.x = app.view.width / 2 + 643;
    increaseWagerBtnText.y = 900;
  }

  addIncreaseWagerHandler(handler) {
    this._increaseWagerBtn.interactive = true;
    this._increaseWagerBtn.on("pointerdown", () => handler());
  }

  addDecreaseWagerHandler(handler) {
    this._decreaseWagerBtn.interactive = true;
    this._decreaseWagerBtn.on("pointerdown", () => handler());
  }

  addSpinHandler(handler) {
    this._spinBtn.interactive = true;
    this._spinBtn.on("pointerdown", () => handler());
  }

  updateWager(wagerValue) {
    this._wagerDisplayText.text = wagerValue;
  }

  updateCoins(coinsValue) {
    this._coinsDisplayText.text = coinsValue;
  }

  slideSymbolsOut(currSymbolsArr) {
    const self = this;
    currSymbolsArr.forEach(function (s) {
      gsap.to(s, {
        duration: self._SYMBOL_SLIDE_OUT_DURATION,
        y: -60,
      });
    });
  }

  updateSymbols(
    res,
    reelContainersArr,
    currSymbolsArr,
    symbolsPathArr,
    handler
  ) {
    const self = this;

    setTimeout(function () {
      reelContainersArr.forEach(function (r, i) {
        // REMOVING SYMBOLS FROM REELS
        const singleReel = r;
        singleReel.removeChild(currSymbolsArr[0]);
        currSymbolsArr.shift();

        // ADD NEW SYMBOLS
        const symbolNumber = res.symbolIDs[i];
        const symbol = new PIXI.spine.Spine(symbolsPathArr[symbolNumber]);
        symbol.y = self._SYMBOL_SIZE + 100;
        symbol.scale.x = 1.1;
        symbol.scale.y = 1.1;
        symbol.x = self._REEL_WIDTH / 2;
        singleReel.addChild(symbol);
        gsap.from(symbol, {
          duration: self._SYMBOL_SLIDE_DURATION,
          y: self._SYMBOL_SLIDE_POSITION,
          ease: self._SYMBOL_SLIDE_EASE,
        });
        handler(symbol);
      });
    }, this._SYMBOL_SLIDE_OUT_DURATION * 1000);
  }

  checkForWin(res, handler) {
    const self = this;
    setTimeout(function () {
      if (res.win === 0) {
        setTimeout(function () {
          self.btnsBlock = false;
        }, 700);
        return;
      }
      if (res.win > 0) {
        handler(res.win);
      }
    }, this._SYMBOL_SLIDE_DURATION * 1000 - 700);
  }

  animateMultiplierBoxes(multiplierBoxesToAnimate) {
    multiplierBoxesToAnimate.forEach((b, i) => {
      const tl = gsap.timeline();
      if (i === 0) {
        tl.to(b, {
          duration: 0.55,
          x: 80,
          ease: "power2",
        });
        tl.to(b, {
          duration: 0.55,
          x: 200,
          ease: "power2",
        });
      }
      if (i === 1) {
        tl.to(b, {
          duration: 0.55,
          x: 1720,
          ease: "power2",
        });
        tl.to(b, {
          duration: 0.55,
          x: 1600,
          ease: "power2",
        });
      }
    });
  }

  animateWinningSymbols(symbolsToAnimateArr) {
    const self = this;
    symbolsToAnimateArr.forEach(function (s) {
      s.state.setAnimation(1, "win", false);
    });

    setTimeout(function () {
      self.btnsBlock = false;
    }, 2000);
  }
}

export default new View();
