'use strict';

function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var WebPlatform = (function () {
    function WebPlatform() {
        this.name = "WEB";
        this.Image = Image;
        this.Promise = Promise;
        this.buffers = [];
    }
    WebPlatform.prototype.getBuffer = function (width, height, clear) {
        var cvs;
        if (this.buffers.length) {
            if (width) {
                for (var i = 0; i < this.buffers.length; i++) {
                    if (this.buffers[i].width === width && this.buffers[i].height === height) {
                        cvs = this.buffers.splice(i, 1)[0];
                        break;
                    }
                }
            }
            else {
                cvs = this.buffers.pop();
            }
            if (cvs) {
                if (clear) {
                    cvs.getContext("2d").clearRect(0, 0, cvs.width, cvs.height);
                }
                return cvs;
            }
        }
        cvs = document.createElement("canvas");
        if (width) {
            cvs.width = width;
            cvs.height = height;
        }
        return cvs;
    };
    WebPlatform.prototype.freeBuffer = function (buffer) {
        this.buffers.push(buffer);
    };
    WebPlatform.prototype.loadAsset = function (img, url, loaded, error) {
        img.crossOrigin = "Anonymous";
        img.addEventListener("load", loaded);
        img.addEventListener("error", error);
        img.src = url;
    };
    WebPlatform.prototype.requestAnimationFrame = function (cb) {
        window.requestAnimationFrame(cb);
    };
    return WebPlatform;
}());

var CardClass;
(function (CardClass) {
    CardClass[CardClass["INVALID"] = 0] = "INVALID";
    CardClass[CardClass["DEATHKNIGHT"] = 1] = "DEATHKNIGHT";
    CardClass[CardClass["DRUID"] = 2] = "DRUID";
    CardClass[CardClass["HUNTER"] = 3] = "HUNTER";
    CardClass[CardClass["MAGE"] = 4] = "MAGE";
    CardClass[CardClass["PALADIN"] = 5] = "PALADIN";
    CardClass[CardClass["PRIEST"] = 6] = "PRIEST";
    CardClass[CardClass["ROGUE"] = 7] = "ROGUE";
    CardClass[CardClass["SHAMAN"] = 8] = "SHAMAN";
    CardClass[CardClass["WARLOCK"] = 9] = "WARLOCK";
    CardClass[CardClass["WARRIOR"] = 10] = "WARRIOR";
    CardClass[CardClass["DREAM"] = 11] = "DREAM";
    CardClass[CardClass["NEUTRAL"] = 12] = "NEUTRAL";
})(CardClass || (CardClass = {}));
var Race;
(function (Race) {
    Race[Race["INVALID"] = 0] = "INVALID";
    Race[Race["MURLOC"] = 14] = "MURLOC";
    Race[Race["DEMON"] = 15] = "DEMON";
    Race[Race["MECHANICAL"] = 17] = "MECHANICAL";
    Race[Race["ELEMENTAL"] = 18] = "ELEMENTAL";
    Race[Race["PET"] = 20] = "PET";
    Race[Race["BEAST"] = 20] = "BEAST";
    Race[Race["TOTEM"] = 21] = "TOTEM";
    Race[Race["PIRATE"] = 23] = "PIRATE";
    Race[Race["DRAGON"] = 24] = "DRAGON";
})(Race || (Race = {}));
var Rarity;
(function (Rarity) {
    Rarity[Rarity["INVALID"] = 0] = "INVALID";
    Rarity[Rarity["COMMON"] = 1] = "COMMON";
    Rarity[Rarity["FREE"] = 2] = "FREE";
    Rarity[Rarity["RARE"] = 3] = "RARE";
    Rarity[Rarity["EPIC"] = 4] = "EPIC";
    Rarity[Rarity["LEGENDARY"] = 5] = "LEGENDARY";
})(Rarity || (Rarity = {}));
var MultiClassGroup;
(function (MultiClassGroup) {
    MultiClassGroup[MultiClassGroup["INVALID"] = 0] = "INVALID";
    MultiClassGroup[MultiClassGroup["GRIMY_GOONS"] = 1] = "GRIMY_GOONS";
    MultiClassGroup[MultiClassGroup["JADE_LOTUS"] = 2] = "JADE_LOTUS";
    MultiClassGroup[MultiClassGroup["KABAL"] = 3] = "KABAL";
})(MultiClassGroup || (MultiClassGroup = {}));
var CardSet;
(function (CardSet) {
    CardSet[CardSet["INVALID"] = 0] = "INVALID";
    CardSet[CardSet["CORE"] = 2] = "CORE";
    CardSet[CardSet["EXPERT1"] = 3] = "EXPERT1";
    CardSet[CardSet["HOF"] = 4] = "HOF";
    CardSet[CardSet["NAXX"] = 12] = "NAXX";
    CardSet[CardSet["GVG"] = 13] = "GVG";
    CardSet[CardSet["BRM"] = 14] = "BRM";
    CardSet[CardSet["TGT"] = 15] = "TGT";
    CardSet[CardSet["LOE"] = 20] = "LOE";
    CardSet[CardSet["KARA"] = 23] = "KARA";
    CardSet[CardSet["OG"] = 21] = "OG";
    CardSet[CardSet["GANGS"] = 25] = "GANGS";
    CardSet[CardSet["UNGORO"] = 27] = "UNGORO";
    CardSet[CardSet["ICECROWN"] = 1001] = "ICECROWN";
})(CardSet || (CardSet = {}));
var CardType;
(function (CardType) {
    CardType[CardType["INVALID"] = 0] = "INVALID";
    CardType[CardType["HERO"] = 3] = "HERO";
    CardType[CardType["MINION"] = 4] = "MINION";
    CardType[CardType["SPELL"] = 5] = "SPELL";
    CardType[CardType["WEAPON"] = 7] = "WEAPON";
    CardType[CardType["HERO_POWER"] = 10] = "HERO_POWER";
})(CardType || (CardType = {}));

function cleanEnum(val, e) {
    if (typeof val === "string") {
        if (val in e) {
            return e[val];
        }
        else {
            return e.INVALID;
        }
    }
    return val || 0;
}

/**
 * Helper function to draw a polygon from a list of points.
 */
function drawPolygon(context, points, ratio) {
    if (points.length < 3) {
        return;
    }
    context.beginPath();
    // move to start point
    context.moveTo(points[0].x * ratio, points[0].y * ratio);
    // draw the lines starting at index 1
    points.slice(1).forEach(function (pt) {
        context.lineTo(pt.x * ratio, pt.y * ratio);
    });
    context.closePath();
    context.stroke();
}
/**
 * Get the bounding box of a canvas content.
 * @returns {{x: *, y: *, maxX: (number|*|w), maxY: *, w: number, h: number}}
 */
function contextBoundingBox(context) {
    var w = context.canvas.width;
    var h = context.canvas.height;
    var data = context.getImageData(0, 0, w, h).data;
    var minX = 999;
    var minY = 999;
    var maxX = 0;
    var maxY = 0;
    var out = false;
    for (var y = h - 1; y > -1; y--) {
        if (out) {
            break;
        }
        for (var x = 0; x < w; x++) {
            if (data[y * (w * 4) + x * 4 + 3] > 0) {
                maxY = Math.max(maxY, y);
                out = true;
                break;
            }
        }
    }
    if (maxY === undefined) {
        return null;
    }
    out2: for (var x = w - 1; x > -1; x--) {
        for (var y = 0; y < h; y++) {
            if (data[y * (w * 4) + x * 4 + 3] > 0) {
                maxX = Math.max(maxX, x);
                break out2;
            }
        }
    }
    out3: for (var x = 0; x < maxX; x++) {
        for (var y = 0; y < h; y++) {
            if (data[y * (w * 4) + x * 4 + 3] > 0) {
                minX = Math.min(x, minX);
                break out3;
            }
        }
    }
    out4: for (var y = 0; y < maxY; y++) {
        for (var x = 0; x < w; x++) {
            if (data[y * (w * 4) + x * 4 + 3] > 0) {
                minY = Math.min(minY, y);
                break out4;
            }
        }
    }
    return {
        x: minX,
        y: minY,
        maxX: maxX,
        maxY: maxY,
        w: maxX - minX,
        h: maxY - minY,
    };
}
function getNumberStyle(style) {
    switch (style) {
        case "-":
            return "#f00";
        case "+":
            return "#0f0";
        default:
            return "white";
    }
}
/**
 * Finishes a text line and starts a new one.
 */
function finishLine(bufferTextCtx, bufferRow, bufferRowCtx, xPos, yPos, totalWidth) {
    var xCalc = totalWidth / 2 - xPos / 2;
    if (xCalc < 0) {
        xCalc = 0;
    }
    if (xPos > 0 && bufferRow.width > 0) {
        bufferTextCtx.drawImage(bufferRow, 0, 0, xPos > bufferRow.width ? bufferRow.width : xPos, bufferRow.height, xCalc, yPos, Math.min(xPos, bufferRow.width), bufferRow.height);
    }
    xPos = 5;
    yPos += bufferRow.height;
    bufferRowCtx.clearRect(0, 0, bufferRow.width, bufferRow.height);
    return [xPos, yPos];
}
/**
 * Parses the beginning of a string, looking for a bold or italic tag.
 */
