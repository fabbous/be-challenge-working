'use strict'

const MinHeap = require('heap-min-max').MinHeap;



function loadHeap (source, heap) {
    const entry = source.pop()
    entry && heap.push(entry.date, {source, entry})
}


module.exports = (logSources, printer) => {
	//instantiate new minimimum heap
    const heap = new MinHeap()
    //MinHeap { items: [], _isMinHeap: true }
    //iterate through all log sources
    logSources.forEach( source => {
    	//for each source
        loadHeap(source, heap)
        console.log(heap)
     /*MinHeap {
  items: [ [ 2017-07-04T09:13:06.962Z, [Object] ] ],
  _isMinHeap: true } */
    })
    let nextEntry = heap.pop()
    while (nextEntry !== undefined) {
        const { source, entry } = nextEntry[1]
        printer.print(entry)
        loadHeap(source, heap)
        nextEntry = heap.pop()
    }
    printer.done()
}