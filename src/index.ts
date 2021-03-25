// export function logger<T>(label:string, what: any, trigger:Array<T>, group = 'default') {
//     if(!trigger.includes(group as any)) return
//     console.log(label, what)
//     return
// }

export class TopLevelLogger<T> {
  constructor(private currentGroups: Array<T>, private isVerbose = false) {
    console.log(
      "%c" + `******Currently watching: ${currentGroups.join(", ")}******`,
      "color: blue; font-family:sans-serif; font-size: 20px"
    );
  }
  defineTriggers(trigger: Array<T>, config?: Partial<loggerOptions>) {
    return new Logger(this.currentGroups, trigger, this.isVerbose, config);
  }
}
type logLevel = "success" | "info" | "error" | "warning";

interface loggerOptions {
  label: string;
  what: any;
  level: logLevel;
  type: "table" | "trace" | "log";
}

class Logger<T> {
  constructor(
    private currentGroups: Array<T>,
    private trigger: Array<T>,
    private isVerbose: boolean,
    private config?: Partial<loggerOptions>
  ) {}
  log(opt?: Partial<loggerOptions>) {
    const out = Object.assign({}, this.config, opt);
    const { label, level, type, what } = out;
    if (!label || !level || !type || !what)
      return colorLog(
        "INFO",
        `You forgot a parameter in your ${label} log`,
        "warning"
      );
    if (!checkIfCurrentGroup(this.trigger, this.currentGroups)) {
      if (this.isVerbose) {
        colorLog(
          "*Info*",
          `Group: '${this.trigger}', does not include the Group: '${this.currentGroups}'.`,
          "info"
        );
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
        } catch {
          colorLog("WARNING!!", `${label} could not be logged`, "warning");
        }
        break;
    }
    return;
  }
}

function colorLog(label: string, message: any, type: logLevel) {
  let color;
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
  let out: any = {};
  out[label] = message;
  out = JSON.stringify(out);
  console.log("%c" + out, "color:" + color);
}

function checkIfCurrentGroup(
  currentGroups: Array<any>,
  listeningGroups: Array<any>
) {
  return currentGroups.some((v) => {
    return listeningGroups.some((v2) => {
      return v === v2;
    });
  });
}