function parseNextToken(s) {
    var token;
    if (s[1] === "/") {
        token = s.slice(0, 4);
        if (token === "</b>") {
            return { token: token, bold: -1, italic: 0 };
        }
        else if (token === "</i>") {
            return { token: token, bold: 0, italic: -1 };
        }
    }
    else {
        token = s.slice(0, 3);
        if (token === "<b>") {
            return { token: token, bold: 1, italic: 0 };
        }
        else if (token === "<i>") {
            return { token: token, bold: 0, italic: -1 };
        }
    }
    return { token: "", bold: 0, italic: 0 };
}
/**
 * Given a curve and t, the function returns the point on the curve.
 * r is the rotation of the point in radians.
 * @returns {{x: (number|*), y: (number|*), r: number}}
 */
function getPointOnCurve(curve, t) {
    var rX = 3 * Math.pow(1 - t, 2) * (curve[1].x - curve[0].x) +
        6 * (1 - t) * t * (curve[2].x - curve[1].x) +
        3 * Math.pow(t, 2) * (curve[3].x - curve[2].x);
    var rY = 3 * Math.pow(1 - t, 2) * (curve[1].y - curve[0].y) +
        6 * (1 - t) * t * (curve[2].y - curve[1].y) +
        3 * Math.pow(t, 2) * (curve[3].y - curve[2].y);
    var x = Math.pow(1 - t, 3) * curve[0].x +
        3 * Math.pow(1 - t, 2) * t * curve[1].x +
        3 * (1 - t) * Math.pow(t, 2) * curve[2].x +
        Math.pow(t, 3) * curve[3].x;
    var y = Math.pow(1 - t, 3) * curve[0].y +
        3 * Math.pow(1 - t, 2) * t * curve[1].y +
        3 * (1 - t) * Math.pow(t, 2) * curve[2].y +
        Math.pow(t, 3) * curve[3].y;
    return { x: x, y: y, r: Math.atan2(rY, rX) };
}
var RaceNames = {};
RaceNames[Race.MURLOC] = { enUS: "Murloc" };
RaceNames[Race.MECHANICAL] = { enUS: "Mech" };
RaceNames[Race.ELEMENTAL] = { enUS: "Elemental" };
RaceNames[Race.BEAST] = { enUS: "Beast" };
RaceNames[Race.DEMON] = { enUS: "Demon" };
RaceNames[Race.PIRATE] = { enUS: "Pirate" };
RaceNames[Race.DRAGON] = { enUS: "Dragon" };
RaceNames[Race.TOTEM] = { enUS: "Totem" };
var ReferenceWidth = 670;
var ReferenceHeight = 1000;
var Card = (function () {
    function Card(sunwell, props) {
        this.sunwell = sunwell;
        if (!props) {
            throw new Error("No card properties given");
        }
        this.type = props.type;
        this.cost = props.cost || 0;
        this.attack = props.attack || 0;
        this.health = props.health || 0;
        this.costsHealth = props.costsHealth || false;
        this.hideStats = props.hideStats;
        this.language = props.language || "enUS";
        this.name = props.name || "";
        this.multiClassGroup = cleanEnum(props.multiClassGroup, MultiClassGroup);
        this.type = cleanEnum(props.type, CardType);
        this.race = cleanEnum(props.race, Race);
        var set = cleanEnum(props.set, CardSet);
        this.set = this.getCardSet(set);
        var rarity = cleanEnum(props.rarity, Rarity);
        this.rarity = this.getRarityGem(rarity, set, this.type);
        var cardClass = cleanEnum(props.cardClass, CardClass);
        this.cardClass = this.getCardFrameClass(cardClass);
        if (this.type === CardType.MINION) {
            this.raceText = props.raceText || this.getRaceText();
            this.silenced = props.silenced || false;
        }
        if (this.type === CardType.WEAPON && props.durability) {
            // Weapons alias health to durability
            this.health = props.durability;
        }
        else if (this.type === CardType.HERO && props.armor) {
            // Hero health gem is Armor
            this.health = props.armor;
        }
        // This only needs to change for HeroPower
        this.costTextCoords = { x: 115, y: 174 };
        // Sets the player or opponent HeroPower texture
        this.opposing = props.opposing || false;
        this.elite = props.elite || false;
        this.costColor = getNumberStyle(props.costStyle);
        this.attackColor = getNumberStyle(props.costStyle);
        this.healthColor = getNumberStyle(props.healthStyle);
        this.bodyText = props.collectionText || props.text || "";
        this.titleFont = sunwell.options.titleFont;
        this.texture = props.texture;
        this.propsJson = JSON.stringify(props);
    }
    Card.prototype.initRender = function (width, target, callback) {
        this.width = width;
        this.target = target;
        this.callback = callback;
        this.cacheKey = this.checksum();
        this.key = this.cacheKey;
        this.updateAssets();
    };
    Card.prototype.getAssetsToLoad = function () {
        var assetsToLoad = [this.cardFrameAsset];
        if (this.cardFoundationAsset) {
            assetsToLoad.push(this.cardFoundationAsset);
        }
        if (this.costGemAsset) {
            assetsToLoad.push(this.costGemAsset);
        }
        if (this.nameBannerAsset) {
            assetsToLoad.push(this.nameBannerAsset);
        }
        if (!this.hideStats) {
            if (this.attackGemAsset) {
                assetsToLoad.push(this.attackGemAsset);
            }
            if (this.healthGemAsset) {
                assetsToLoad.push(this.healthGemAsset);
            }
        }
        if (this.elite && this.dragonAsset) {
            assetsToLoad.push(this.dragonAsset);
        }
        if (this.raceText) {
            assetsToLoad.push(this.raceBannerAsset);
        }
        if (this.silenced) {
            assetsToLoad.push("silence-x");
        }
        if (this.multiBannerAsset) {
            assetsToLoad.push(this.multiBannerAsset);
        }
        if (this.rarityGemAsset) {
            assetsToLoad.push(this.rarityGemAsset);
        }
        if (this.watermarkAsset) {
            assetsToLoad.push(this.watermarkAsset);
        }
        return assetsToLoad;
    };
    Card.prototype.getCardArtTexture = function () {
        if (!this.texture) {
            this.sunwell.log("No card texture specified. Creating empty texture.");
            return this.sunwell.getBuffer(1024, 1024);
        }
        else if (this.texture instanceof this.sunwell.platform.Image) {
            return this.texture;
        }
        else if (typeof this.texture === "string") {
            return this.sunwell.assets[this.texture];
        }
        else {
            var t = this.sunwell.getBuffer(this.texture.crop.w, this.texture.crop.h);
            var tCtx = t.getContext("2d");
            tCtx.drawImage(this.texture.image, this.texture.crop.x, this.texture.crop.y, this.texture.crop.w, this.texture.crop.h, 0, 0, t.width, t.height);
            return t;
        }
    };
    Card.prototype.getRaceText = function () {
        if (this.race && this.type === CardType.MINION && this.race in RaceNames) {
            return RaceNames[this.race][this.language];
        }
        return "";
    };
    Card.prototype.draw = function (canvas, context) {
        var _this = this;
        var ratio = this.width / ReferenceWidth;
        var drawTimeout = setTimeout(function () {
            _this.sunwell.error("Drawing timed out", _this.name);
        }, this.sunwell.options.drawTimeout);
        context.save();
        context.clearRect(0, 0, canvas.width, canvas.height);
        // >>>>> Begin Skeleton drawing
        if (this.sunwell.renderCache[this.cacheKey]) {
            this.sunwell.log("Skipping skeleton draw");
            context.drawImage(this.sunwell.renderCache[this.cacheKey], 0, 0);
        }
        else {
            this.drawCardArt(context, ratio);
            if (this.cardFoundationAsset) {
                this.drawCardFoundationAsset(context, ratio);
            }
            this.drawFrameTexture(context, ratio);
            if (this.multiBannerAsset) {
                this.drawImage(context, this.multiBannerAsset, {
                    dx: 50,
                    dy: 119,
                    ratio: ratio,
                });
            }
            if (this.costGemAsset) {
                this.drawCostGem(context, ratio);
            }
            if (this.rarityGemAsset) {
                this.drawRarityGem(context, ratio);
            }
            if (this.nameBannerAsset) {
                this.drawNameBanner(context, ratio);
            }
            if (this.raceText) {
                this.drawRaceBanner(context, ratio);
            }
            this.drawAttackTexture(context, ratio);
            this.drawHealthTexture(context, ratio);
            if (this.elite && this.dragonAsset) {
                var coords = this.dragonCoords;
                coords.ratio = ratio;
                this.drawImage(context, this.dragonAsset, coords);
            }
            if (this.watermarkAsset) {
                this.drawWatermark(context, ratio);
            }
            if (this.sunwell.options.cacheSkeleton) {
                var cacheImage = new this.sunwell.platform.Image();
                cacheImage.src = canvas.toDataURL();
                this.sunwell.renderCache[this.cacheKey] = cacheImage;
            }
        }
        // <<<<<<<< Finished Skeleton drawing
        this.drawName(context, ratio, this.name);
        this.drawStats(context, ratio);
        if (this.raceText) {
            this.drawRaceText(context, ratio, this.raceText);
        }
        this.drawBodyText(context, ratio, false, this.bodyText);
        if (this.silenced) {
            this.drawImage(context, "silence-x", { dx: 166, dy: 584, ratio: ratio });
        }
        context.restore();
        clearTimeout(drawTimeout);
        if (this.callback) {
            this.callback(canvas);
        }
        if (this.target) {
            this.target.src = canvas.toDataURL();
        }
    };
    Card.prototype.drawCardArt = function (context, ratio) {
        var t = this.getCardArtTexture();
        context.save();
        drawPolygon(context, this.artClipPolygon, ratio);
        context.clip();
        context.fillStyle = "grey";
        context.fillRect(0, 0, ReferenceWidth * ratio, ReferenceHeight * ratio);
        context.drawImage(t, 0, 0, t.width, t.height, this.artCoords.dx * ratio, this.artCoords.dy * ratio, this.artCoords.dWidth * ratio, this.artCoords.dHeight * ratio);
        context.restore();
    };
    Card.prototype.drawBodyText = function (context, s, forceSmallerFirstLine, text) {
        var _this = this;
        var manualBreak = text.substr(0, 3) === "[x]";
        var bodyText = manualBreak ? text.substr(3) : text;
        if (!bodyText) {
            return;
        }
        var pluralRegex = /(\d+)(.+?)\|4\((.+?),(.+?)\)/g;
        var xPos = 0;
        var yPos = 0;
        var italic = 0;
        var bold = 0;
        var lineCount = 0;
        var justLineBreak;
        var plurals;
        var pBodyText;
        // size of the description text box
        var bodyWidth = this.bodyTextCoords.dWidth;
        var bodyHeight = this.bodyTextCoords.dHeight;
        // center of description box (x, y)
        var centerLeft = this.bodyTextCoords.dx + bodyWidth / 2;
        var centerTop = this.bodyTextCoords.dy + bodyHeight / 2;
        // draw the text box in debug mode
        if (this.sunwell.options.debug) {
            context.save();
            context.strokeStyle = "red";
            context.beginPath();
            context.rect((centerLeft - bodyWidth / 2) * s, (centerTop - bodyHeight / 2) * s, bodyWidth * s, bodyHeight * s);
            context.closePath();
            context.stroke();
            context.restore();
        }
        pBodyText = bodyText;
        while ((plurals = pluralRegex.exec(bodyText)) !== null) {
            pBodyText = pBodyText.replace(plurals[0], plurals[1] + plurals[2] + (parseInt(plurals[1], 10) === 1 ? plurals[3] : plurals[4]));
        }
        bodyText = pBodyText;
        this.sunwell.log("Rendering body", bodyText);
        var words = bodyText
            .replace(/[\$#_]/g, "")
            .replace(/\n/g, " \n ")
            .replace(/ +/g, " ")
            .split(/ /g);
        var bufferText = this.sunwell.getBuffer(bodyWidth, bodyHeight, true);
        var bufferTextCtx = bufferText.getContext("2d");
        bufferTextCtx.fillStyle = this.bodyTextColor;
        var fontSize = this.sunwell.options.bodyFontSize;
        var lineHeight = this.sunwell.options.bodyLineHeight;
        var totalLength = bodyText.replace(/<\/*.>/g, "").length;
        var smallerFirstLine = false;
        var cleanText = bodyText.replace(/<\/*.>/g, "");
        this.sunwell.log("counting length of " + cleanText);
        this.sunwell.log("Length is " + totalLength);
        var bufferRow = this.sunwell.getBuffer(bufferText.width, lineHeight, true);
        var bufferRowCtx = bufferRow.getContext("2d");
        bufferRowCtx.fillStyle = this.bodyTextColor;
        // bufferRowCtx.textBaseline = this.sunwell.options.bodyBaseline;
        if (manualBreak) {
            var maxWidth_1 = 0;
            bufferRowCtx.font = this.getFontMaterial(fontSize, false, false);
            bodyText.split("\n").forEach(function (line) {
                var width = _this.getLineWidth(bufferRowCtx, fontSize, line);
                if (width > maxWidth_1) {
                    maxWidth_1 = width;
                }
            });
            if (maxWidth_1 > bufferText.width) {
                var ratio = bufferText.width / maxWidth_1;
                fontSize *= ratio;
                lineHeight *= ratio;
            }
        }
        else {
            if (totalLength >= 65) {
                fontSize = this.sunwell.options.bodyFontSize * 0.95;
                lineHeight = this.sunwell.options.bodyLineHeight * 0.95;
            }
            if (totalLength >= 80) {
                fontSize = this.sunwell.options.bodyFontSize * 0.9;
                lineHeight = this.sunwell.options.bodyLineHeight * 0.9;
            }
            if (totalLength >= 100) {
                fontSize = this.sunwell.options.bodyFontSize * 0.8;
                lineHeight = this.sunwell.options.bodyLineHeight * 0.8;
            }
        }
        bufferRowCtx.font = this.getFontMaterial(fontSize, !!bold, !!italic);
        bufferRow.height = lineHeight;
        if (forceSmallerFirstLine || (totalLength >= 75 && this.type === CardType.SPELL)) {
            smallerFirstLine = true;
        }
        for (var _i = 0, words_1 = words; _i < words_1.length; _i++) {
            var word = words_1[_i];
            var cleanWord = word.trim().replace(/<((?!>).)*>/g, "");
            var width = bufferRowCtx.measureText(cleanWord).width;
            this.sunwell.log("Next word:", word);
            if (!manualBreak &&
                (xPos + width > bufferRow.width ||
                    (smallerFirstLine && xPos + width > bufferRow.width * 0.8)) &&
                !justLineBreak) {
                this.sunwell.log(xPos + width, ">", bufferRow.width);
                this.sunwell.log("Calculated line break");
                smallerFirstLine = false;
                justLineBreak = true;
                lineCount++;
                _a = finishLine(bufferTextCtx, bufferRow, bufferRowCtx, xPos, yPos, bufferText.width), xPos = _a[0], yPos = _a[1];
            }
            if (word === "\n") {
                this.sunwell.log("Manual line break");
                lineCount++;
                _b = finishLine(bufferTextCtx, bufferRow, bufferRowCtx, xPos, yPos, bufferText.width), xPos = _b[0], yPos = _b[1];
                justLineBreak = true;
                smallerFirstLine = false;
                continue;
            }
            justLineBreak = false;
            for (var j = 0; j < word.length; j++) {
                var char = word[j];
                if (char === "<") {
                    var pr = parseNextToken(word.slice(j));
                    if (pr.token) {
                        j += pr.token.length - 1;
                        bold += pr.bold;
                        italic += pr.italic;
                        continue;
                    }
                }
                // TODO investigate why the following two properites are being reset, for web
                // likely something to do with getLineWidth()
                bufferRowCtx.fillStyle = this.bodyTextColor;
                // move to here from pr.token block above,
                // text without markup ends up being default font otherwise
                bufferRowCtx.font = this.getFontMaterial(fontSize, !!bold, !!italic);
                bufferRowCtx.fillText(char, xPos + this.sunwell.options.bodyFontOffset.x, this.sunwell.options.bodyFontOffset.y);
                xPos += bufferRowCtx.measureText(char).width;
            }
            var em = bufferRowCtx.measureText("M").width;
            xPos += 0.275 * em;
        }
        lineCount++;
        finishLine(bufferTextCtx, bufferRow, bufferRowCtx, xPos, yPos, bufferText.width);
        this.sunwell.freeBuffer(bufferRow);
        if (this.type === CardType.SPELL && lineCount === 4) {
            if (!smallerFirstLine && !forceSmallerFirstLine) {
                this.drawBodyText(context, s, true, this.bodyText);
                return;
            }
        }
        var b = contextBoundingBox(bufferTextCtx);
        b.h = Math.ceil(b.h / bufferRow.height) * bufferRow.height;
        context.drawImage(bufferText, b.x, b.y - 2, b.w, b.h, (centerLeft - b.w / 2) * s, (centerTop - b.h / 2) * s, b.w * s, (b.h + 2) * s);
        this.sunwell.freeBuffer(bufferText);
        var _a, _b;
    };
    Card.prototype.drawName = function (context, ratio, name) {
        // define a box to contain the curved text
        var boxDims = { width: 460, height: 160 };
        var boxBottomCenter = { x: 335, y: 612 };
        // create a new buffer to draw onto
        var buffer = this.sunwell.getBuffer(boxDims.width * 2, boxDims.height, true);
        var textContext = buffer.getContext("2d");
        var maxWidth = this.nameTextCurve.maxWidth;
        var curve = this.nameTextCurve.curve;
        textContext.save();
        if (this.sunwell.options.debug) {
            textContext.lineWidth = 2;
            textContext.strokeStyle = "blue";
            textContext.fillStyle = "red";
            // draw the curve
            textContext.beginPath();
            textContext.moveTo(curve[0].x, curve[0].y);
            textContext.bezierCurveTo(curve[1].x, curve[1].y, curve[2].x, curve[2].y, curve[3].x, curve[3].y);
            textContext.stroke();
            // draw the control points
            for (var _i = 0, curve_1 = curve; _i < curve_1.length; _i++) {
                var point = curve_1[_i];
                textContext.fillRect(point.x - 4, point.y - 4, 8, 8);
            }
            textContext.restore();
        }
        textContext.lineWidth = 10;
        textContext.strokeStyle = "black";
        textContext.lineCap = "round";
        textContext.lineJoin = "round";
        textContext.textAlign = "left";
        textContext.textBaseline = "middle";
        // calculate text width
        var getCharDimensions = function () {
            var dim = [];
            var em = textContext.measureText("M").width;
            for (var i = 0; i < name.length; i++) {
                textContext.save();
                var char = name[i];
                var scale = { x: 1, y: 1 };
                var charWidth = textContext.measureText(char).width + 0.1 * em;
                switch (char) {
                    case " ":
                        charWidth = 0.2 * em;
                        break;
                    case "'":// see "Death's Bite"
                        charWidth = 0.27 * em;
                        scale.x = 0.5;
                        scale.y = 1;
                        break;
                }
                dim[i] = {
                    width: charWidth,
                    scale: scale,
                };
                textContext.restore();
            }
            return dim;
        };
        var fontSize = 45;
        var dimensions = [];
        do {
            fontSize -= 1;
            textContext.font = fontSize + "px " + this.titleFont;
        } while ((dimensions = getCharDimensions()).reduce(function (a, b) { return a + b.width; }, 0) > maxWidth &&
            fontSize > 10);
        var textWidth = dimensions.reduce(function (a, b) { return a + b.width; }, 0) / maxWidth;
        var begin = this.nameTextCurve.pathMiddle - textWidth / 2;
        var steps = textWidth / name.length;
        // draw text
        var p;
        var t;
        var leftPos = 0;
        for (var i = 0; i < name.length; i++) {
            var char = name[i].trim();
            var dimension = dimensions[i];
            if (leftPos === 0) {
                t = begin + steps * i;
                p = getPointOnCurve(curve, t);
                leftPos = p.x;
            }
            else {
                t += 0.01;
                p = getPointOnCurve(curve, t);
                while (p.x < leftPos) {
                    t += 0.001;
                    p = getPointOnCurve(curve, t);
                }
            }
            if (char.length) {
                textContext.save();
                textContext.translate(p.x, p.y);
                if (dimension.scale.x) {
                    textContext.scale(dimension.scale.x, dimension.scale.y);
                }
                // textContext.setTransform(1.2, p.r, 0, 1, p.x, p.y);
                textContext.rotate(p.r);
                // shadow
                textContext.lineWidth = 9 * (fontSize / 50);
                textContext.strokeStyle = "black";
                textContext.fillStyle = "black";
                textContext.fillText(char, 0, 0);
                textContext.strokeText(char, 0, 0);
                // text
                textContext.fillStyle = "white";
                textContext.strokeStyle = "white";
                textContext.lineWidth = 2.5 * (fontSize / 50);
                textContext.fillText(char, 0, 0);
                textContext.restore();
            }
            leftPos += dimension.width;
        }
        var coords = {
            sx: 0,
            sy: 0,
            sWidth: boxDims.width,
            sHeight: boxDims.height,
            dx: (boxBottomCenter.x - boxDims.width / 2) * ratio,
            dy: (boxBottomCenter.y - boxDims.height) * ratio,
            dWidth: boxDims.width * ratio,
            dHeight: boxDims.height * ratio,
        };
        context.drawImage(buffer, coords.sx, coords.sy, coords.sWidth, coords.sHeight, coords.dx, coords.dy, coords.dWidth, coords.dHeight);
        this.sunwell.freeBuffer(buffer);
    };
    Card.prototype.drawNameBanner = function (context, ratio) {
        var coords = this.nameBannerCoords;
        coords.ratio = ratio;
        this.drawImage(context, this.nameBannerAsset, coords);
    };
    Card.prototype.drawRaceBanner = function (context, ratio) {
        var coords = this.raceBannerCoords;
        coords.ratio = ratio;
        this.drawImage(context, this.raceBannerAsset, coords);
    };
    /**
     * Renders a given number to the defined position.
     * The x/y position should be the position on an unscaled card.
     */
    Card.prototype.drawNumber = function (context, x, y, s, num, size, color) {
        var buffer = this.sunwell.getBuffer(256, 256, true);
        var bufferCtx = buffer.getContext("2d");
        var n = num.toString().split("");
        var tX = 10;
        bufferCtx.font = size + "px " + this.titleFont;
        bufferCtx.lineCap = "round";
        bufferCtx.lineJoin = "round";
        bufferCtx.textAlign = "left";
        bufferCtx.textBaseline = "hanging";
        for (var _i = 0, n_1 = n; _i < n_1.length; _i++) {
            var cnum = n_1[_i];
            bufferCtx.lineWidth = 10;
            bufferCtx.strokeStyle = "black";
            bufferCtx.fillStyle = "black";
            bufferCtx.fillText(cnum, tX, 10);
            bufferCtx.strokeText(cnum, tX, 10);
            bufferCtx.fillStyle = color;
            bufferCtx.strokeStyle = color;
            bufferCtx.lineWidth = 2.5;
            bufferCtx.fillText(cnum, tX, 10);
            // context.strokeText(cnum, x, y);
            tX += bufferCtx.measureText(cnum).width;
        }
        var b = contextBoundingBox(bufferCtx);
        context.drawImage(buffer, b.x, b.y, b.w, b.h, (x - b.w / 2) * s, (y - b.h / 2) * s, b.w * s, b.h * s);
        this.sunwell.freeBuffer(buffer);
    };
    Card.prototype.drawRaceText = function (context, ratio, raceText) {
        var buffer = this.sunwell.getBuffer(300, 60, true);
        var bufferCtx = buffer.getContext("2d");
        var x = 10;
        var text = raceText.split("");
        var textSize = 40;
        bufferCtx.font = textSize + "px " + this.titleFont;
        bufferCtx.lineCap = "round";
        bufferCtx.lineJoin = "round";
        bufferCtx.textBaseline = "hanging";
        bufferCtx.textAlign = "left";
        var xWidth = bufferCtx.measureText("x").width;
        for (var _i = 0, text_1 = text; _i < text_1.length; _i++) {
            var char = text_1[_i];
            bufferCtx.lineWidth = 7;
            bufferCtx.strokeStyle = "black";
            bufferCtx.fillStyle = "black";
            bufferCtx.fillText(char, x, 10);
            bufferCtx.strokeText(char, x, 10);
            bufferCtx.fillStyle = "white";
            bufferCtx.strokeStyle = "white";
            bufferCtx.lineWidth = 1;
            bufferCtx.fillText(char, x, 10);
            // context.strokeText(char, x, y);
            x += bufferCtx.measureText(char).width;
            x += xWidth * 0.1;
        }
        var b = contextBoundingBox(bufferCtx);
        context.drawImage(buffer, b.x, b.y, b.w, b.h, (this.raceTextCoords.dx - b.w / 2) * ratio, (this.raceTextCoords.dy - b.h / 2) * ratio, b.w * ratio, b.h * ratio);
        this.sunwell.freeBuffer(buffer);
    };
    Card.prototype.drawCostGem = function (context, ratio) {
        var pt = { x: 47, y: 105 };
        if (this.costsHealth) {
            pt.x = 43;
            pt.y = 58;
        }
        this.drawImage(context, this.costGemAsset, { dx: pt.x, dy: pt.y, ratio: ratio });
    };
    Card.prototype.drawRarityGem = function (context, ratio) {
        var coords = this.rarityGemCoords;
        coords.ratio = ratio;
        this.drawImage(context, this.rarityGemAsset, coords);
    };
    Card.prototype.drawStats = function (context, ratio) {
        var costTextSize = 130;
        var statTextSize = 124;
        if (this.hideStats) {
            return;
        }
        this.drawNumber(context, this.costTextCoords.x, this.costTextCoords.y, ratio, this.cost, costTextSize, this.costColor);
        if (this.type === CardType.HERO_POWER) {
            return;
        }
        if (this.attackTextCoords) {
            this.drawNumber(context, this.attackTextCoords.x, this.attackTextCoords.y, ratio, this.attack, statTextSize, this.attackColor);
        }
        if (this.healthTextCoords) {
            this.drawNumber(context, this.healthTextCoords.x, this.healthTextCoords.y, ratio, this.health, statTextSize, this.healthColor);
        }
    };
    Card.prototype.drawHealthTexture = function (context, ratio) {
        if (this.hideStats || !this.healthGemAsset) {
            return;
        }
        var coords = this.healthGemCoords;
        coords.ratio = ratio;
        this.drawImage(context, this.healthGemAsset, coords);
    };
    Card.prototype.drawAttackTexture = function (context, ratio) {
        if (this.hideStats || !this.attackGemAsset) {
            return;
        }
        var coords = this.attackGemCoords;
        coords.ratio = ratio;
        this.drawImage(context, this.attackGemAsset, coords);
    };
    Card.prototype.drawFrameTexture = function (context, ratio) {
        var coords = this.baseCardFrameCoords;
        coords.ratio = ratio;
        this.drawImage(context, this.cardFrameAsset, coords);
    };
    Card.prototype.drawCardFoundationAsset = function (context, ratio) {
        var coords = this.cardFoundationCoords;
        coords.ratio = ratio;
        this.drawImage(context, this.cardFoundationAsset, coords);
    };
    Card.prototype.drawWatermark = function (context, ratio) {
        var coords = this.getWatermarkCoords();
        coords.ratio = ratio;
        if (this.type === CardType.HERO_POWER) {
            return;
        }
        else if (this.premium || this.type === CardType.MINION || this.type === CardType.HERO) {
            context.globalCompositeOperation = "multiply";
            context.globalAlpha = 0.6;
        }
        else if (this.type === CardType.SPELL) {
            context.globalCompositeOperation = "multiply";
            context.globalAlpha = 0.7;
        }
        else if (this.type === CardType.WEAPON) {
            context.globalCompositeOperation = "lighten";
            context.globalAlpha = 0.1;
        }
        this.drawImage(context, this.watermarkAsset, coords);
        context.globalCompositeOperation = "source-over";
        context.globalAlpha = 1;
    };
    Card.prototype.getFontMaterial = function (fontSize, bold, italic) {
        var font;
        var prefix = "";
        if (bold) {
            font = this.sunwell.options.bodyFontBold;
            prefix = "bold ";
        }
        else if (italic) {
            font = this.sunwell.options.bodyFontItalic;
            prefix = "italic ";
        }
        else {
            font = this.sunwell.options.bodyFontRegular;
        }
        return "" + prefix + fontSize + "px/1em \"" + font + "\", sans-serif";
    };
    Card.prototype.getLineWidth = function (context, fontSize, line) {
        var width = 0;
        var bold = 0;
        var italic = 0;
        for (var _i = 0, _a = line.split(" "); _i < _a.length; _i++) {
            var word = _a[_i];
            for (var j = 0; j < word.length; j++) {
                var char = word[j];
                if (char === "<") {
                    var pr = parseNextToken(word.slice(j));
                    if (pr.token) {
                        j += pr.token.length - 1;
                        bold += pr.bold;
                        italic += pr.italic;
                        context.font = this.getFontMaterial(fontSize, !!bold, !!italic);
                        continue;
                    }
                }
                context.fillText(char, width + this.sunwell.options.bodyFontOffset.x, this.sunwell.options.bodyFontOffset.y);
                width += context.measureText(char).width;
            }
            width += 0.275 * context.measureText("M").width;
        }
        return width;
    };
    Card.prototype.checksum = function () {
        var s = this.propsJson + this.width + this.premium;
        var length = s.length;
        var chk = 0;
        for (var i = 0; i < length; i++) {
            var char = s.charCodeAt(i);
            chk = (chk << 5) - chk + char;
            chk |= 0;
        }
        return chk;
    };
    Card.prototype.updateAssets = function () {
        if (this.type === CardType.HERO_POWER) {
            this.cardFrameAsset = this.baseCardFrameAsset + (this.opposing ? "opponent" : "player");
        }
        else {
            this.cardFrameAsset = this.baseCardFrameAsset + CardClass[this.cardClass].toLowerCase();
        }
        if (this.rarity && this.baseRarityGemAsset) {
            this.rarityGemAsset = this.baseRarityGemAsset + Rarity[this.rarity].toLowerCase();
        }
        if (this.type === CardType.HERO_POWER) {
            this.costGemAsset = null;
        }
        else if (this.costsHealth) {
            this.costGemAsset = "cost-health";
        }
        else {
            this.costGemAsset = "cost-mana";
        }
        if (this.multiClassGroup) {
            this.multiBannerAsset = "multi-" + MultiClassGroup[this.multiClassGroup].toLowerCase();
        }
        if (this.set) {
            this.watermarkAsset = "set-" + CardSet[this.set].toLowerCase();
        }
    };
    Card.prototype.drawImage = function (context, assetKey, coords) {
        var asset = this.sunwell.getAsset(assetKey);
        if (!asset) {
            this.sunwell.error("Not drawing asset", assetKey);
            return;
        }
        var ratio = coords.ratio || 1;
        var width = coords.sWidth || asset.width;
        var height = coords.sHeight || asset.height;
        context.drawImage(asset, coords.sx || 0, coords.sy || 0, width, height, coords.dx * ratio, coords.dy * ratio, (coords.dWidth || width) * ratio, (coords.dHeight || height) * ratio);
    };
    Card.prototype.getCardFrameClass = function (cardClass) {
        switch (cardClass) {
            case CardClass.DREAM:
                return CardClass.HUNTER;
            case CardClass.INVALID:
                return CardClass.NEUTRAL;
            default:
                return cardClass;
        }
    };
    Card.prototype.getCardSet = function (set) {
        switch (set) {
            case CardSet.EXPERT1:
            case CardSet.NAXX:
            case CardSet.GVG:
            case CardSet.BRM:
            case CardSet.TGT:
            case CardSet.LOE:
            case CardSet.OG:
            case CardSet.KARA:
            case CardSet.GANGS:
            case CardSet.UNGORO:
            case CardSet.ICECROWN:
            case CardSet.HOF:
                return set;
            default:
                return null;
        }
    };
    Card.prototype.getRarityGem = function (rarity, set, type) {
        switch (rarity) {
            case Rarity.INVALID:
            case Rarity.FREE:
                return type === CardType.HERO ? Rarity.COMMON : null;
            case Rarity.COMMON:
                if (set === CardSet.CORE) {
                    return null;
                }
        }
        return rarity;
    };
    return Card;
}());

var HeroCard = (function (_super) {
    __extends(HeroCard, _super);
    function HeroCard(sunwell, props) {
        var _this = _super.call(this, sunwell, props) || this;
        _this.premium = false;
        _this.bodyTextColor = "black";
        _this.bodyTextCoords = {
            dx: 143,
            dy: 627,
            dWidth: 376,
            dHeight: 168,
            sWidth: 376,
            sHeight: 168,
        };
        _this.cardFoundationAsset = null;
        _this.cardFoundationCoords = null;
        _this.baseCardFrameAsset = "frame-hero-";
        _this.baseCardFrameCoords = {
            sWidth: 527,
            sHeight: 795,
            dx: 70,
            dy: 87,
            dWidth: 527,
            dHeight: 795,
        };
        _this.baseRarityGemAsset = "rarity-";
        _this.nameBannerAsset = "name-banner-hero";
        _this.dragonAsset = "elite-hero";
        _this.dragonCoords = {
            sWidth: 444,
            sHeight: 298,
            dx: 172,
            dy: 40,
            dWidth: 444,
            dHeight: 298,
        };
        _this.attackGemAsset = null;
        _this.healthGemAsset = "armor";
        _this.attackGemCoords = null;
        _this.attackTextCoords = null;
        _this.healthGemCoords = {
            sWidth: 115,
            sHeight: 135,
            dx: 498,
            dy: 752,
            dWidth: 115,
            dHeight: 135,
        };
        _this.healthTextCoords = { x: 554, y: 822 };
        _this.nameBannerCoords = {
            sWidth: 490,
            sHeight: 122,
            dx: 91,
            dy: 458,
            dWidth: 490,
            dHeight: 122,
        };
        _this.rarityGemCoords = { dx: 311, dy: 529 };
        _this.raceBannerAsset = null;
        _this.raceBannerCoords = null;
        _this.raceTextCoords = null;
        _this.nameTextCurve = {
            pathMiddle: 0.5,
            maxWidth: 420,
            curve: [{ x: 24, y: 98 }, { x: 170, y: 36 }, { x: 294, y: 36 }, { x: 438, y: 96 }],
        };
        _this.artCoords = {
            sWidth: 346,
            sHeight: 346,
            dx: 161,
            dy: 137,
            dWidth: 346,
            dHeight: 346,
        };
        _this.artClipPolygon = [
            { x: 334, y: 134 },
            { x: 369, y: 143 },
            { x: 406, y: 164 },
            { x: 435, y: 187 },
            { x: 453, y: 213 },
            { x: 469, y: 245 },
            { x: 479, y: 270 },
            { x: 481, y: 290 },
            { x: 483, y: 332 },
            { x: 483, y: 380 },
            { x: 483, y: 438 },
            { x: 484, y: 485 },
            { x: 435, y: 473 },
            { x: 389, y: 467 },
            { x: 346, y: 465 },
            { x: 297, y: 466 },
            { x: 240, y: 473 },
            { x: 185, y: 486 },
            { x: 184, y: 445 },
            { x: 182, y: 357 },
            { x: 184, y: 302 },
            { x: 188, y: 271 },
            { x: 198, y: 240 },
            { x: 210, y: 217 },
            { x: 222, y: 198 },
            { x: 239, y: 178 },
            { x: 262, y: 160 },
            { x: 291, y: 145 },
        ];
        if (_this.type === CardType.HERO && !props.armor) {
            _this.healthGemAsset = "health";
            _this.healthGemCoords = {
                sWidth: 109,
                sHeight: 164,
                dx: 504,
                dy: 728,
                dWidth: 109,
                dHeight: 164,
            };
            _this.healthTextCoords = { x: 556, y: 825 };
        }
        return _this;
    }
    HeroCard.prototype.getWatermarkCoords = function () {
        return {
            dx: 247,
            dy: 625,
            dWidth: 170,
            dHeight: 170,
        };
    };
    return HeroCard;
}(Card));

var HeroCardPremium = (function (_super) {
    __extends(HeroCardPremium, _super);
    function HeroCardPremium() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.premium = true;
        _this.bodyTextColor = "white";
        _this.bodyTextCoords = {
            dx: 140,
            dy: 627,
            dWidth: 376,
            dHeight: 168,
            sWidth: 376,
            sHeight: 168,
        };
        _this.cardFoundationAsset = "base-hero-premium";
        _this.cardFoundationCoords = {
            dx: 66,
            dy: 84,
            dWidth: 527,
            dHeight: 799,
            sWidth: 527,
            sHeight: 799,
        };
        _this.baseCardFrameAsset = "frame-hero-premium-";
        _this.baseCardFrameCoords = {
            dx: 220,
            dy: 838,
            dWidth: 223,
            dHeight: 45,
            sWidth: 223,
            sHeight: 45,
        };
        _this.nameBannerAsset = "name-banner-hero-premium";
        _this.nameBannerCoords = {
            dx: 87,
            dy: 456,
            dWidth: 490,
            dHeight: 122,
            sWidth: 490,
            sHeight: 122,
        };
        _this.rarityGemCoords = { dx: 307, dy: 528 };
        _this.dragonAsset = "elite-hero-premium";
        return _this;
    }
    return HeroCardPremium;
}(HeroCard));

var HeroPowerCard = (function (_super) {
    __extends(HeroPowerCard, _super);
    function HeroPowerCard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.premium = false;
        _this.bodyTextColor = "black";
        _this.bodyTextCoords = {
            dx: 144,
            dy: 606,
            dWidth: 380,
            dHeight: 174,
            sWidth: 380,
            sHeight: 174,
        };
        _this.cardFoundationAsset = null;
        _this.cardFoundationCoords = null;
        _this.baseCardFrameAsset = "hero-power-";
        _this.baseCardFrameCoords = {
            sWidth: 564,
            sHeight: 841,
            dx: 56,
            dy: 65,
            dWidth: 564,
            dHeight: 841,
        };
        _this.costTextCoords = { x: 338, y: 124 };
        _this.baseRarityGemAsset = null;
        _this.nameBannerAsset = null;
        _this.dragonAsset = null;
        _this.dragonCoords = null;
        _this.attackGemAsset = null;
        _this.healthGemAsset = null;
        _this.attackGemCoords = null;
        _this.attackTextCoords = null;
        _this.healthGemCoords = null;
        _this.healthTextCoords = null;
        _this.nameBannerCoords = null;
        _this.rarityGemCoords = null;
        _this.raceBannerAsset = null;
        _this.raceBannerCoords = null;
        _this.raceTextCoords = null;
        _this.nameTextCurve = {
            pathMiddle: 0.54,
            maxWidth: 440,
            curve: [{ x: 10, y: 37 }, { x: 110, y: 37 }, { x: 350, y: 37 }, { x: 450, y: 37 }],
        };
        _this.artCoords = {
            sWidth: 261,
            sHeight: 261,
            dx: 208,
            dy: 163,
            dWidth: 261,
            dHeight: 261,
        };
        _this.artClipPolygon = [
            { x: 344, y: 161 },
            { x: 264, y: 173 },
            { x: 204, y: 257 },
            { x: 207, y: 331 },
            { x: 234, y: 394 },
            { x: 333, y: 431 },
            { x: 424, y: 407 },
            { x: 465, y: 355 },
            { x: 471, y: 261 },
            { x: 427, y: 187 },
        ];
        return _this;
    }
    HeroPowerCard.prototype.getWatermarkCoords = function () {
        return {
            dx: 0,
            dy: 0,
            dWidth: 0,
            dHeight: 0,
        };
    };
    return HeroPowerCard;
}(Card));

var HeroPowerCardPremium = (function (_super) {
    __extends(HeroPowerCardPremium, _super);
    function HeroPowerCardPremium() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.premium = true;
        _this.baseCardFrameAsset = "hero-power-premium-";
        _this.baseCardFrameCoords = {
            dx: 56,
            dy: 60,
            dWidth: 564,
            dHeight: 850,
            sWidth: 564,
            sHeight: 850,
        };
        _this.costTextCoords = { x: 338, y: 130 };
        return _this;
    }
    return HeroPowerCardPremium;
}(HeroPowerCard));

var MinionCard = (function (_super) {
    __extends(MinionCard, _super);
    function MinionCard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.premium = false;
        _this.bodyTextColor = "black";
        _this.bodyTextCoords = {
            dx: 130,
            dy: 622,
            dWidth: 408,
            dHeight: 176,
            sWidth: 408,
            sHeight: 176,
        };
        _this.cardFoundationAsset = null;
        _this.cardFoundationCoords = null;
        _this.baseCardFrameAsset = "frame-minion-";
        _this.baseCardFrameCoords = {
            sWidth: 528,
            sHeight: 793,
            dx: 70,
            dy: 89,
            dWidth: 528,
            dHeight: 793,
        };
        _this.baseRarityGemAsset = "rarity-minion-";
        _this.nameBannerAsset = "name-banner-minion";
        _this.dragonAsset = "elite-minion";
        _this.dragonCoords = {
            sWidth: 436,
            sHeight: 325,
            dx: 188,
            dy: 52,
            dWidth: 436,
            dHeight: 325,
        };
        _this.attackGemAsset = "attack-minion";
        _this.healthGemAsset = "health";
        _this.attackGemCoords = {
            sWidth: 154,
            sHeight: 173,
            dx: 36,
            dy: 721,
            dWidth: 154,
            dHeight: 173,
        };
        _this.attackTextCoords = { x: 125, y: 824 };
        _this.healthGemCoords = {
            sWidth: 109,
            sHeight: 164,
            dx: 504,
            dy: 728,
            dWidth: 109,
            dHeight: 164,
        };
        _this.healthTextCoords = { x: 556, y: 825 };
        _this.nameBannerCoords = {
            sWidth: 485,
            sHeight: 113,
            dx: 96,
            dy: 469,
            dWidth: 485,
            dHeight: 113,
        };
        _this.raceBannerAsset = "race-banner";
        _this.raceBannerCoords = {
            dx: 129,
            dy: 791,
            dWidth: 408,
            dHeight: 69,
            sWidth: 408,
            sHeight: 69,
        };
        _this.raceTextCoords = { dx: 337, dy: 829 };
        _this.rarityGemCoords = { dx: 263, dy: 532 };
        _this.nameTextCurve = {
            pathMiddle: 0.55,
            maxWidth: 450,
            curve: [{ x: 0, y: 88 }, { x: 98, y: 112 }, { x: 294, y: 13 }, { x: 460, y: 80 }],
        };
        _this.artCoords = {
            sWidth: 461,
            sHeight: 461,
            dx: 105,
            dy: 100,
            dWidth: 461,
            dHeight: 461,
        };
        _this.artClipPolygon = [
            { x: 335, y: 102 },
            { x: 292, y: 110 },
            { x: 256, y: 131 },
            { x: 222, y: 163 },
            { x: 195, y: 203 },
            { x: 171, y: 273 },
            { x: 163, y: 330 },
            { x: 170, y: 398 },
            { x: 200, y: 474 },
            { x: 266, y: 547 },
            { x: 302, y: 563 },
            { x: 343, y: 567 },
            { x: 406, y: 544 },
            { x: 449, y: 506 },
            { x: 488, y: 432 },
            { x: 505, y: 346 },
            { x: 494, y: 255 },
            { x: 460, y: 172 },
            { x: 425, y: 135 },
            { x: 385, y: 111 },
        ];
        return _this;
    }
    MinionCard.prototype.getWatermarkCoords = function () {
        var dy = 604;
        if (this.raceText) {
            dy -= 10; // Shift up
        }
        return {
            dx: 231,
            dy: dy,
            dWidth: 225,
            dHeight: 225,
        };
    };
    return MinionCard;
}(Card));

