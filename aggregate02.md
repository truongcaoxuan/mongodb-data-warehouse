# MongoDB aggregate - Task 2

## Requirement

How many people in the US have an income > `50K` ?

## Solution

```agg
db.user.aggregate([
    { $match: { native_country: "United-States"} },
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
    { $match: { "finance.income_bracket": ">50K" } },
    { $count: "the number of people in the US with an income greater than 50k" }
]).pretty();
```

## Result

```result
{
  'the number of people in the US with an income greater than 50k': 7169
}
```
