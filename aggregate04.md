# MongoDB aggregate - Task 4

## Requirement

Calculate the total number of working hours a week of people with income <= 50K

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
    { $match: { "finance.income_bracket": "<=50K" } },
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
    { $group: { _id: { "income_bracket": "$finance.income_bracket"}, Total_hours_per_week: { $sum: "$occupation.hours_per_week"} } }
]).pretty();
```

## Result

```result
{
  _id: {
    income_bracket: '<=50K'
  },
  Total_hours_per_week: 959341
}
```
