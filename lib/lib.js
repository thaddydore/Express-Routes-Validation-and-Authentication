
module.exports.absoulte = function (number) {
  if (number < 0) return number;
  if (number > 0) return number;
  return 0
};

module.exports.greeting = function (greeting) {
  return `welcome ${greeting}`
};

module.exports.getCurrencies = function () {
  return ["USD", "EUR", "AUD"]
}

module.exports.getProduct = function (productId) {
  return {id: productId, price: 10}
}

module.exports.registerUser = function (username) {
  if (!username) throw new Error("username is required")

  return {id: new Date().getTime(), username: username}
}

module.exports.fizzbuzz= function (input) {
  if (typeof input !== "number") throw new Error("input should be a number");

  if (input % 3 === 0 && input % 5 === 0) return "FizzBuzz";
  if (input % 3 === 0) return "Fizz";
  if (input % 5 === 0) return "Buzz";
  return input
}