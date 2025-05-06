// 1. Introduction
    // In JavaScript, variables can store different types of data. When assigning values from one variable to another, the behavior depends on whether the value is a primitive type (like numbers or strings) or a non-primitive type (like arrays or objects). This assignment explains the difference between reference and copy in JavaScript, especially for arrays and objects.

// 2. Primitive Types (Copy by Value)
    // Primitive types include number, string, boolean, null, undefined, and symbol. When these types are assigned from one variable to another, a new copy of the value is created.
        // Example
            // let a = 10;
            // let b = a;
            // b = 20;
            // console.log(a); // 10
            // console.log(b); // 20
        
// 3. Arrays and Objects (Copy by Reference)
    // Arrays and objects in JavaScript are non-primitive types, and they are assigned by reference. This means both variables point to the same memory location. Changing one will also affect the other.
        // Example
             // let original = [1, 2, 3];
             // let copy = original;
             // copy[0] = 99;
             // console.log(original); // [99, 2, 3]
             // console.log(copy);     // [99, 2, 3]
        
//  4. How to Copy Arrays and Objects (Without Reference)
    // To avoid reference-based changes, you can create a shallow copy using methods like the spread operator or Object.assign().
        // Example
            // let original = [1, 2, 3];
            // let copy = [...original]; // Shallow copy using spread
            // copy[0] = 99;
            // console.log(original); // [1, 2, 3]
            // console.log(copy);     // [99, 2, 3]
