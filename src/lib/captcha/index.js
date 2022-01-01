

export default class SimpleCaptcha {
    inputElementSelector = null
    inputElement
    captchaId
    styles = {}
    currentFormula
    currentResult
    retries
    currentRetries = 0

    constructor(options) {
        const {
            inputElementSelector,
            captchaId = 'captcha' + new Date().getTime(),
            styles = {
                width: 100,
                height: 40,
                textBaseline: 'top',
                font: '24px Times New Roman',
                textAlign: 'left',
                fillStyle: '#ddd',
                direction: 'ltr'
            },
            retries = 3
        } = options

        if (typeof inputElementSelector === 'undefined') {
            throw Error('No input element selector given to captcha')
        }

        this.inputElementSelector = inputElementSelector
        this.captchaId = captchaId
        this.styles = styles
        this.retries = retries

        this.init()
    }

    checkDocumentInstance() {
        if (typeof document === 'undefined') {
            throw Error('document is undefined')
        }
    }

    /** Gets the existing canvas element or new canvas element */
    getCanvasElement() {
        this.checkDocumentInstance()
        
        const element = document.querySelector(`canvas#${this.captchaId}`)
        if (element) {
            // Clears the content
            const ctx = element.getContext('2d')
            ctx.clearRect(0, 0, element.width, element.height);
            return element
        }
        const canvas = document.createElement('canvas')
        canvas.id = this.captchaId
        canvas.width = this.styles.width
        canvas.height = this.styles.height
        const ctx = canvas.getContext('2d')
        ctx.font            = this.styles.font
        ctx.textBaseline    = this.styles.textBaseline
        ctx.textAlign       = this.styles.textAlign
        ctx.fillStyle       = this.styles.fillStyle
        return canvas
    }

    init() {
        this.checkDocumentInstance()
        this.currentRetries = 0
        // Create the canvas
        this.inputElement = document.querySelector(this.inputElementSelector)
        const inputParentNode = this.inputElement.parentNode
        if (this.inputElement) {
            const canvas = this.getCanvasElement()
            const ctx = canvas.getContext('2d')

            this.currentFormula = this.getFormula()
            this.setFormulaResult(this.calculateFormula(this.currentFormula))
            this.drawRandomLines(canvas, ctx, 10)
            ctx.strokeText(`${this.currentFormula.left} + ${this.currentFormula.right}`, 1, 1, this.styles.width)

            inputParentNode.insertBefore(canvas, this.inputElement)
        }
    }

    reset() {
        this.init()
    }

    validate() {
        const value = this.inputElement.value
        if (Buffer.from(String(value)).toString('base64') === this.currentResult) {
            return true
        } else {
            this.currentRetries++
            if (this.currentRetries === this.retries) {
                this.reset()
            }
            return false
        }
    }

    /** Sets the formula result as base64 encoded */
    setFormulaResult(value) {
        this.currentResult = Buffer.from(String(value)).toString('base64')
    }

    getRandomNumber(max) {
        return Math.floor(Math.random() * max)
    }

    getFormula() {
        // Maybe get it from the server?
        return {
            left: this.getRandomNumber(100),
            right: this.getRandomNumber(100)
        }
    }

    calculateFormula(formula) {
        return formula.left + formula.right
    }

    drawRandomLines(canvas, context, lines) {
        const c = canvas
        const ctx = context
        for (let n = 0; n < lines; n++) {
            ctx.beginPath();
            ctx.moveTo(c.width * Math.random(), c.height * Math.random());
            ctx.lineTo(c.width * Math.random(), c.height * Math.random());
            ctx.strokeStyle = this.randomColor();
            ctx.stroke();
        }
    }

    randomColor() {
        return "rgb(" +
            Math.round(256*Math.random()) + "," + 
            Math.round(256*Math.random()) + "," + 
            Math.round(256*Math.random()) + ")";
    }
}