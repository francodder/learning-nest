const Deprecated = (deprecationReason: string) => {
  return (
    target: any,
    memberName: string,
    propertyDescriptor: PropertyDescriptor
  ) => {
    // console.log({target})
    return {
      get() {
        const wrapperFn = (...args: any[]) => {
          console.warn(
            `Method ${memberName} is deprecated with reason: ${deprecationReason}`
          );
          //! Llamar la función propiamente con sus argumentos
          propertyDescriptor.value.apply(this, args);
        };
        return wrapperFn;
      },
    };
  };
};

class Pokemon {
  constructor(readonly id: number, public name: string) {}

  get imageUrl(): string {
    return `https://pokemon.com/${this.id}.jpg`;
  }

  scream() {
    console.log(`${this.name.toUpperCase()}!!!`);
  }

  @Deprecated("You must use talk() method instead")
  speak() {
    console.log(this.name, this.name);
  }

  talk() {
    console.log(`${this.name}! ${this.name}!`);
  }
}

export const snorlak = new Pokemon(7, "snorlak");