var MinionCardPremium = (function (_super) {
    __extends(MinionCardPremium, _super);
    function MinionCardPremium() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.premium = true;
        _this.bodyTextColor = "white";
        _this.cardFoundationAsset = "base-minion-premium";
        _this.cardFoundationCoords = {
            dx: 66,
            dy: 64,
            dwidth: 528,
            dheight: 818,
            swidth: 528,
            sheight: 818,
        };
        _this.baseCardFrameAsset = "frame-minion-premium-";
        _this.baseCardFrameCoords = {
            dx: 223,
            dy: 553,
            sWidth: 231,
            sHeight: 329,
            dWidth: 231,
            dHeight: 329,
        };
        _this.baseRarityGemAsset = "rarity-minion-premium-";
        _this.rarityGemCoords = { dx: 245, dy: 528 };
        _this.nameBannerAsset = "name-banner-minion-premium";
        _this.dragonAsset = "elite-minion-premium";
        _this.dragonCoords = {
            dx: 172,
            dy: 17,
            sWidth: 485,
            sHeight: 341,
            dWidth: 485,
            dHeight: 341,
        };
        _this.attackGemAsset = "attack-minion-premium";
        _this.healthGemAsset = "health-premium";
        _this.raceBannerAsset = "race-banner-premium";
        _this.raceBannerCoords = {
            dx: 139,
            dy: 779,
            dWidth: 408,
            dHeight: 81,
            sWidth: 408,
            sHeight: 81,
        };
        _this.raceTextCoords = { dx: 347, dy: 826 };
        return _this;
    }
    return MinionCardPremium;
}(MinionCard));

