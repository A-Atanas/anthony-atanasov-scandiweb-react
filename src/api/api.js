import { client, Query, Field, CombinedField } from "@tilework/opus";

client.setEndpoint("http://localhost:4000");
client.setHeaders({ "Access-Control-Allow-Origin": "*" });

export const getCategoriesAndCurrencies = async () => {
	const categories = new Query("categories").addField("name");
	const currencies = new Query("currencies").addFieldList(["label", "symbol"]);
	return await client.post(new CombinedField().add(categories).add(currencies));
};

const priceField = new Field("prices")
	.addField(
		new Field("currency").addField("symbol").addTransformation((currency) => currency.symbol)
	)
	.addField("amount");
const productMainFields = ["id", "name", "inStock", "gallery"];
export const getCategoryProducts = async (categoryID) => {
	const category = new Query("category")
		.addArgument("input", "CategoryInput", { title: categoryID })
		.addField(
			new Field("products", true).addFieldList(productMainFields).addField(priceField, true)
		);
	return await client.post(category);
};

const productAttributes = new Field("attributes", true)
	.addFieldList(["id", "name", "type"])
	.addField(new Field("items", true).addFieldList(["id", "displayValue", "value"]));
export const getProduct = async (productID) => {
	const product = new Query("product")
		.addArgument("id", "String!", productID)
		.addFieldList([...productMainFields, "description", "brand"])
		.addField(priceField, true)
		.addField(productAttributes);
	return await client.post(product);
};
