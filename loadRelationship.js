function loadRelationship() {
	const bulkInsert = db.relationship.initializeUnorderedBulkOp();
	// Get all Documents in 'USAdultIncome' Collection
	const documents = db.USAdultIncome.find({});

	// Process each document
	documents.forEach(function (doc) {
		const element = {
			marital_status: doc.marital_status,
			relationship: doc.relationship
		};
		// Upsert into education Document
		bulkInsert.find(element).upsert().replaceOne(element);
	});
	bulkInsert.execute();
	return true;
}