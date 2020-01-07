const lib = require("../lib/lib");

describe("absolute", () => {
	it("should return positive", () => {
		const result = lib.absoulte(2);
		expect(result).toBe(2);
	});

	it("should return negative", () => {
		const result = lib.absoulte(-1);
		expect(result).toBe(-1);
	});

	it("should return 0", () => {
		const result = lib.absoulte(0);
		expect(result).toBe(0);
	});
});

describe("Greeting", () => {
	it("return greeting", () => {
		const result = lib.greeting("Jude");
		expect(result).toContain("Jude")
	})
});

describe("get currencies", () => {
	it("should return supported curriencies", () => {
		const result = lib.getCurrencies(["USD", "EUR", "AUD"]);

		//gereal way to test for supported currencies
		expect(result).toBeDefined();
		expect(result).not.toBeNull();

		//assertions that are too specific
		expect(result[0]).toBe("USD")
		expect(result[1]).toBe("EUR")
		expect(result[2]).toBe("AUD")
		expect(result.length).toBe(3);

		//proper way
		expect(result).toContain("USD")

		//ideal way
		expect(result).toEqual(expect.arrayContaining(["EUR","AUD","USD"]))

	})
})

describe("get Product", () => {
	it("return aobject", () => {
		const result = lib.getProduct(1);
		//toEqual checks exact while the latter is used for multiple properties
		//toEqual is too specific in the test
		expect(result).toEqual({ id: 1, price: 10 });
		expect(result).toMatchObject({ id: 1, price: 10 })
		expect(result).toHaveProperty("id", 1)
	})
})

describe("registerUser", () => {
	it("throw exception", () => {
		expect(() => { lib.registerUser(null).toThrow() })
	});

	it("return register user test", () => {
		const result = lib.registerUser("jude");
		expect(result).toMatchObject({ username: "jude" });
		expect(result.id).toBeGreaterThan(0);
	})
})

describe("FizzBuzz", () => {
	it("throw error if not equal to a number", () => {
		expect(() => { lib.fizzbuzz(null) }).toThrow();
	});

	it("return FizzBuzz if it is divisible by 5 and three", () => {
		const result = lib.fizzbuzz(15);
		expect(result).toBe("FizzBuzz");
	});

	it("return Fizz if input is divisible by 3", () => {
		const result = lib.fizzbuzz(3);
		expect(result).toBe("Fizz")
	});

	it("return Buzz if input is divisible by 5", () => {
		const result = lib.fizzbuzz(5);
		expect(result).toBe("Buzz");
	})
	it("return input", () => {
		const result = lib.fizzbuzz(1);
		expect(result).toBe(1);
	})
})