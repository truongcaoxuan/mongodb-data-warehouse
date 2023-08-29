# MongoDB aggregate - Task 3

## Requirement

Calculate the total account balances of people who are in the US.

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
    { $group: { _id: "$native_country", TOTAL: { $sum: "$finance.total"} } }

]).pretty();
```

## Result

```result
{
  _id: 'United-States',
  TOTAL: 5454025402
}
```
