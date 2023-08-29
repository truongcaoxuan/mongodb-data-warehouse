# MongoDB aggregate - Task 5

## Requirement

Find people with total account balance > 100000 and weekly working hours < 55.

## Solution

```agg
db.user.aggregate([
    {
        $lookup:
        {
            from: "finance",
            localField: "finance_id",
            foreignField: "_id",
            as: "finance"
        }
    },
    { $unwind: "$finance" },
    { $match: { $expr: { $gt: [  "$finance.total", 100000 ] } } },
    {
        $lookup:
        {
            from: "occupation",
            localField: "occupation_id",
            foreignField: "_id",
            as: "occupation"
        }
    },
    { $unwind: "$occupation" },
    { $match: { $expr: { $lt: [  "$occupation.hours_per_week", 55 ] } } },
]).pretty();
```

## Result

```result
{
  _id: ObjectId("64b4b8b6de1eafff3d247225"),
  age: 38,
  gender: 'Male',
  native_country: 'United-States',
  race: 'White',
  education_id: ObjectId("64b3545cd30e63efbc2aad56"),
  occupation_id: ObjectId("64b358c9d30e63efbc2ab07c"),
  relationship_id: ObjectId("64b35b22d30e63efbc2ab9fe"),
  finance_id: ObjectId("64b35d85d30e63efbc2b2575"),
  finance: {
    _id: ObjectId("64b35d85d30e63efbc2b2575"),
    capital_gain: 0,
    capital_loss: 0,
    income_bracket: '<=50K',
    total: 215646
  },
  occupation: {
    _id: ObjectId("64b358c9d30e63efbc2ab07c"),
    occupation: 'Handlers-cleaners',
    workclass: 'Private',
    hours_per_week: 40
  }
}
{
  _id: ObjectId("64b4b8b6de1eafff3d247227"),
  age: 37,
  gender: 'Female',
  native_country: 'United-States',
  race: 'White',
  education_id: ObjectId("64b3545cd30e63efbc2aad58"),
  occupation_id: ObjectId("64b358c9d30e63efbc2ab07e"),
  relationship_id: ObjectId("64b35b22d30e63efbc2aba00"),
  finance_id: ObjectId("64b35d85d30e63efbc2b2577"),
  finance: {
    _id: ObjectId("64b35d85d30e63efbc2b2577"),
    capital_gain: 0,
    capital_loss: 0,
    income_bracket: '<=50K',
    total: 284582
  },
  occupation: {
    _id: ObjectId("64b358c9d30e63efbc2ab07e"),
    occupation: 'Exec-managerial',
    workclass: 'Private',
    hours_per_week: 40
  }
}
...
```
