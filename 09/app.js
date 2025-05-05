// 1. Inspect Elements (Elements Tab)
    // Right-click on any element in the browser → Click "Inspect" to view and live-edit its HTML and CSS in the DevTools panel.

// 2. Styling console.log() Output
    // You can add custom CSS styles to your console messages using %c:
    // console.log('%c Hello World', 'color: blue; font-size: 20px;');

// 3. Console Message Types
    // Use different log types for clarity:
    // console.warn('This is a warning');
    // console.error('This is an error');
    // console.info('This is an info message');

// 4. console.assert()
    // Logs a message only if the assertion fails:
    // console.assert(1 === 2, 'Assertion failed: 1 is not equal to 2');

// 5. console.dir()
    // Displays a DOM element as a JavaScript object with all its properties:
    // const el = document.querySelector('p');
    // console.dir(el);

// 6. Grouping Console Logs
    // Group related messages together for clarity:
    // console.group('User Info');
    // console.log('Name: Kamran');
    // console.log('Age: 16');
    // console.groupEnd();

// 7. Measuring Code Performance
    // Use console.time() and console.timeEnd() to measure execution time:
    // console.time('Loop');
    // for (let i = 0; i < 100000; i++) {}
    // console.timeEnd('Loop');

// 8. Counting Function Calls
    // Track how many times a function or value is logged:
    // function greet() {
    //   console.count('Greet called');
    // }
    // greet();
    // greet();

// 9. Accessing DOM Elements via Console
    // Use $0, $1 etc., to reference recently selected elements in the Elements panel:
    // console.log($0); // Last inspected DOM element
    // 10. Monitor DOM Events
    // Track specific events on elements directly in the console:
    // monitorEvents(button, 'click');

// 11. Breakpoints on DOM Changes
    // In the Elements panel, right-click an element → Break on → Attribute/Child changes to pause script execution when that element is modified.

// 12. Preserve Logs Across Page Reloads
    // In the Console panel, check “Preserve log” to keep messages even after a refresh.

// 13. Setting JavaScript Breakpoints
    // Go to the Sources tab, click the line number in your JS file to set a breakpoint. The browser pauses execution when it hits that line.

// 14. Blackboxing Scripts
    // Suppress stepping into noisy third-party libraries by right-clicking the file → “Blackbox script” in the Sources panel.