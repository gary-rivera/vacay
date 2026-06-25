type Product = {
    product_id: number;
    low_fats: string;
    recyclable: string;
}

let products: Product[] = [
    {product_id: 0, low_fats: 'Y', recyclable: 'N'},
    {product_id: 1, low_fats: 'Y', recyclable: 'Y'},
    {product_id: 2, low_fats: 'N', recyclable: 'Y'},
    {product_id: 3, low_fats: 'Y', recyclable: 'Y'},
    {product_id: 4, low_fats: 'N', recyclable: 'N'}
];

let result: number[] = products.filter(product => product.low_fats === 'Y' && product.recyclable === 'Y').map(product => product.product_id);

console.log(result);

/*
question: Table: Products

+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| product_id  | int     |
| low_fats    | enum    |
| recyclable  | enum    |
+-------------+---------+
product_id is the primary key (column with unique values) for this table.
low_fats is an ENUM (category) of type ('Y', 'N') where 'Y' means this product is low fat and 'N' means it is not.
recyclable is an ENUM (category) of types ('Y', 'N') where 'Y' means this product is recyclable and 'N' means it is not.

 

Write a solution to find the ids of products that are both low fat and recyclable.

Return the result table in any order.

The result format is in the following example.

 
Example 1:

Input: 
Products table:
+-------------+----------+------------+
| product_id  | low_fats | recyclable |
+-------------+----------+------------+
| 0           | Y        | N          |
| 1           | Y        | Y          |
| 2           | N        | Y          |
| 3           | Y        | Y          |
| 4           | N        | N          |
+-------------+----------+------------+
Output: 
+-------------+
| product_id  |
+-------------+
| 1           |
| 3           |
+-------------+
Explanation: Only products 1 and 3 are both low fat and recyclable.

 */
