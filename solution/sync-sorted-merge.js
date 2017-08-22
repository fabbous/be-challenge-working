'use strict'

const MinHeap = require('heap-min-max').MinHeap;


module.exports = (logSources, printer) => {
    let heap = new MinHeap();

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