var SpellCard = (function (_super) {
    __extends(SpellCard, _super);
    function SpellCard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.premium = false;
        _this.bodyTextColor = "black";
        _this.bodyTextCoords = {
            dx: 144,
            dy: 630,
            dWidth: 378,
            dHeight: 168,
            sWidth: 378,
            sHeight: 168,
        };
        _this.cardFoundationAsset = null;
        _this.cardFoundationCoords = null;
        _this.baseCardFrameAsset = "frame-spell-";
        _this.baseCardFrameCoords = {
            dx: 70,
            dy: 133,
            dWidth: 527,
            dHeight: 746
        };
        _this.baseRarityGemAsset = "rarity-spell-";
        _this.nameBannerAsset = "name-banner-spell";
        _this.dragonAsset = "elite-spell";
        _this.dragonCoords = {
            sWidth: 476,
            sHeight: 259,
            dx: 185,
            dy: 91,
            dWidth: 476,
            dHeight: 259,
        };
        _this.attackGemAsset = null;
        _this.healthGemAsset = null;
        _this.attackGemCoords = null;
        _this.attackTextCoords = null;
        _this.healthGemCoords = null;
        _this.healthTextCoords = null;
        _this.nameBannerCoords = {
            sWidth: 507,
            sHeight: 155,
            dx: 80,
            dy: 457,
            dWidth: 507,
            dHeight: 155,
        };
        _this.raceBannerAsset = null;
        _this.raceBannerCoords = null;
        _this.raceTextCoords = null;
        _this.rarityGemCoords = {
            sWidth: 116,
            sHeight: 77,
            dx: 272,
            dy: 541,
            dWidth: 116,
            dHeight: 77
        };
        _this.nameTextCurve = {
            pathMiddle: 0.49,
            maxWidth: 450,
            curve: [{ x: 10, y: 78 }, { x: 170, y: 36 }, { x: 294, y: 36 }, { x: 450, y: 80 }],
        };
        _this.artCoords = {
            sWidth: 418,
            sHeight: 418,
            dx: 123,
            dy: 138,
            dWidth: 418,
            dHeight: 418,
        };
        _this.artClipPolygon = [
            { x: 338, y: 171 },
            { x: 425, y: 179 },
            { x: 544, y: 213 },
            { x: 551, y: 474 },
            { x: 439, y: 511 },
            { x: 327, y: 519 },
            { x: 202, y: 505 },
            { x: 118, y: 474 },
            { x: 116, y: 213 },
            { x: 236, y: 176 }
        ];
        return _this;
    }
    SpellCard.prototype.getWatermarkCoords = function () {
        return {
            dx: 232,
            dy: 612,
            dWidth: 210,
            dHeight: 210,
        };
    };
    return SpellCard;
}(Card));

