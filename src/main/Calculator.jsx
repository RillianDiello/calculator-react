import React, { Component } from 'react'
import './Calculator.css'

import Button from "../components/Button";
import Display from "../components/Display";

const initialStates = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = { ...initialStates }
    constructor(props) {
        // deve enviar o super sempre pq eu estou extendendo
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory() {
        this.setState({ ...initialStates })
    }
    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]

            try {
                //console.log(this.makeOperation(values[0], values[1], operation))
                values[0] = this.makeOperation(values[0], values[1], currentOperation)
               // values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch (e) {
                values[0] = this.state.values[0]
            }
            values[1] = 0

            

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }
    addDigit(digit) {
        if (digit === '.' && this.state.displayValue.includes('.')) {
            return
        }

        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + digit
        this.setState({ displayValue, clearDisplay: false })

        if (digit !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
        }
    }

    makeOperation(value1, value2, operation) {

        let result = 0
        switch (operation) {
            case '+':
                result = value1 + value2
                break
            case '-':
                result = value1 - value2
                break
            case '*':
                result = value1 * value2
                break
            case '/':
                result = value1 / value2
                break
            case '=':
                result = value1
                break
            default:
                console.log(`Sorry, we are out of ${operation}.`);
        }
        console.log(result)

        return result

    }

    render() {


        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label={'AC'} click={this.clearMemory} triple />
                <Button label={'/'} click={this.setOperation} operation />
                <Button label={'7'} click={this.addDigit} />
                <Button label={'8'} click={this.addDigit} />
                <Button label={'9'} click={this.addDigit} />
                <Button label={'*'} click={this.setOperation} operation />
                <Button label={'4'} click={this.addDigit} />
                <Button label={'5'} click={this.addDigit} />
                <Button label={'6'} click={this.addDigit} />
                <Button label={'-'} click={this.setOperation} operation />
                <Button label={'1'} click={this.addDigit} />
                <Button label={'2'} click={this.addDigit} />
                <Button label={'3'} click={this.addDigit} />
                <Button label={'+'} click={this.setOperation} operation />
                <Button label={'0'} click={this.addDigit} double />
                <Button label={'.'} click={this.addDigit} />
                <Button label={'='} click={this.setOperation} operation />

            </div>


        )
    }
}