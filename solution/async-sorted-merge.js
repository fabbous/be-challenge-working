'use strict'

const MinHeap = require('heap-min-max').MinHeap;
const Promises = require('bluebird')



module.exports = async (logSources, printer) => {
    let heap = new MinHeap();

    let logPromises = [];
    logSources.forEach((logSource) => {
        let logEntry = logSource.pop()
        logPromises.push(logSource.popAsync().then((logEntry => {
        if (logEntry) {
            heap.push(logEntry.date, {logSource, logEntry})
        }
      })));
    });

   Promises.all(logPromises).then(() => {
    printAllLogEntries().then(() => {
        printer.done();
    });
   });


  function printAllLogEntries() {
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
}

   