var SpellCardPremium = (function (_super) {
    __extends(SpellCardPremium, _super);
    function SpellCardPremium() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.premium = true;
        _this.bodyTextColor = "white";
        _this.bodyTextCoords = {
            dx: 152,
            dy: 634,
            dWidth: 366,
            dHeight: 168,
            sWidth: 366,
            sHeight: 168,
        };
        _this.cardFoundationAsset = "base-spell-premium";
        _this.cardFoundationCoords = {
            dx: 52,
            dy: 125,
            dwidth: 580,
            dheight: 755,
            swidth: 580,
            sheight: 755,
        };
        _this.baseCardFrameAsset = "frame-spell-premium-";
        _this.baseCardFrameCoords = {
            dx: 220,
            dy: 126,
            sWidth: 226,
            sHeight: 754,
            dWidth: 226,
            dHeight: 754,
        };
        _this.nameBannerCoords = {
            dx: 84,
            dy: 464,
            dWidth: 497,
            dHeight: 152,
            sWidth: 497,
            sHeight: 152,
        };
        _this.nameTextCurve = {
            pathMiddle: 0.49,
            maxWidth: 450,
            curve: [{ x: 10, y: 86 }, { x: 170, y: 44 }, { x: 294, y: 44 }, { x: 450, y: 88 }],
        };
        _this.baseRarityGemAsset = "rarity-spell-premium-";
        _this.rarityGemCoords = {
            dx: 283,
            dy: 545,
            dWidth: 107,
            dHeight: 74,
            sWidth: 107,
            sHeight: 74,
        };
        _this.nameBannerAsset = "name-banner-spell-premium";
        _this.dragonAsset = "elite-spell-premium";
        _this.dragonCoords = {
            dx: 185,
            dy: 91,
            sWidth: 476,
            sHeight: 259,
            dWidth: 476,
            dHeight: 259,
        };
        return _this;
    }
    return SpellCardPremium;
}(SpellCard));

