describe("RangerMask.define", function ()
{
	var mask;
	var data;

	describe("Empty mask", function ()
	{
		it("can be defined", function ()
		{
			mask = RangerMask.define("");
			expect(mask).toBeDefined();
			expect(mask).not.toBeNull();
		});

		it("should have empty blank value", function ()
		{
			expect(mask.maskedEmptyVal).toEqual("");
		});
	});

	describe("Separator mask", function ()
	{
		it("can be defined", function ()
		{
			mask = RangerMask.define("s$ ");
			expect(mask).toBeDefined();
			expect(mask).not.toBeNull();
		});

		it("should have proper blank value", function ()
		{
			expect(mask.maskedEmptyVal).toEqual("s$ ");
		});

		it("should init a valid value", function ()
		{
			data = new Object();
			mask.apply(data, "s$ ");
			expect(valueOf(mask, data)).toEqual("^s$ ^");
		});

		it("should init an invalid value", function ()
		{
			data = new Object()
			mask.apply(data, "foo");
			expect(valueOf(mask, data)).toEqual("^s$ ^");
		});
	});

	describe("Mask with escaped chars and escaped escape and incomplete escape", function ()
	{
		it("can be defined", function ()
		{
			mask = RangerMask.define("v/9v//v/");
			expect(mask).toBeDefined();
			expect(mask).not.toBeNull();
		});

		it("should treat escaped chars as separator chars", function ()
		{
			expect(mask.maskedEmptyVal).toEqual("v9v/v");
		});
	});

	describe("Single place field mask", function ()
	{
		it("can be defined", function ()
		{
			mask = RangerMask.define("A");
			expect(mask).toBeDefined();
			expect(mask).not.toBeNull();
		});

		it("should have proper blank value", function ()
		{
			expect(mask.maskedEmptyVal).toEqual("_");
		});

		it("should init an invalid value", function ()
		{
			data = new Object();
			mask.apply(data, "34");
			expect(valueOf(mask, data)).toEqual("^_^");
		});

		it("should init a valid value", function ()
		{
			data = new Object();
			mask.apply(data, "P");
			expect(valueOf(mask, data)).toEqual("^P^");
		});

		it("should init a partially valid value", function ()
		{
			data = new Object();
			mask.apply(data, "45x");
			expect(valueOf(mask, data)).toEqual("^x^");
		});
	});

	describe("Multi-place field mask", function ()
	{
		it("can be defined", function ()
		{
			mask = RangerMask.define("AA9");
			expect(mask).toBeDefined();
			expect(mask).not.toBeNull();
		});

		it("should have proper blank value", function ()
		{
			expect(mask.maskedEmptyVal).toEqual("___");
		});

		it("should init an invalid value", function ()
		{
			data = new Object();
			mask.apply(data, "34");
			expect(valueOf(mask, data)).toEqual("^___^");
		});

		it("should init a valid value", function ()
		{
			data = new Object();
			mask.apply(data, "Pq4");
			expect(valueOf(mask, data)).toEqual("^Pq4^");
		});

		it("should init a partially valid value", function ()
		{
			data = new Object();
			mask.apply(data, "Pqx");
			expect(valueOf(mask, data)).toEqual("^Pq_^");
		});
	});

	describe("Prefix separator mask", function ()
	{
		it("can be defined", function ()
		{
			mask = RangerMask.define("$99");
			expect(mask).toBeDefined();
			expect(mask).not.toBeNull();
		});

		it("should have proper blank value", function ()
		{
			expect(mask.maskedEmptyVal).toEqual("$__");
		});

		it("should init a invalid value", function ()
		{
			data = new Object();
			mask.apply(data, "Pq");
			expect(valueOf(mask, data)).toEqual("^$__^");
		});

		it("should init an valid value", function ()
		{
			data = new Object();
			mask.apply(data, "$34");
			expect(valueOf(mask, data)).toEqual("^$34^");
		});

		it("should init a partially valid value", function ()
		{
			data = new Object();
			mask.apply(data, "2a");
			expect(valueOf(mask, data)).toEqual("^$2_^");
		});
	});

	describe("Suffix separator mask", function ()
	{
		it("can be defined", function ()
		{
			mask = RangerMask.define("99%");
			expect(mask).toBeDefined();
			expect(mask).not.toBeNull();
		});

		it("should have proper blank value", function ()
		{
			expect(mask.maskedEmptyVal).toEqual("__%");
		});

		it("should init an invalid value", function ()
		{
			data = new Object();
			mask.apply(data, "af");
			expect(valueOf(mask, data)).toEqual("^__%^");
		});

		it("should init a valid value", function ()
		{
			data = new Object();
			mask.apply(data, "45%");
			expect(valueOf(mask, data)).toEqual("^45%^");
		});

		it("should init a partially valid value", function ()
		{
			data = new Object();
			mask.apply(data, "a4");
			expect(valueOf(mask, data)).toEqual("^4_%^");
		});
	});

	describe("Infix separator mask", function ()
	{
		it("can be defined", function ()
		{
			mask = RangerMask.define("9-9");
			expect(mask).toBeDefined();
			expect(mask).not.toBeNull();
		});

		it("should have proper blank value", function ()
		{
			expect(mask.maskedEmptyVal).toEqual("_-_");
		});

		it("should init an invalid value", function ()
		{
			data = new Object();
			mask.apply(data, "af");
			expect(valueOf(mask, data)).toEqual("^_-_^");
		});

		it("should init a valid value", function ()
		{
			data = new Object();
			mask.apply(data, "5-6");
			expect(valueOf(mask, data)).toEqual("^5-6^");
		});

		it("should init a partially valid value", function ()
		{
			data = new Object();
			mask.apply(data, "-9");
			expect(valueOf(mask, data)).toEqual("^_-9^");
		});
	});

	describe("Mixed field/separator mask", function ()
	{
		it("can be defined", function ()
		{
			mask = RangerMask.define("{XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX}");
			expect(mask).toBeDefined();
			expect(mask).not.toBeNull();
		});

		it("should have proper blank value", function ()
		{
			expect(mask.maskedEmptyVal).toEqual("{________-____-____-____-____________}");
		});

		it("should init an invalid value", function ()
		{
			data = new Object();
			mask.apply(data, "qn-kl");
			expect(valueOf(mask, data)).toEqual("^{________-____-____-____-____________}^");
		});

		it("should init a valid value", function ()
		{
			data = new Object();
			mask.apply(data, "{F07DC0DA-F0DE-4F09-bcfd-63B36CC46FCF}");
			expect(valueOf(mask, data)).toEqual("^{F07DC0DA-F0DE-4F09-bcfd-63B36CC46FCF}^");
		});

		it("should init a partially valid value", function ()
		{
			data = new Object();
			mask.apply(data, "{F07DC0DA-F0DE-4F0");
			expect(valueOf(mask, data)).toEqual("^{F07DC0DA-F0DE-4F0_-____-____________}^");
		});
	});

	describe("Optional places mask", function ()
	{
		it("can be defined", function ()
		{
			mask = RangerMask.define("$##9");
			expect(mask).toBeDefined();
			expect(mask).not.toBeNull();
		});

		it("should have proper blank value", function ()
		{
			expect(mask.maskedEmptyVal).toEqual("$_");
		});

		it("should init an invalid value", function ()
		{
			data = new Object();
			mask.apply(data, "af");
			expect(valueOf(mask, data)).toEqual("^$_^");
		});

		it("should init a valid value", function ()
		{
			data = new Object();
			mask.apply(data, "$23");
			expect(valueOf(mask, data)).toEqual("^$23^");
		});

		it("should init a partially valid value", function ()
		{
			data = new Object();
			mask.apply(data, "a8");
			expect(valueOf(mask, data)).toEqual("^$8^");
		});
	});

	describe("Multi-char def mask", function ()
	{
		it("can be defined", function ()
		{
			mask = RangerMask.define("mm//dd//yyYY");
			expect(mask).toBeDefined();
			expect(mask).not.toBeNull();
		});

		it("should have proper blank value", function ()
		{
			expect(mask.maskedEmptyVal).toEqual("_/_/__");
		});

		it("should init an invalid value", function ()
		{
			data = new Object();
			mask.apply(data, "sdgh");
			expect(valueOf(mask, data)).toEqual("^_/_/__^");
		});

		it("should init a valid value", function ()
		{
			data = new Object();
			mask.apply(data, "2/3/1986");
			expect(valueOf(mask, data)).toEqual("^2/3/1986^");
		});

		it("should init a partially valid value", function ()
		{
			data = new Object();
			mask.apply(data, "/48/82");
			expect(valueOf(mask, data)).toEqual("^_/48/82^");
		});
	});
});