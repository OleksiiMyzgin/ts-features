class Boat {
    color: string = 'red';

    get formattedColor(): string {
        return `This boats color is ${this.color}`
    }

    @logError('Oops, boat was sunk in ocean')
    pilot(): void {
        throw new Error();
        console.log('swish')
    }

}

function logError(errorMessage: string) {
    return function (target: any, key: string, desc: PropertyDescriptor): void {
        const method = desc.value;

        desc.value = function () {
            try {
                method();
            } catch (e) {
                console.log(errorMessage)
            }
        }
    }
}

new Boat().pilot();

// testDecorator(Boat.prototype, 'pilot')

// decorator function

// var __decorate = function(decorators, target, key, desc) {
//     var desc = Object.getOwnPropertyDescriptor(target, key);

//     for (var decorator of decorators) {
//         decorator(target, key, desc);
//     }
// }

// const car = { make: 'mercedes', year: 2015 };
// Object.getOwnPropertyDescriptor(car, 'make');

// {
//     configurable: true,
//     enumerable: true,
//     value: "mercedes",
//     writable: true,
//     __proto__: Object
// }

// Object.defineProperty(car, 'make', { writable: false });
// car
// car.make = 'bmw';
// car