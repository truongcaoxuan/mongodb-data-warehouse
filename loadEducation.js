function loadEducation() {
	const bulkInsert = db.education.initializeUnorderedBulkOp();
	// Get all Documents in 'USAdultIncome' Collection
	const documents = db.USAdultIncome.find({});

	// Process each document
	documents.forEach(function (doc) {
		const element = {
			education: doc.education,
			education_num: doc.education_num
		};
		// Upsert into education Document
		bulkInsert.find(element).upsert().replaceOne(element);
	});
	bulkInsert.execute();
	return true;
}