var WeaponCard = (function (_super) {
    __extends(WeaponCard, _super);
    function WeaponCard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.premium = false;
        _this.bodyTextColor = "white";
        _this.bodyTextCoords = {
            dx: 146,
            dy: 628,
            dWidth: 388,
            dHeight: 168,
            sWidth: 388,
            sHeight: 168,
        };
        _this.cardFoundationAsset = null;
        _this.cardFoundationCoords = null;
        _this.baseCardFrameAsset = "frame-weapon-";
        _this.baseCardFrameCoords = {
            sWidth: 527,
            sHeight: 775,
            dx: 80,
            dy: 103,
            dWidth: 527,
            dHeight: 775,
        };
        _this.nameBannerAsset = "name-banner-weapon";
        _this.baseRarityGemAsset = "rarity-weapon-";
        _this.dragonAsset = "elite-weapon";
        _this.dragonCoords = {
            dx: 184,
            dy: 89,
            dWidth: 455,
            dHeight: 315,
            sWidth: 455,
            sHeight: 315,
        };
        _this.attackGemAsset = "attack-weapon";
        _this.healthGemAsset = "durability";
        _this.attackGemCoords = {
            sWidth: 135,
            sHeight: 133,
            dx: 65,
            dy: 753,
            dWidth: 135,
            dHeight: 133,
        };
        _this.attackTextCoords = { x: 136, y: 820 };
        _this.healthGemCoords = {
            sWidth: 126,
            sHeight: 140,
            dx: 501,
            dy: 744,
            dWidth: 126,
            dHeight: 140,
        };
        _this.healthTextCoords = { x: 563, y: 819 };
        _this.nameBannerCoords = {
            sWidth: 514,
            sHeight: 108,
            dx: 87,
            dy: 468,
            dWidth: 514,
            dHeight: 108,
        };
        _this.rarityGemCoords = {
            sWidth: 96,
            sHeight: 90,
            dx: 302,
            dy: 520,
            dWidth: 96,
            dHeight: 90,
        };
        _this.raceBannerAsset = null;
        _this.raceBannerCoords = null;
        _this.raceTextCoords = null;
        _this.nameTextCurve = {
            pathMiddle: 0.56,
            maxWidth: 450,
            curve: [{ x: 18, y: 56 }, { x: 66, y: 56 }, { x: 400, y: 56 }, { x: 456, y: 56 }],
        };
        _this.artCoords = {
            sWidth: 384,
            sHeight: 384,
            dx: 152,
            dy: 135,
            dWidth: 384,
            dHeight: 384,
        };
        _this.artClipPolygon = [
            { x: 352, y: 139 },
            { x: 418, y: 155 },
            { x: 469, y: 188 },
            { x: 497, y: 222 },
            { x: 523, y: 267 },
            { x: 533, y: 315 },
            { x: 531, y: 366 },
            { x: 514, y: 420 },
            { x: 485, y: 461 },
            { x: 444, y: 496 },
            { x: 375, y: 515 },
            { x: 309, y: 515 },
            { x: 236, y: 484 },
            { x: 192, y: 434 },
            { x: 160, y: 371 },
            { x: 158, y: 303 },
            { x: 173, y: 246 },
            { x: 203, y: 201 },
            { x: 242, y: 167 },
            { x: 287, y: 148 },
        ];
        return _this;
    }
    WeaponCard.prototype.getWatermarkCoords = function () {
        return {
            dx: 241,
            dy: 599,
            dWidth: 220,
            dHeight: 220,
        };
    };
    return WeaponCard;
}(Card));

