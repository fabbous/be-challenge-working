'use strict'

const MinHeap = require('heap-min-max').MinHeap;


module.exports = (logSources, printer) => {
    let heap = new MinHeap();
    //MinHeap { items: [], _isMinHeap: true }
    //iterate through all log sources
    logSources.forEach((logSource) => {
        let logEntry = logSource.pop()
        if (logEntry) {
            heap.push(logEntry.date, {logSource, logEntry})
        }
    });

    let nextLogEntry = heap.pop()
    while (nextLogEntry) {
        let logSource = nextLogEntry[1].logSource
        let logEntry = nextLogEntry[1].logEntry
        printer.print(logEntry)
        logEntry = logSource.pop();
        if (logEntry) {
            heap.push(logEntry.date, {logSource, logEntry})
        }
        nextLogEntry = heap.pop()
    }
    printer.done()
}



// function loadHeap (source, heap) {
//     const entry = source.pop()
//     if (entry.date !== undefined) {
//         heap.push(entry.date, {source, entry})
//     }
// }


// module.exports = (logSources, printer) => {
// 	//instantiate new minimimum heap
//     const heap = new MinHeap()
//     //MinHeap { items: [], _isMinHeap: true }
//     //iterate through all log sources
//     logSources.forEach( source => {
//     	//for each source
//         loadHeap(source, heap)
//         console.log(heap)
//      /*MinHeap {
//   items: [ [ 2017-07-04T09:13:06.962Z, [Object] ] ],
//   _isMinHeap: true } */
//     })
//     let nextEntry = heap.pop()
//     while (nextEntry !== undefined) {
//         const { source, entry } = nextEntry[1]
//         printer.print(entry)
//         loadHeap(source, heap)
//         nextEntry = heap.pop()
//     }
//     printer.done()
// }