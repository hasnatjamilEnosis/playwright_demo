export function objectToArrayIterator(
  iterationObject: object,
  callBackFunction: (value: string) => void
) {
  Object.keys(iterationObject).forEach((key) => {
    callBackFunction(iterationObject[key])
  })
}

export function objectKeyLengthCalculator(object: object) {
  return Object.keys(object).length
}