var WeaponCardPremium = (function (_super) {
    __extends(WeaponCardPremium, _super);
    function WeaponCardPremium() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.premium = true;
        _this.cardFoundationAsset = "base-weapon-premium";
        _this.cardFoundationCoords = {
            dx: 75,
            dy: 101,
            dWidth: 527,
            dHeight: 778,
            sWidth: 527,
            sHeight: 778,
        };
        _this.baseCardFrameAsset = "frame-weapon-premium-";
        _this.baseCardFrameCoords = {
            dx: 229,
            dy: 532,
            dWidth: 226,
            dHeight: 347,
            sWidth: 226,
            sHeight: 347,
        };
        _this.nameBannerAsset = "name-banner-weapon-premium";
        _this.attackGemAsset = "attack-weapon-premium";
        _this.healthGemAsset = "durability-premium";
        _this.dragonAsset = "elite-weapon-premium";
        _this.dragonCoords = {
            dx: 164,
            dy: 69,
            dWidth: 489,
            dHeight: 334,
            sWidth: 489,
            sHeight: 334,
        };
        return _this;
    }
    return WeaponCardPremium;
}(WeaponCard));

var Sunwell = (function () {
    function Sunwell(options) {
        options.titleFont = options.titleFont || "Belwe";
        options.bodyFontRegular = options.bodyFontRegular || "Franklin Gothic";
        options.bodyFontBold = options.bodyFontBold || options.bodyFontRegular;
        options.bodyFontItalic = options.bodyFontItalic || options.bodyFontRegular;
        options.aspectRatio = options.aspectRatio || 1.492537;
        options.bodyFontSize = options.bodyFontSize || 60;
        options.bodyFontOffset = options.bodyFontOffset || { x: 0, y: 0 };
        options.bodyLineHeight = options.bodyLineHeight || 50;
        options.assetFolder = options.assetFolder || "/assets/";
        options.drawTimeout = options.drawTimeout || 5000;
        options.cacheSkeleton = options.cacheSkeleton || false;
        options.debug = options.debug || false;
        this.platform = new WebPlatform();
        this.options = options;
        this.assets = {};
        this.assetListeners = {};
        this.renderQuery = {};
        this.renderCache = {};
        this.isRendering = false;
    }
    Sunwell.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.options.debug) {
            console.log.apply("[INFO]", arguments);
        }
    };
    Sunwell.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log.apply("[ERROR]", arguments);
    };
    Sunwell.prototype.fetchAsset = function (path) {
        var assets = this.assets;
        var assetListeners = this.assetListeners;
        var sw = this;
        return new this.platform.Promise(function (resolve) {
            if (assets[path] === undefined) {
                assets[path] = new sw.platform.Image();
                sw.log("Requesting", path);
                sw.platform.loadAsset(assets[path], path, function () {
                    if (assetListeners[path]) {
                        for (var _i = 0, _a = assetListeners[path]; _i < _a.length; _i++) {
                            var listener = _a[_i];
                            listener(assets[path]);
                        }
                        delete assetListeners[path];
                    }
                    resolve();
                }, function () {
                    sw.error("Error loading asset:", path);
                    // An asset load error should not reject the promise
                    resolve();
                });
            }
            else if (!assets[path].complete) {
                assetListeners[path] = assetListeners[path] || [];
                assetListeners[path].push(resolve);
            }
            else {
                resolve();
            }
        });
    };
    Sunwell.prototype.getBuffer = function (width, height, clear) {
        return this.platform.getBuffer(width, height, clear);
    };
    Sunwell.prototype.freeBuffer = function (buffer) {
        return this.platform.freeBuffer(buffer);
    };
    Sunwell.prototype.render = function () {
        var _this = this;
        var keys = Object.keys(this.renderQuery);
        if (!keys.length) {
            return;
        }
        var first = keys[0];
        var card = this.renderQuery[first];
        delete this.renderQuery[first];
        var context = card.canvas.getContext("2d");
        this.log("Preparing assets for", card.name);
        var texturesToLoad = [];
        if (card.texture && typeof card.texture === "string") {
            texturesToLoad.push(card.texture);
        }
        for (var _i = 0, _a = card.getAssetsToLoad(); _i < _a.length; _i++) {
            var asset = _a[_i];
            var path = this.getAssetPath(asset);
            if (!this.assets[path] || !this.assets[path].complete) {
                texturesToLoad.push(path);
            }
        }
        this.log("Preparing to load assets");
        var fetches = [];
        for (var _b = 0, texturesToLoad_1 = texturesToLoad; _b < texturesToLoad_1.length; _b++) {
            var texture = texturesToLoad_1[_b];
            fetches.push(this.fetchAsset(texture));
        }
        this.platform.Promise
            .all(fetches)
            .then(function () {
            var start = Date.now();
            card.draw(card.canvas, context);
            _this.log(card, "finished drawing in " + (Date.now() - start) + "ms");
            // check whether we have more to do
            _this.isRendering = false;
            if (Object.keys(_this.renderQuery).length) {
                _this.renderTick();
            }
        })
            .catch(function (e) {
            _this.error("Error while drawing card:", e);
            _this.isRendering = false;
        });
    };
    Sunwell.prototype.getAssetPath = function (key) {
        return this.options.assetFolder + key + ".png";
    };
    Sunwell.prototype.getAsset = function (key) {
        var path = this.getAssetPath(key);
        var asset = this.assets[path];
        if (!asset) {
            this.error("Missing asset", key, "at", path);
            return;
        }
        if (!asset.complete) {
            this.error("Attempting to getAsset not loaded", asset, path);
            return;
        }
        return asset;
    };
    Sunwell.prototype.renderTick = function () {
        var _this = this;
        this.isRendering = true;
        this.platform.requestAnimationFrame(function () { return _this.render(); });
    };
    Sunwell.prototype.createCard = function (props, width, premium, target, callback) {
        var canvas;
        var height = Math.round(width * this.options.aspectRatio);
        if (target && target instanceof HTMLCanvasElement) {
            canvas = target;
            canvas.width = width;
            canvas.height = height;
        }
        else {
            canvas = this.getBuffer(width, height, true);
        }
        var ctors = {};
        ctors[CardType.HERO] = premium ? HeroCardPremium : HeroCard;
        ctors[CardType.MINION] = premium ? MinionCardPremium : MinionCard;
        ctors[CardType.SPELL] = premium ? SpellCardPremium : SpellCard;
        ctors[CardType.WEAPON] = premium ? WeaponCardPremium : WeaponCard;
        ctors[CardType.HERO_POWER] = premium ? HeroPowerCardPremium : HeroPowerCard;
        var type = cleanEnum(props.type, CardType);
        var ctor = ctors[type];
        if (!ctor) {
            throw new Error("Got an unrenderable card type: " + type);
        }
        var card = new ctor(this, props);
        card.canvas = canvas;
        card.initRender(width, target, callback);
        this.log("Queried render:", card.name);
        if (this.renderQuery[card.key]) {
            this.log("Skipping", card.key, "(already queued)");
        }
        else {
            this.renderQuery[card.key] = card;
            if (!this.isRendering) {
                this.renderTick();
            }
        }
        return card;
    };
    return Sunwell;
}());

module.exports = Sunwell;
