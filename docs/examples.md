# TSL Examples

A collection of working TSL programs organized by feature category.

All examples are in the `examples/` directory and transpile to valid JavaScript.

---

## Table of Contents

- [Basic](#basic)
- [Control Flow](#control-flow)
- [Functions](#functions)
- [Arrays](#arrays)
- [Objects](#objects)
- [Advanced](#advanced)

---


## Basic

### 1. abs.tsl -- Abs

```tsl
# Absolute Value
function abs(x):
    if x < (0 - 1):
        return (0 - x)
    else:
        return x

print(abs((0 - 5)))
print(abs(5))
```

### 2. calculator.tsl -- Calculator

```tsl
# Multiple Functions
function add(a, b):
    return a + b

function subtract(a, b):
    return a - b

function multiply(a, b):
    return a * b

function divide(a, b):
    return a / b

print(add(10, 5))
print(subtract(10, 5))
print(multiply(10, 5))
print(divide(10, 5))
```

### 3. comparison.tsl -- Comparison

```tsl
# Comparison Operators
a = 10
b = 20

print(a == b)
print(a != b)
print(a < b)
print(a > b)
print(a <= b)
print(a >= b)
```

### 4. complex_expression.tsl -- Complex_expression

```tsl
# Complex Expression
result = ((10 + 20) * 3) - (5 / 2)
print(result)
```

### 5. complex_object.tsl -- Complex_object

```tsl
# Complex Object
emp1 = { name: "Alice", role: "Engineer" }
emp2 = { name: "Bob", role: "Designer" }
company = { name: "TSL Inc", founded: 2024, employees: [emp1, emp2], active: true }

print(company.name)
print(company.employees[0].name)
```

### 6. empty.tsl -- Empty

```tsl
# Empty Array and Object
empty_array = []
empty_object = {}

print(empty_array)
print(empty_object)
```

### 7. floats.tsl -- Floats

```tsl
# Float Numbers
pi = 3.14159
radius = 5
area = pi * radius * radius
print(area)
```

### 8. fruits.tsl -- Fruits

```tsl
# Array of Strings
fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(fruit)
```

### 9. hello.tsl -- Hello

```tsl
# Hello World
print("Hello, World!")
```

### 10. logical.tsl -- Logical

```tsl
# Logical Operators
a = true
b = false

print(a and b)
print(a or b)
print(not a)
```

### 11. math.tsl -- Math

```tsl
# Math Operations
a = 10
b = 3

print(a + b)
print(a - b)
print(a * b)
print(a / b)
print(a % b)
```

### 12. nested.tsl -- Nested

```tsl
# Nested Control Flow
x = 15
y = 20

if x > 10:
    if y > 15:
        print("both big")
    else:
        print("x big, y small")
else:
    print("x small")
```

### 13. nested_if.tsl -- Nested_if

```tsl
# Nested If
x = 10
y = 20

if x > 0:
    if y > 0:
        print("Both positive")
    else:
        print("x positive, y not")
else:
    print("x not positive")
```

### 14. nested_loops.tsl -- Nested_loops

```tsl
# Nested Loops
for i in range(3):
    for j in range(3):
        print(i + "," + j)
```

### 15. nested_objects.tsl -- Nested_objects

```tsl
# Object with Nested Object
app = { name: "MyApp", version: 1 }
config = { app: app, debug: true }

print(config.app.name)
print(config.debug)
```

### 16. null_check.tsl -- Null_check

```tsl
# Null Check
value = null

if value == null:
    print("value is null")
else:
    print("value is not null")
```

### 17. power.tsl -- Power

```tsl
# Power Function
function power(base, exp):
    result = 1
    i = 0
    while i < exp:
        result = result * base
        i = i + 1
    return result

print(power(2, 10))
```

### 18. reassignment.tsl -- Reassignment

```tsl
# Variable Reassignment
x = 10
print(x)

x = 20
print(x)

x = "changed"
print(x)
```

### 19. scores.tsl -- Scores

```tsl
# Array of Numbers
scores = [95, 87, 92, 78, 99]

for score in scores:
    print(score)
```

### 20. squares.tsl -- Squares

```tsl
# For Loop with Math
for i in range(5):
    print(i * i)
```

### 21. strings.tsl -- Strings

```tsl
# String Concatenation
first = "Hello"
last = "World"
message = first + " " + last
print(message)
```

### 22. unary.tsl -- Unary

```tsl
# Negation and Logical Operators
x = 5
y = 0 - x
print(y)

a = true
b = false
result = not a
print(result)
result = not b
print(result)
```

### 23. variables.tsl -- Variables

```tsl
# Variables
name = "TSL"
version = 1
is_ready = true
nothing = null

print(name)
print(version)
print(is_ready)
print(nothing)
```


## Control Flow

### 1. binary_search.tsl -- Binary_search

```tsl
# Binary Search
function binary_search(arr, target):
    low = 0
    high = 9
    
    while low <= high:
        mid = (low + high) / 2
        mid = mid - (mid % 1)
        
        if arr[mid] == target:
            return mid
        else:
            if arr[mid] < target:
                low = mid + 1
            else:
                high = mid - 1
    
    return (0 - 1)

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
result = binary_search(numbers, 7)
print(result)
```

### 2. break_continue.tsl -- Break_continue

```tsl
# Break and Continue
for i in range(10):
    if i == 3:
        continue
    if i == 7:
        break
    print(i)
```

### 3. break_loop.tsl -- Break_loop

```tsl
# Loop with Break
for i in range(100):
    if i == 10:
        break
    print(i)

print("Stopped at 10")
```

### 4. continue_loop.tsl -- Continue_loop

```tsl
# Loop with Continue
for i in range(10):
    if i % 2 == 0:
        continue
    print(i)
```

### 5. count.tsl -- Count

```tsl
# Count Occurrences
words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
target = "apple"
count = 0

for word in words:
    if word == target:
        count = count + 1

print(count)
```

### 6. for.tsl -- For

```tsl
# For Loop
for i in range(5):
    print(i)
```

### 7. for_each.tsl -- For_each

```tsl
# For with Array Iteration
colors = ["red", "green", "blue"]

for color in colors:
    print(color)
```

### 8. if.tsl -- If

```tsl
# If / Else
x = 15

if x > 10:
    print("big")
else:
    print("small")
```

### 9. roman.tsl -- Roman

```tsl
# Roman Numerals
function to_roman(num):
    if num >= 1000:
        return "M" + to_roman(num - 1000)
    else:
        if num >= 900:
            return "CM" + to_roman(num - 900)
        else:
            if num >= 500:
                return "D" + to_roman(num - 500)
            else:
                if num >= 400:
                    return "CD" + to_roman(num - 400)
                else:
                    if num >= 100:
                        return "C" + to_roman(num - 100)
                    else:
                        if num >= 90:
                            return "XC" + to_roman(num - 90)
                        else:
                            if num >= 50:
                                return "L" + to_roman(num - 50)
                            else:
                                if num >= 40:
                                    return "XL" + to_roman(num - 40)
                                else:
                                    if num >= 10:
                                        return "X" + to_roman(num - 10)
                                    else:
                                        if num == 9:
                                            return "IX"
                                        else:
                                            if num >= 5:
                                                return "V" + to_roman(num - 5)
                                            else:
                                                if num == 4:
                                                    return "IV"
                                                else:
                                                    if num >= 1:
                                                        return "I" + to_roman(num - 1)
                                                    else:
                                                        return ""

print(to_roman(2024))
```

### 10. search.tsl -- Search

```tsl
# Array Search
numbers = [5, 3, 8, 1, 9, 2, 7]
target = 7
found = false

for num in numbers:
    if num == target:
        found = true
        break

if found:
    print("Found!")
else:
    print("Not found")
```

### 11. swap.tsl -- Swap

```tsl
# Multiple Assignments
a = 1
b = 2
c = 3

temp = a
a = b
b = c
c = temp

print(a)
print(b)
print(c)
```

### 12. while.tsl -- While

```tsl
# While Loop
counter = 3

while counter > 0:
    print(counter)
    counter = counter - 1

print("Go!")
```

### 13. while_break.tsl -- While_break

```tsl
# While Loop with Break
i = 0

while true:
    i = i + 1
    if i == 5:
        break

print(i)
```

### 14. while_counter.tsl -- While_counter

```tsl
# While with Condition
counter = 0

while counter < 5:
    counter = counter + 1

print(counter)
```

### 15. word_break.tsl -- Word_break

```tsl
# Dynamic Programming - Word Break
function string_length(s):
    len = 0
    for ch in s:
        len = len + 1
    return len

function word_break(s, word_dict):
    n = string_length(s)
    dp = []
    i = 0
    while i <= n:
        dp[i] = false
        i = i + 1
    dp[0] = true
    
    i = 1
    while i <= n:
        j = 0
        while j < i:
            sub = ""
            k = j
            while k < i:
                sub = sub + get_char(s, k)
                k = k + 1
            if dp[j] == true and sub == word_dict:
                dp[i] = true
                break
            j = j + 1
        i = i + 1
    
    return dp[n]

function get_char(s, i):
    j = 0
    for ch in s:
        if j == i:
            return ch
        j = j + 1
    return ""

s = "leetcode"
word_dict = "code"
result = word_break(s, word_dict)
print(result)
```


## Functions

### 1. function_array.tsl -- Function_array

```tsl
# Function with Array
function sum_array(arr):
    total = 0
    for item in arr:
        total = total + item
    return total

numbers = [1, 2, 3, 4, 5]
result = sum_array(numbers)
print(result)
```

### 2. function_chaining.tsl -- Function_chaining

```tsl
# Function Calling Function
function square(x):
    return x * x

function cube(x):
    return square(x) * x

result = cube(3)
print(result)
```

### 3. function_guard.tsl -- Function_guard

```tsl
# Function with Default-like Behavior
function divide(a, b):
    if b == 0:
        return null
    return a / b

result = divide(10, 2)
print(result)

result = divide(10, 0)
print(result)
```

### 4. function_object_param.tsl -- Function_object_param

```tsl
# Function with Object Parameter
function describe(person):
    message = person.name + " is " + person.age + " years old"
    return message

alice = { name: "Alice", age: 25 }
print(describe(alice))
```

### 5. function_params.tsl -- Function_params

```tsl
# Function with Multiple Parameters
function greet(name, age):
    message = "Hello, " + name + " you are " + age + " years old"
    return message

result = greet("Alice", 25)
print(result)
```

### 6. function_return_array.tsl -- Function_return_array

```tsl
# Function with Array Return
function get_range(n):
    result = []
    i = 0
    while i < n:
        result[i] = i
        i = i + 1
    return result

numbers = get_range(5)
print(numbers[0])
print(numbers[4])
```

### 7. functions.tsl -- Functions

```tsl
# Functions
function add(a, b):
    return a + b

result = add(10, 20)
print(result)
```


## Arrays

### 1. array_expression.tsl -- Array_expression

```tsl
# Array Access in Expression
numbers = [10, 20, 30, 40, 50]
result = numbers[0] + numbers[4]
print(result)
```

### 2. array_of_objects.tsl -- Array_of_objects

```tsl
# Array of Objects
student1 = { name: "Alice", age: 20, gpa: 3.5 }
student2 = { name: "Bob", age: 22, gpa: 3.8 }
student3 = { name: "Charlie", age: 21, gpa: 3.2 }
students = [student1, student2, student3]

print(students[0].name)
print(students[1].gpa)
```

### 3. arrays.tsl -- Arrays

```tsl
# Arrays
numbers = [1, 2, 3, 4, 5]

first = numbers[0]
print(first)

last = numbers[4]
print(last)
```

### 4. mixed_array.tsl -- Mixed_array

```tsl
# Mixed Types in Array
mixed = [1, "two", true, null, 3.14]

print(mixed[0])
print(mixed[1])
print(mixed[2])
print(mixed[3])
print(mixed[4])
```


## Objects

### 1. object_clone.tsl -- Object_clone

```tsl
# Object Clone
original = { x: 10, y: 20 }
clone = { x: original.x, y: original.y }

print(clone.x)
print(clone.y)
```

### 2. object_method.tsl -- Object_method

```tsl
# Object with Method
function create_point(x, y):
    return { x: x, y: y }

function point_distance(p1, p2):
    dx = p2.x - p1.x
    dy = p2.y - p1.y
    return dx * dx + dy * dy

p1 = create_point(0, 0)
p2 = create_point(3, 4)
print(point_distance(p1, p2))
```

### 3. objects.tsl -- Objects

```tsl
# Objects
player = { x: 100, y: 200, name: "Hero" }

print(player.x)
print(player.y)
print(player.name)
```


## Advanced

### 1. bfs.tsl -- Bfs

```tsl
# Breadth First Search
function create_graph():
    return { edges: [] }

function graph_add_edge(graph, u, v):
    graph.edges[graph.edges.length] = { from: u, to: v }

function graph_bfs(graph, start):
    visited = {}
    queue = []
    queue[0] = start
    front = 0
    
    while front < queue.length:
        v = queue[front]
        front = front + 1
        
        if visited[v] != true:
            print(v)
            visited[v] = true
            
            i = 0
            while i < graph.edges.length:
                edge = graph.edges[i]
                if edge.from == v:
                    queue[queue.length] = edge.to
                i = i + 1

graph = create_graph()
graph_add_edge(graph, "A", "B")
graph_add_edge(graph, "A", "C")
graph_add_edge(graph, "B", "D")
graph_add_edge(graph, "C", "E")
graph_bfs(graph, "A")
```

### 2. binary_tree.tsl -- Binary_tree

```tsl
# Binary Tree Node
function create_tree_node(value):
    return { value: value, left: null, right: null }

# Insert into BST
function insert(root, value):
    if root == null:
        return create_tree_node(value)
    
    if value < root.value:
        root.left = insert(root.left, value)
    else:
        root.right = insert(root.right, value)
    
    return root

# In-order traversal
function inorder(root):
    if root != null:
        inorder(root.left)
        print(root.value)
        inorder(root.right)

root = null
root = insert(root, 5)
root = insert(root, 3)
root = insert(root, 7)
root = insert(root, 1)
root = insert(root, 4)

inorder(root)
```

### 3. boolean_logic.tsl -- Boolean_logic

```tsl
# Boolean Logic
a = true
b = false
c = true

result = (a and b) or c
print(result)
```

### 4. bubble_sort.tsl -- Bubble_sort

```tsl
# Sorting (Bubble Sort)
arr = [5, 3, 8, 1, 2]
n = 5
i = 0

while i < n:
    j = 0
    while j < (n - 1):
        if arr[j] > arr[j + 1]:
            temp = arr[j]
            arr[j] = arr[j + 1]
            arr[j + 1] = temp
        j = j + 1
    i = i + 1

for item in arr:
    print(item)
```

### 5. class_like.tsl -- Class_like

```tsl
# Object with Array
person = { name: "Alice", age: 25, hobbies: ["reading", "coding"] }

print(person.name)
print(person.hobbies[0])
```

### 6. closure.tsl -- Closure

```tsl
# Closure
function create_counter():
    count = 0
    
    return { value: count }

function counter_increment(counter):
    counter.value = counter.value + 1

counter = create_counter()
counter_increment(counter)
counter_increment(counter)
print(counter.value)
```

### 7. coin_change.tsl -- Coin_change

```tsl
# Dynamic Programming - Coin Change
function coin_change(coins, amount):
    dp = []
    i = 0
    while i <= amount:
        dp[i] = 999999
        i = i + 1
    dp[0] = 0
    
    i = 0
    while i < coins.length:
        j = coins[i]
        while j <= amount:
            if dp[j - coins[i]] + 1 < dp[j]:
                dp[j] = dp[j - coins[i]] + 1
            j = j + 1
        i = i + 1
    
    if dp[amount] > amount:
        return (0 - 1)
    return dp[amount]

coins = [1, 2, 5]
amount = 11
result = coin_change(coins, amount)
print(result)
```

### 8. days_in_month.tsl -- Days_in_month

```tsl
# Days in Month
function days_in_month(month, year):
    if month == 2:
        if year % 4 == 0:
            if year % 100 == 0:
                if year % 400 == 0:
                    return 29
                else:
                    return 28
            else:
                return 29
        else:
            return 28
    else:
        if month == 4 or month == 6 or month == 9 or month == 11:
            return 30
        else:
            return 31

print(days_in_month(2, 2024))
print(days_in_month(1, 2024))
```

### 9. dfs.tsl -- Dfs

```tsl
# Depth First Search
function create_graph():
    return { edges: [] }

function graph_add_edge(graph, u, v):
    graph.edges[graph.edges.length] = { from: u, to: v }

function graph_dfs(graph, start):
    visited = {}
    stack = []
    stack[0] = start
    
    while stack.length > 0:
        v = stack[stack.length - 1]
        stack.length = stack.length - 1
        
        if visited[v] != true:
            print(v)
            visited[v] = true
            
            i = 0
            while i < graph.edges.length:
                edge = graph.edges[i]
                if edge.to == v:
                    stack[stack.length] = edge.from
                i = i + 1

graph = create_graph()
graph_add_edge(graph, "A", "B")
graph_add_edge(graph, "A", "C")
graph_add_edge(graph, "B", "D")
graph_add_edge(graph, "C", "E")
graph_dfs(graph, "A")
```

### 10. dijkstra.tsl -- Dijkstra

```tsl
# Dijkstra's Algorithm
function create_graph():
    return { edges: [] }

function graph_add_edge(graph, u, v, w):
    graph.edges[graph.edges.length] = { from: u, to: v, weight: w }

function graph_dijkstra(graph, start):
    dist = {}
    visited = {}
    nodes = []
    
    i = 0
    while i < graph.edges.length:
        edge = graph.edges[i]
        if dist[edge.from] == null:
            dist[edge.from] = 999999
        if nodes.indexOf(edge.from) == (0 - 1):
            nodes[nodes.length] = edge.from
        if dist[edge.to] == null:
            dist[edge.to] = 999999
        if nodes.indexOf(edge.to) == (0 - 1):
            nodes[nodes.length] = edge.to
        i = i + 1
    
    dist[start] = 0
    
    i = 0
    while i < nodes.length:
        u = ""
        min_dist = 999999
        j = 0
        while j < nodes.length:
            node = nodes[j]
            if visited[node] != true and dist[node] < min_dist:
                min_dist = dist[node]
                u = node
            j = j + 1
        
        if u == "":
            break
        
        visited[u] = true
        
        j = 0
        while j < graph.edges.length:
            edge = graph.edges[j]
            if edge.from == u:
                v = edge.to
                w = edge.weight
                if dist[u] + w < dist[v]:
                    dist[v] = dist[u] + w
            j = j + 1
        i = i + 1
    
    for node in nodes:
        print(node + ": " + dist[node])

graph = create_graph()
graph_add_edge(graph, "A", "B", 4)
graph_add_edge(graph, "A", "C", 2)
graph_add_edge(graph, "B", "C", 1)
graph_add_edge(graph, "B", "D", 5)
graph_add_edge(graph, "C", "D", 8)
graph_dijkstra(graph, "A")
```

### 11. edit_distance.tsl -- Edit_distance

```tsl
# Dynamic Programming - Edit Distance
function string_length(s):
    len = 0
    for ch in s:
        len = len + 1
    return len

function get_char(s, i):
    j = 0
    for ch in s:
        if j == i:
            return ch
        j = j + 1
    return ""

function edit_distance(s1, s2):
    m = string_length(s1)
    n = string_length(s2)
    
    dp = []
    i = 0
    while i <= m:
        dp[i] = []
        j = 0
        while j <= n:
            if i == 0:
                dp[i][j] = j
            else:
                if j == 0:
                    dp[i][j] = i
                else:
                    if get_char(s1, i - 1) == get_char(s2, j - 1):
                        dp[i][j] = dp[i - 1][j - 1]
                    else:
                        dp[i][j] = (1 + min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]))
            j = j + 1
        i = i + 1
    
    return dp[m][n]

function min(a, b, c):
    m = a
    if b < m:
        m = b
    if c < m:
        m = c
    return m

result = edit_distance("kitten", "sitting")
print(result)
```

### 12. even_odd.tsl -- Even_odd

```tsl
# Even or Odd
for i in range(10):
    if i % 2 == 0:
        print(i + " is even")
    else:
        print(i + " is odd")
```

### 13. factorial_loop.tsl -- Factorial_loop

```tsl
# Factorial with Loop
n = 5
result = 1
i = 1

while i <= n:
    result = result * i
    i = i + 1

print(result)
```

### 14. fibonacci.tsl -- Fibonacci

```tsl
# Fibonacci
function fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

for i in range(10):
    print(fibonacci(i))
```

### 15. fibonacci_dp.tsl -- Fibonacci_dp

```tsl
# Dynamic Programming - Fibonacci
function fibonacci(n):
    if n <= 1:
        return n
    
    prev2 = 0
    prev1 = 1
    current = 0
    i = 2
    
    while i <= n:
        current = prev1 + prev2
        prev2 = prev1
        prev1 = current
        i = i + 1
    
    return current

print(fibonacci(10))
```

### 16. find_max.tsl -- Find_max

```tsl
# Find Maximum
numbers = [15, 3, 8, 1, 9, 2, 7]
max = numbers[0]
i = 1

while i < 7:
    if numbers[i] > max:
        max = numbers[i]
    i = i + 1

print(max)
```

### 17. gcd.tsl -- Gcd

```tsl
# GCD (Greatest Common Divisor)
function gcd(a, b):
    while b != 0:
        temp = b
        b = a % b
        a = temp
    return a

print(gcd(48, 18))
```

### 18. graph.tsl -- Graph

```tsl
# Graph Adjacency List
function create_graph():
    return { vertices: [], edges: [] }

function graph_add_vertex(graph, v):
    graph.vertices[graph.vertices.length] = v

function graph_add_edge(graph, v1, v2):
    graph.edges[graph.edges.length] = { from: v1, to: v2 }

function graph_print(graph):
    for edge in graph.edges:
        print(edge.from + " -> " + edge.to)

graph = create_graph()
graph_add_vertex(graph, "A")
graph_add_vertex(graph, "B")
graph_add_vertex(graph, "C")
graph_add_edge(graph, "A", "B")
graph_add_edge(graph, "B", "C")
graph_add_edge(graph, "C", "A")
graph_print(graph)
```

### 19. hash_table.tsl -- Hash_table

```tsl
# Hash Table
function string_length(s):
    len = 0
    for ch in s:
        len = len + 1
    return len

function string_hash(key):
    sum = 0
    i = 0
    while i < string_length(key):
        sum = sum + i
        i = i + 1
    return sum

function create_hash_table():
    buckets = []
    i = 0
    while i < 16:
        buckets[i] = null
        i = i + 1
    return { buckets: buckets }

function hash_table_put(table, key, value):
    index = string_hash(key) % 16
    node = { key: key, value: value, next: table.buckets[index] }
    table.buckets[index] = node

function hash_table_get(table, key):
    index = string_hash(key) % 16
    current = table.buckets[index]
    while current != null:
        if current.key == key:
            return current.value
        current = current.next
    return null

table = create_hash_table()
hash_table_put(table, "name", "Alice")
hash_table_put(table, "age", "25")
print(hash_table_get(table, "name"))
print(hash_table_get(table, "age"))
```

### 20. house_robber.tsl -- House_robber

```tsl
# Dynamic Programming - House Robber
function rob(houses):
    n = 0
    for item in houses:
        n = n + 1
    if n == 0:
        return 0
    else:
        if n == 1:
            return houses[0]
    
    prev2 = 0
    prev1 = houses[0]
    i = 1
    
    while i < n:
        current = prev1
        include = prev2 + houses[i]
        exclude = prev1
        if include > exclude:
            prev2 = prev1
            prev1 = include
        else:
            prev2 = prev1
        i = i + 1
    
    return prev1

houses = [2, 7, 9, 3, 1]
result = rob(houses)
print(result)
```

### 21. is_adult.tsl -- Is_adult

```tsl
# Function with Logical Operators
function is_adult(age):
    return age >= 18 and age <= 120

result = is_adult(20)
print(result)
```

### 22. knapsack.tsl -- Knapsack

```tsl
# Dynamic Programming - Knapsack
function knapsack(capacity, weights, values):
    n = 0
    for item in weights:
        n = n + 1
    
    dp = []
    i = 0
    while i <= n:
        dp[i] = []
        j = 0
        while j <= capacity:
            dp[i][j] = 0
            j = j + 1
        i = i + 1
    
    i = 0
    while i < n:
        j = 0
        while j <= capacity:
            if weights[i] <= j:
                include = values[i] + dp[i - 1][j - weights[i]]
                exclude = dp[i - 1][j]
                if include > exclude:
                    dp[i][j] = include
                else:
                    dp[i][j] = exclude
            else:
                dp[i][j] = dp[i - 1][j]
            j = j + 1
        i = i + 1
    
    return dp[n - 1][capacity]

weights = [2, 3, 4, 5]
values = [3, 4, 5, 6]
capacity = 5
result = knapsack(capacity, weights, values)
print(result)
```

### 23. knapsack_01.tsl -- Knapsack_01

```tsl
# Dynamic Programming - 0/1 Knapsack (Space Optimized)
function knapsack_01(capacity, weights, values):
    n = 0
    for item in weights:
        n = n + 1
    
    dp = []
    j = 0
    while j <= capacity:
        dp[j] = 0
        j = j + 1
    
    i = 0
    while i < n:
        j = capacity
        while j >= 0:
            if weights[i] <= j:
                include = values[i] + dp[j - weights[i]]
                if include > dp[j]:
                    dp[j] = include
            j = j - 1
        i = i + 1
    
    return dp[capacity]

weights = [2, 3, 4, 5]
values = [3, 4, 5, 6]
capacity = 5
result = knapsack_01(capacity, weights, values)
print(result)
```

### 24. lcm.tsl -- Lcm

```tsl
# LCM (Least Common Multiple)
function gcd(a, b):
    while b != 0:
        temp = b
        b = a % b
        a = temp
    return a

function lcm(a, b):
    return (a * b) / gcd(a, b)

print(lcm(4, 6))
```

### 25. lcs.tsl -- Lcs

```tsl
# Dynamic Programming - Longest Common Subsequence
function lcs(s1, s2):
    m = 0
    for ch in s1:
        m = m + 1
    
    n = 0
    for ch in s2:
        n = n + 1
    
    dp = []
    i = 0
    while i <= m:
        dp[i] = []
        j = 0
        while j <= n:
            dp[i][j] = 0
            j = j + 1
        i = i + 1
    
    i = 1
    while i <= m:
        j = 1
        while j <= n:
            if s1[i - 1] == s2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                if dp[i - 1][j] > dp[i][j - 1]:
                    dp[i][j] = dp[i - 1][j]
                else:
                    dp[i][j] = dp[i][j - 1]
            j = j + 1
        i = i + 1
    
    return dp[m][n]

result = lcs("AGGTAB", "GXTXAYB")
print(result)
```

### 26. leap_year.tsl -- Leap_year

```tsl
# Leap Year Check
function is_leap_year(year):
    if year % 4 == 0:
        if year % 100 == 0:
            if year % 400 == 0:
                return true
            else:
                return false
        else:
            return true
    else:
        return false

print(is_leap_year(2024))
print(is_leap_year(1900))
print(is_leap_year(2000))
```

### 27. linked_list.tsl -- Linked_list

```tsl
# Linked List
function create_node(value):
    return { value: value, next: null }

function create_list():
    return { head: null, size: 0 }

function list_append(list, value):
    node = create_node(value)
    if list.head == null:
        list.head = node
    else:
        current = list.head
        while current.next != null:
            current = current.next
        current.next = node
    list.size = list.size + 1

function list_print(list):
    current = list.head
    while current != null:
        print(current.value)
        current = current.next

list = create_list()
list_append(list, 1)
list_append(list, 2)
list_append(list, 3)
list_print(list)
```

### 28. lis.tsl -- Lis

```tsl
# Dynamic Programming - Longest Increasing Subsequence
function lis(arr):
    n = 0
    for item in arr:
        n = n + 1
    
    if n == 0:
        return 0
    
    dp = []
    i = 0
    while i < n:
        dp[i] = 1
        i = i + 1
    
    i = 1
    while i < n:
        j = 0
        while j < i:
            if arr[i] > arr[j] and dp[j] + 1 > dp[i]:
                dp[i] = dp[j] + 1
            j = j + 1
        i = i + 1
    
    max_len = 0
    i = 0
    while i < n:
        if dp[i] > max_len:
            max_len = dp[i]
        i = i + 1
    
    return max_len

arr = [10, 22, 9, 33, 21, 50, 41, 60]
result = lis(arr)
print(result)
```

### 29. matrix.tsl -- Matrix

```tsl
# Matrix Operations
row1 = [1, 2, 3]
row2 = [4, 5, 6]
row3 = [7, 8, 9]
matrix = [row1, row2, row3]

row = 0
while row < 3:
    col = 0
    while col < 3:
        print(matrix[row][col])
        col = col + 1
    row = row + 1
```

### 30. matrix_chain.tsl -- Matrix_chain

```tsl
# Dynamic Programming - Matrix Chain Multiplication
function matrix_chain(p):
    n = p.length - 1
    dp = []
    s = []
    
    i = 0
    while i < n:
        dp[i] = []
        s[i] = []
        j = 0
        while j < n:
            dp[i][j] = 0
            s[i][j] = 0
            j = j + 1
        i = i + 1
    
    l = 2
    while l <= n:
        i = 0
        while i <= n - l:
            j = i + l - 1
            dp[i][j] = 999999
            k = i
            while k < j:
                q = dp[i][k] + dp[k + 1][j] + p[i] * p[k + 1] * p[j + 1]
                if q < dp[i][j]:
                    dp[i][j] = q
                    s[i][j] = k
                k = k + 1
            i = i + 1
        l = l + 1
    
    return dp[0][n - 1]

p = [1, 2, 3, 4]
result = matrix_chain(p)
print(result)
```

### 31. member_access.tsl -- Member_access

```tsl
# Member Access
matrix = { rows: 3, cols: 4, data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }

print(matrix.rows)
print(matrix.cols)
print(matrix.data[0])
```

### 32. merge_sort.tsl -- Merge_sort

```tsl
# Merge Sort
function merge_sort(arr):
    len = 0
    for item in arr:
        len = len + 1
    
    if len <= 1:
        return arr
    
    mid = len / 2
    mid = mid - (mid % 1)
    
    left = []
    right = []
    i = 0
    
    while i < len:
        if i < mid:
            left[i] = arr[i]
        else:
            right[i - mid] = arr[i]
        i = i + 1
    
    left = merge_sort(left)
    right = merge_sort(right)
    
    return merge(left, right)

function merge(left, right):
    result = []
    i = 0
    j = 0
    k = 0
    
    while i < left.length and j < right.length:
        if left[i] <= right[j]:
            result[k] = left[i]
            i = i + 1
        else:
            result[k] = right[j]
            j = j + 1
        k = k + 1
    
    while i < left.length:
        result[k] = left[i]
        i = i + 1
        k = k + 1
    
    while j < right.length:
        result[k] = right[j]
        j = j + 1
        k = k + 1
    
    return result
```

### 33. min_max.tsl -- Min_max

```tsl
# Function with Multiple Returns
function min_max(arr):
    min = arr[0]
    max = arr[0]
    
    for item in arr:
        if item < min:
            min = item
        if item > max:
            max = item
    
    return min
    return max
```

### 34. multi_statements.tsl -- Multi_statements

```tsl
# Multiple Statements in Block
x = 10
y = 20
z = 30

if x > 5:
    print("x is big")
    print("y is " + y)
    print("z is " + z)
```

### 35. no_return.tsl -- No_return

```tsl
# Function with No Return
function say_hello():
    print("Hello!")

say_hello()
```

### 36. palindrome.tsl -- Palindrome

```tsl
# Palindrome Check
function is_palindrome(text):
    len = 0
    for ch in text:
        len = len + 1
    
    i = 0
    while i < len / 2:
        if text[i] != text[len - 1 - i]:
            return false
        i = i + 1
    
    return true

print(is_palindrome("racecar"))
```

### 37. palindrome_partition.tsl -- Palindrome_partition

```tsl
# Dynamic Programming - Palindrome Partitioning
function string_length(s):
    len = 0
    for ch in s:
        len = len + 1
    return len

function get_char(s, i):
    j = 0
    for ch in s:
        if j == i:
            return ch
        j = j + 1
    return ""

function is_palindrome(s):
    i = 0
    j = string_length(s) - 1
    while i < j:
        if get_char(s, i) != get_char(s, j):
            return false
        i = i + 1
        j = j - 1
    return true

function min_cut(s):
    n = string_length(s)
    if n == 0:
        return 0
    
    dp = []
    i = 0
    while i < n:
        dp[i] = i
        i = i + 1
    
    i = 1
    while i < n:
        j = 0
        while j <= i:
            if is_palindrome(s) == true:
                if j == 0:
                    dp[i] = 0
                else:
                    if dp[j - 1] + 1 < dp[i]:
                        dp[i] = dp[j - 1] + 1
            j = j + 1
        i = i + 1
    
    return dp[n - 1]

s = "aab"
result = min_cut(s)
print(result)
```

### 38. prime.tsl -- Prime

```tsl
# Prime Number Check
function is_prime(n):
    if n < 2:
        return false
    
    i = 2
    while i * i <= n:
        if n % i == 0:
            return false
        i = i + 1
    
    return true

for i in range(20):
    if is_prime(i):
        print(i)
```

### 39. queue.tsl -- Queue

```tsl
# Queue Implementation
function create_queue():
    return { items: [], front: 0, rear: (0 - 1), count: 0 }

function queue_enqueue(queue, item):
    queue.rear = queue.rear + 1
    queue.items[queue.rear] = item
    queue.count = queue.count + 1

function queue_dequeue(queue):
    if queue.count == 0:
        return null
    item = queue.items[queue.front]
    queue.front = queue.front + 1
    queue.count = queue.count - 1
    return item

function queue_is_empty(queue):
    return queue.count == 0

function queue_size(queue):
    return queue.count

queue = create_queue()
queue_enqueue(queue, 1)
queue_enqueue(queue, 2)
queue_enqueue(queue, 3)
print(queue_size(queue))
print(queue_dequeue(queue))
print(queue_dequeue(queue))
```

### 40. quick_sort.tsl -- Quick_sort

```tsl
# Quick Sort
function quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)

function partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    j = low
    
    while j < high:
        if arr[j] <= pivot:
            i = i + 1
            temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        j = j + 1
    
    temp = arr[i + 1]
    arr[i + 1] = arr[high]
    arr[high] = temp
    
    return i + 1

arr = [10, 7, 8, 9, 1, 5]
quick_sort(arr, 0, 5)

for item in arr:
    print(item)
```

### 41. recursion.tsl -- Recursion

```tsl
# Recursion
function factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

result = factorial(5)
print(result)
```

### 42. reverse.tsl -- Reverse

```tsl
# Array Reverse
numbers = [1, 2, 3, 4, 5]
reversed = []
i = 4

while i >= 0:
    reversed[(4 - i)] = numbers[i]
    i = i - 1

for num in reversed:
    print(num)
```

### 43. simple_game.tsl -- Simple_game

```tsl
# Simple Game Logic
player_health = 100
enemy_damage = 25

while player_health > 0:
    player_health = player_health - enemy_damage
    print("Health: " + player_health)

print("Game Over")
```

### 44. stack.tsl -- Stack

```tsl
# Stack Implementation
function create_stack():
    items = []
    top = 0 - 1
    
    return { items: items, top: top }

function stack_push(stack, item):
    stack.top = stack.top + 1
    stack.items[stack.top] = item

function stack_pop(stack):
    if stack.top == (0 - 1):
        return null
    item = stack.items[stack.top]
    stack.top = stack.top - 1
    return item

function stack_peek(stack):
    if stack.top == (0 - 1):
        return null
    return stack.items[stack.top]

function stack_is_empty(stack):
    return stack.top == (0 - 1)

stack = create_stack()
stack_push(stack, 1)
stack_push(stack, 2)
stack_push(stack, 3)
print(stack_peek(stack))
print(stack_pop(stack))
print(stack_pop(stack))
```

### 45. string_compare.tsl -- String_compare

```tsl
# String Comparison
name = "Alice"

if name == "Alice":
    print("Hello Alice!")
else:
    print("Who are you?")
```

### 46. string_len.tsl -- String_len

```tsl
# String Length Simulation
# (TSL doesn't have string.length, so we simulate it)
text = "Hello"
len = 0
chars = [text[0], text[1], text[2], text[3], text[4]]

for ch in chars:
    len = len + 1

print(len)
```

### 47. sum_digits.tsl -- Sum_digits

```tsl
# Sum of Digits
number = 12345
sum = 0
temp = number

while temp > 0:
    digit = temp % 10
    sum = sum + digit
    temp = temp / 10
    temp = temp - (temp % 1)

print(sum)
```

### 48. trap_rain.tsl -- Trap_rain

```tsl
# Dynamic Programming - Trapping Rain Water
function trap(rain):
    n = rain.length
    if n == 0:
        return 0
    
    left_max = []
    right_max = []
    i = 0
    while i < n:
        left_max[i] = 0
        right_max[i] = 0
        i = i + 1
    
    i = 1
    while i < n:
        if rain[i - 1] > left_max[i - 1]:
            left_max[i] = rain[i - 1]
        else:
            left_max[i] = left_max[i - 1]
        i = i + 1
    
    i = n - 2
    while i >= 0:
        if rain[i + 1] > right_max[i + 1]:
            right_max[i] = rain[i + 1]
        else:
            right_max[i] = right_max[i + 1]
        i = i - 1
    
    water = 0
    i = 0
    while i < n:
        min_max = left_max[i]
        if right_max[i] < min_max:
            min_max = right_max[i]
        if min_max > rain[i]:
            water = water + min_max - rain[i]
        i = i + 1
    
    return water

rain = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
result = trap(rain)
print(result)
```

