interface RequestArguments {
  readonly method: string;
  readonly params?: readonly unknown[] | object;
}

class SmartyProvider {
  isSmartyProvider: boolean;
  constructor() {
    console.log("Smarty injected provider instantiated");
    this.isSmartyProvider = true;
  }

  isConnected() {}

  request(args: RequestArguments) {
    return new Promise((resolve, reject) => {});
  }

  on(eventName: string, listener: (...args: unknown[]) => void) {}
}

window.ethereum = new SmartyProvider();
