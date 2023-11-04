'use strict'

let pop, fit, sel, cros, mut, mch, ran

let population, fitness, selection, crossover, mchance, random

let mutationCount = 0;

function _selection(p) {

    return [p[0], p[1]]

}

function _mutation(a) {
    return a
}

var mutFunction = _mutation

function mutation(a) {
    mutationCount++
    mutFunction(a)
}

function init(options) {
    ({ population, fitness, selection=_selection, crossover, mchance=0, random } = options)
    mutFunction = options.mutation
}

function evolve() {
    population.sort((a, b) => { return fitness(b) - fitness(a) })
    population = selection(population)
    let newpop = []
    for (let mother of population) {
        for (let father of population) {
            if (mother[father]) continue
            let baby = crossover(mother, father)
            if (Math.random() < mchance) {
                baby = mutation(baby)
            }
            newpop.push(baby)
            mother[father] = true
            father[mother] = true
        }
    }

    for (let i = 0; i < newpop.length * (3 / 4); i++) {
        newpop.push(random())
    }

    population = newpop
    population.sort((a, b) => { return fitness(b) - fitness(a) })
}

function printPop() {
    console.log(population)
}

function getPop() {
    return population
}

function mCount() { return mutationCount }

module.exports = { init, evolve, printPop, getPop, mCount }

