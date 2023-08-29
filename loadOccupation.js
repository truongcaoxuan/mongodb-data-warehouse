function loadOccupation() {
	const bulkInsert = db.occupation.initializeUnorderedBulkOp();
	// Get all Documents in 'USAdultIncome' Collection
	const documents = db.USAdultIncome.find({});

	// Process each document
	documents.forEach(function (doc) {
		const element = {
			occupation: doc.occupation,
			workclass: doc.workclass,
			hours_per_week: doc.hours_per_week
		};
		// Upsert into education Document
		bulkInsert.find(element).upsert().replaceOne(element);
	});
	bulkInsert.execute();
	return true;
}