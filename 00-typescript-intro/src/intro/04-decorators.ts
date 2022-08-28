class BrokenPrinter {
  constructor(public readonly id: number) {}

  print() {
    console.log("Cannot print, I am broken...");
  }
}

/* This decorator will replace all the Class definition */
const MyDecorator = () => {
  return (target: Function) => {
    console.log(target);
    return BrokenPrinter;
  };
};

@MyDecorator() // Try comment and uncomment
class Printer {
  constructor(public readonly id: number) {}

  print() {
    console.log("Printing, bip bip");
  }
}

export const myPrinter = new Printer(101);
