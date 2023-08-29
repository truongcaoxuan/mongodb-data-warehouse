function loadUser() {
	const bulkInsert = db.user.initializeUnorderedBulkOp();
	// Get all Documents in 'USAdultIncome' Collection
	const documents = db.USAdultIncome.find({});

	// Process each document
	documents.forEach(function (doc) {
		const element = {
			age: doc.age,
			gender: doc.gender,
			native_country: doc.native_country,
			race: doc.race,
		};

		// Get education PK
		const education = db.education.findOne({
			education: doc.education,
			education_num: doc.education_num
		});
		element.education_id = education._id;

		// Get occupation PK
		const occupation = db.occupation.findOne({
			occupation: doc.occupation,
			workclass: doc.workclass,
			hours_per_week: doc.hours_per_week
		});
		element.occupation_id = occupation._id;
		
		// Get relationship PK
		const relationship = db.relationship.findOne({
			relationship: doc.relationship,
			marital_status: doc.marital_status
		});
		element.relationship_id = relationship._id;
		
		// Get finance PK
		const finance = db.finance.findOne({
			capital_gain: doc.capital_gain,
			capital_loss: doc.capital_loss,
			income_bracket: doc.income_bracket,
			total: doc.total
		});
		element.finance_id = finance._id;
		
		// Upsert into user collection
		bulkInsert.find(element).upsert().replaceOne(element);
	});

	bulkInsert.execute();
	return true;
}