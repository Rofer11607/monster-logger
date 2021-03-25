"use strict";
// export function logger<T>(label:string, what: any, trigger:Array<T>, group = 'default') {
//     if(!trigger.includes(group as any)) return
//     console.log(label, what)
//     return
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopLevelLogger = void 0;
var TopLevelLogger = /** @class */ (function () {
    function TopLevelLogger(currentGroups, isVerbose) {
        if (isVerbose === void 0) { isVerbose = false; }
        this.currentGroups = currentGroups;
        this.isVerbose = isVerbose;
        console.log("%c" + ("******Currently watching: " + currentGroups.join(", ") + "******"), "color: blue; font-family:sans-serif; font-size: 20px");
    }
    TopLevelLogger.prototype.defineTriggers = function (trigger, config) {
        return new Logger(this.currentGroups, trigger, this.isVerbose, config);
    };
    return TopLevelLogger;
}());
exports.TopLevelLogger = TopLevelLogger;
var Logger = /** @class */ (function () {
    function Logger(currentGroups, trigger, isVerbose, config) {
        this.currentGroups = currentGroups;
        this.trigger = trigger;
        this.isVerbose = isVerbose;
        this.config = config;
    }
    Logger.prototype.log = function (opt) {
        var out = Object.assign({}, this.config, opt);
        var label = out.label, level = out.level, type = out.type, what = out.what;
        if (!label || !level || !type || !what)
            return colorLog("INFO", "You forgot a parameter in your " + label + " log", "warning");
        if (!checkIfCurrentGroup(this.trigger, this.currentGroups)) {
            if (this.isVerbose) {
                colorLog("*Info*", "Group: '" + this.trigger + "', does not include the Group: '" + this.currentGroups + "'.", "info");
                return;
            }
        }
        switch (type) {
            case "log":
                colorLog(label, what, level);
                break;
            case "table":
                console.table(what);
                break;
            case "trace":
                console.trace(what);
                break;
            default:
                try {
                    colorLog(label, what, level);
                }
                catch (_a) {
                    colorLog("WARNING!!", label + " could not be logged", "warning");
                }
                break;
        }
        return;
    };
    return Logger;
}());
function colorLog(label, message, type) {
    var color;
    switch (type) {
        case "success":
            color = "Green";
            break;
        case "info":
            color = "DodgerBlue";
            break;
        case "error":
            color = "Red";
            break;
        case "warning":
            color = "Orange";
            break;
        default:
            color = "black";
            break;
    }
    var out = {};
    out[label] = message;
    out = JSON.stringify(out);
    console.log("%c" + out, "color:" + color);
}
function checkIfCurrentGroup(currentGroups, listeningGroups) {
    return currentGroups.some(function (v) {
        return listeningGroups.some(function (v2) {
            return v === v2;
        });
    });
}
