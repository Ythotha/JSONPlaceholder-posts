export default function arrayToObject (array) {
  let object = {}

  array.forEach(element => {
    const key = element.id

    object[key] = element
  })

  return object
}