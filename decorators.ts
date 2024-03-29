@classDecorator
class Boat {
    // @testDecorator
    color: string = 'red';

    // @testDecorator
    get formattedColor(): string {
        return `This boats color is ${this.color}`
    }

    @logError('Oops, boat was sunk in ocean')
    pilot(@parameterDecorator speed: string): void {
        if (speed === 'fast') {
            console.log('swish')
        } else {
            console.log('nothing');
        }
        // throw new Error();
    }

}

function classDecorator(constructor: typeof Boat) {
    console.log(constructor);
}

function parameterDecorator(target: any, key: string, index: number) {
    console.log(key, index);
}

function testDecorator(target: any, key: string) {
    // console.log('target', target[key]);
    // console.log('target', target.color);
    console.log('target', target);
    console.log('key', key);
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

// new Boat().pilot();

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