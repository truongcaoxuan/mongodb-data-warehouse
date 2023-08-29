function loadFinance() {
	const bulkInsert = db.finance.initializeUnorderedBulkOp();
	// Get all Documents in 'USAdultIncome' Collection
	const documents = db.USAdultIncome.find({});

	// Process each document
	documents.forEach(function (doc) {
		const element = {
			capital_gain: doc.capital_gain,
			capital_loss: doc.capital_loss,
			income_bracket: doc.income_bracket,
			total: doc.total
		};
		// Upsert into education Document
		bulkInsert.find(element).upsert().replaceOne(element);
	});
	bulkInsert.execute();
	return true;
}