# MongoDB aggregate - Task 1

## Requirement

How many are female and work more than `30` hours per week?

## Solution

```agg
db.user.aggregate([
    { $match: { gender: "Male" } },
    {
        $lookup:
        {
            from: "occupation",
            localField: "occupation_id",
            foreignField: "_id",
            as: "occupation"
        }
    },
    {
        $project: {
            __v: 0,
            " occupation.__v": 0,
            " occupation._id": 0,
        }
    },
    { $unwind: "$occupation" },
    { $match: { $expr: { $gte: [  "$occupation.hours_per_week", 30 ] } } },
    { $count: "number of people are Female and work more than 30 hours per week" }
]).pretty();
```

## Result

```result
{
  'number of people are Female and work more than 30 hours per week': 19873
}
```
