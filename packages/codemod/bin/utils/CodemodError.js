class CodemodError extends Error {
  constructor(args) {
    super(args)
    this.type = args.type
    this.payload = args.payload
  }
}

module.exports = CodemodError
