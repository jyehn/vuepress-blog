numpy 100题

1. import the numpy package under the name np

```python
import numpy as np
```

2. print the numpy version and the configuration

```python
print(np.__version__)
np.show_config()
```

3. create a null vector of size 10

```python
z = np.zeros(10)
print(z)
```

4. how to find the memory size of any array

```python
z = np.zeros((10, 10))
print("%d bytes" % (z.size * z.itemsize))
```

5. how to get the documentation of the numpy add function from the command line

```python
%run `python -c "import numpy; numpy.info(numpy.add)"`
```

6. create a null vector of size 10 but the fifth value which is 1

```python
z = np.zeros(10)
z[4] = 1
print(z)
```

7. create a vector with values ranging from 10 to 49

```python
z = np.arange(10, 50)
print(z)
```

8. reverse a vector(first element becomes last)

```python
z = np.arange(50)
z = z[::-1]
print(z)
```

9. create a 3x3 matrix with values ranging from 0 to 8

```python
z = np.arange(0,9).reshape(3, 3)
print(z)
```

10. find indices of non-zero elements from [1,2,0,0,4,0]

```python
nz = np.nonzero([1, 2, 0, 0, 4, 0])
print(nz)
```

11. create a 3x3 identity matrix

```python
z = np.eye(3)
print(z)
```

12. create a 3x3x3 array with random values

```python
z = np.random.random((3, 3, 3))
print(z)
```

13. create a 10x10 array with random values and find the minimum and maximum values

```python
z = np.random.random((10, 10))
zmin, zmax = z.min(), z.max()
print(zmin, zmax)
```

14. create a random vector of size 30 and find the mean value

```python
z = np.random.random(30)
m = z.mean()
print(m)
```

15. create a 2d array with 1 on the border and 0 inside

```python
z = np.ones((10, 10))
z[1:-1, 1:-1] = 0
print(z)
```

16. how to add a border(filled with 0's) around an existing array

```python
z = np.ones((5, 5))
z = np.pad(z, pad_width=1, mode='constant', constant_values=0)
print(z)
```

17. what is the result of the following expression

```python
0 * np.nan				### np.nan
np.nan == np.nan 		### False
np.inf > np.nan			### False
np.nan - np.nan			### np.nan
np.nan in set([np.nan])	### True
0.3 == 3 * 0.1			### False
```

18. create a 5x5 matrix with values 1, 2,3,4 just below the diagonal

```python
z = np.diag(1 + np.arange(4), k=-1)
print(z)
```

19. create a 8x8 matrix and fill it with a checkerboard pattern

```python
z = np.zeros((8, 8), dtype=int)
z[1::2, ::2] = 1
z[::2, 1::2] = 1
print(z)
```

20. consider a (6, 7, 8) shape array, what is the index (x, y, z) of the 100th element

```python
print(np.unravel_index(99, (6, 7, 8)))
```

21. create a checkerboard 8x8 matirx using the tile function

```python
z = np.tile(np.array([[0, 1], [1, 0]]), (4, 4))
```

22. normalize a 5x5 random matrix

```python
z = np.random.random((5, 5))
z = (z - np.mean(z)) / (np.std(z))
print(z)
```

23. create a custom dtype that describes a color as four unsigned bytes(RGBA)

```python
color = np.dtype([("r", np.ubyte, 1),
				  ("g", np.ubyte, 1),
				  ("b", np.ubyte, 1),
				  ("a", np.ubyte, 1)])
```

24. multiply a 5x3 matrix by a 3x2 matrix(real matrix product)

```python
z = np.dot(np.ones((5, 3)), np.ones((3, 2)))
print(z)
z = np.ones((5, 3)) @ np.ones((3, 2))
print(z)
```

25. given a 1D array, negate all elements which are between 3 and 8, in place

```python
z = np.arange(11)
z[(3 < z) & (z < 8)] *= -1
print(z)
```

26. what is the output of the following script

```python
print(sum(range(5), -1))
from numpy import *
print(sum(range(5), -1))
```

`sum(iterable[, start]): python __builtin__`

`sum(a, axis=None): numpy`

27. consider an integer vector z, which of these expressions are legal

```python
z ** z			#legal
2 << z >> 2		#illegal
z < -z			#legal
1j * z			#legal
z / 1 / 1		#legal
z < z > z		#illegal
```

28. what are the results of the following expressions

```python
np.array(0) / np.array(0)
#<stdin>:1: RuntimeWarning: invalid value encountered in true_divide
np.array(0) // np.array(0)
#<stdin>:1: RuntimeWarning: invalid value encountered in true_divide
np.array([np.nan]).astype(int).astype(float)
#array([-2.14748365e+09])
```

29. how to round away from zero a float array

```

z = np.random.uniform(-10, +10, 10)
print(np.copysign(np.ceil(np.abs(z)), z))
#more readable but less efficient
print(np.where(z > 0, np.ceil(z), np.floor(z)))
```

30. how to find common value between two arrays

```python
z1 = np.random.randint(0, 10, 10)
z2 = np.random.randint(0, 10, 10)
print(np.intersect1d(z1, z2))
```

31. how to ignore all numpy warnings (not recommended)

```python
#suicide mode on
defaults = np.seterr(all="ignore")
z = np.ones(1) / 0

# back to sanity
_ = np.seterr(**defaults)

#equivalently with a context manager
with np.errstate(all="ignore"):
	np.arange(3) / 0
```

32. is the following expressions true

```python
np.sqrt(-1) == np.emath.sqrt(-1) #False
```

33. how to get the dates of yesterday, today and tomorrow

```python
yesterday = np.datetime64('today') - np.timedelta64(1)
today     = np.datetime64('today')
tomorrow  = np.datetime64('today') + np.timedelta64(1)
```

34. how to get all the dates corresponding to the month of July 2016

```python
z = np.arange('2016-07', '2016-08', dtype='datetime64[D]')
print(z)
```

35. how to compute ((A+B)*(-A/2)) in place(without copy)

```python
A = np.ones(3) * 1
B = np.ones(3) * 2
C = np.ones(3) * 3
np.add(A, B, out=B)
np.divide(A, 2, out=A)
np.negative(A, out=A)
np.multiply(A, B, out=A)
```

36. extract the integer part of a random array of postive numbers using 4 different methods

```python
z = np.random.uniform(0, 10, 10)

print(z - z % 1)
print(z // 1)
print(np.floor(z))
print(z.astype(int))
print(np.trunc(z))
```

37. create a 5x5 matrix with row values ranging from 0 to 4

```python
z = np.zeros((5, 5))
z += np.arange(5)
print(z)
```

38. consider a generator function that generates 10 integers and use it to build an array

```python
def generate():
	for x in range(10):
		yield x
z = np.fromiter(generate(), dtype=float, count=-1)
print(z)
```

39. create a vector of size 10 with values ranging from 0 to 1, both excluded

```python
z = np.linspace(0, 1, 11, endpoint=False)[1:]
print(z)
```

40. create a random vector of size 10 and sort it

```python
z = np.random.random(10)
z.sort()
print(z)
```

41. how to sum a small array faster than np.sum

```python
z = np.arange(10)
np.add.reduce(z)
```

42. consider two random array A and B, check if they are equal

```python
A = np.random.randint(0, 2, 5)
B = np.random.randint(0, 2, 5)

#assuming identical shape of the arrays and a tolerance for the comparison of value
equal = np.allclose(A, B)
print(equal)

# checking both the shape and the element values, no tolerance(values have to be exactly equal)
equal = np.array_equal(A, B)
print(equal)
```

43. make an array immutable(read-only)

```python
z = np.zeros(10)
z.flags.writeable = False
z[0] = 1
```

44. consider a random 10x2 matrix representing cartesian coordinates, convert them to polar coordinates

```python
z = np.random.random((10, 2))
x, y = z[:, 0], z[:, 1]
r = np.sqrt(x ** 2 + y ** 2)
t = np.arctan2(y, x)
print(r)
print(t)
```

45. create random vector of size 10 and replace the maximum value by 0

```python
z = np.random.random(10)
z[z.argmax()] = 0
print(z)
```

46. create a structured array with x and y coordinates covering the [0, 1]x[0, 1] area

```python
z = np.zeros((5, 5), [('x', float), ('y', float)])
z['x'], z['y'] = np.meshgrid(np.linspace(0, 1, 5),
							np.linspace(0, 1, 5))
print(z)
```

47. given two arrays, x and y, construct the Cauthy matrix C(Cij=1/(xi-yj))

```python
x = np.arange(8)
y = x + 0.5
c = 1.0 / np.subtract.outer(x, y)
print(np.linalg.det(c))
```

48. print the minimum and maximum representable value for each numpy scalar type

```python
for dtype in [np.int8, np.int32, np.int64]:
	print(np.iinfo(dtype).min)
	print(np.iinfo(dtype).max)
for dtype in [np.float32, np.float64]:
	print(np.finfo(dtype).min)
	print(np.finfo(dtype).max)
	print(np.finfo(dtype).eps)
```

49. how to print all the values of an array

```python
np.set_printoptions(threshold=float("inf"))
z = np.zeros((16, 16))
print(z)
```

50. how to find the closet value(to a given scalar) in a vector

```python
z = np.arange(100)
v = np.random.uniform(0, 100)
index= (np.abs(z - v)).argmin()
print(z[index])
```

51. create a structured array representing a position(x, y) and a color (r, g, b)

```
z = np.zeros(10, [('position', [('x', float, 1), ('y', float, 1)]),
				  ('color',    [('r', float, 1), ('g', float, 1), ('b', float, 1)])])
print(z)
```



52. consider a random vector with shape (100, 2) representing coordinates, find point by point distances

```python
z = np.random.random((10, 2))
x, y = np.atleast_2d(z[:, 0], z[:, 1])
d = np.sqrt((x - x.T) ** 2 + (y - y.T) ** 2)
print(d)
#much faster with scipy
import scipy
import scipy.spatial

z = np.random((10, 2))
d = scipy.spatial.distance.cdist(z, z)
print(d)
```

53. how to convert a float(32 bits) array into an integer (32 bits) in place

```python
z = (np.random.rand(10) * 100).astype(np.float32)
y = z.view(np.int32)
y[:] = z
print(y)
```

54. how to read the following file

```python
1, 2, 3, 4, 5
6,  ,  , 7, 8
 ,  , 9, 10, 11
```

```python
from io import StringIO
#fake file
s = StringIO('''1, 2, 3, 4, 5
				6,  ,  , 7, 8
				 ,  , 9, 10, 11
			''')
z = np.genfromtxt(s, delimiter=",", dtype=np.int)
print(z)
```

55. what is the equivalent of enumerate for numpy arrays

```python
z = np.arrange(9).reshape(3, 3)
for index, value in np.ndenumerate(z):
	print(index, value)
for index in np.ndindex(z.shape):
	print(index, z[index])
```

56. generate a generic 2D Gaussian-like array

```
x, y = np.meshgrid(np.linspace(-1, 1, 10), np.linspace(-1, 1, 10))
d = np.sqrt(x * x + y * y)
sigma, mu = 1.0, 0.0
g = np.exp(-((d - mu) ** 2 / (2.0 * sigma ** 2)))
print(g)
```

57. how to randomly place p elements in a 2D array

```python
n = 10
p = 3
z = np.zeros((n, n))
np.put(z, np.random.choice(range(n * n), p, replace=False), 1)
print(z)
```

58. subtract the mean of each row of a matrix

```python
x = np.random.rand(5, 10)
y = x - x.mean(axis=1, keepdims=True)
y = x - x.mean(axis=1).reshape(-1, 1)
```

59. how to sort an array by the nth column

```python
z = np.random.randint(0, 10, (3, 3))
print(z)
print(z[z[:, 1].argsort()])
```

60. how to tell if a given 2D array has null columns

```python
z = np.random.randint(0, 3, (3, 10))
print((~z.any(axis=0)).any())
```

61. find the nearest value from a given value in an array

```python
Z = np.random.uniform(0, 1, 10)
z = 0.5
m = Z.flat[np.abs(Z - z).argmin()]
print(m)
```

62. considering two arrays with shape(1, 3) and (3, 1), how to compute their sum using an iterator

```python
A = np.arange(3).reshape(3, 1)
B = np.arange(3).reshape(1, 3)
it = np.nditer([A, B, None])
for x, y, z in it: z[...] = x + y
print(it.operands[2])
```

63. create an array class that has a name attribute

```python
class NamedArray(np.ndarray):
	def __new__(cls, array, name="no name"):
		obj = np.asarray(array).view(cls)
		obj.name = name
		return obj
	def __array_finalize__(self, obj):
		if obj is None:
			return
		self.info = getattr(obj, 'name', "no name")
Z = NamedArray(np.arange(10), "range_10")
print(Z.name)
```

64. consider a given vector, how to add 1 to each element indexed by a second vector(be careful with repeated indices)

```python
Z = np.ones(10)
I = np.random.randint(0, len(Z), 20)
Z += np.bincount(I, minlength=len(Z))
print(Z)

#another solution
np.add.at(Z, I, 1)
print(Z)
```

65. how to accumulate elements of a vector(X) to an array (F) based on an index list(I)

```python
X = [1, 2, 3, 4, 5, 6]
I = [1, 3, 9, 3, 4, 1]
F = np.bincount(I, X)
print(F)
```

66. considering a (w, h, 3) image of (dtype = ubyte), compute the number of unique colors

```python
w, h = 16, 16
I = hp.random.randint(0, 2, (h, w, 3).astype(np.ubyte))
F = I[..., 0] * 256 * 256 + I[..., 1] * 256 + I[..., 2]
n = len(np.unique(F))
print(np.unique(I))
```

67. considering a four dimensions array, how to get sum over the last two axis at once

```python
A = np.random.randint(0, 10, (3, 4, 3, 4))
#solution by passing a tuple of axes (introduced in numpy in 1.7.0)
sum = A.sum(axis=(-2, -1))
print(sum)
#solution by flattening the last two dimensions into one
#(useful for functions that don't accept tuples for axis argument)
sum = A.reshape(A.shape[:-2] + (-1, )).sum(axis=-1)
print(sum)
```

68. considering a one-dimensional vector D, how to compute means of subsets of D using a vector S of same size describing subset indices

```python
D = np.random.uniform(0, 1, 100)
S = np.random.randint(0, 10, 100)
D_sums = np.bincount(S, weights=D)
D_counts = np.bincount(S)
D_means = D_sums / D_counts
print(D_means)

#pandas solution as a reference due to more intuitive code
import pandas as pd
print(pd.Series(D).groupby(S).mean())
```

69. how to get the diagonal of a dot product

```python
A = np.random.uniform(0, 1, (5, 5))
B = np.random.uniform(0, 1, (5, 5))
#slow version
np.diag(np.dot(A, B))
#fast version
np.sum(A * B.T, axis=1)
#faster version
np.einsum("ij, ji->i", A, B)
```

70. consider the vector [1, 2,3,4, 5], how to build a new vector with 3 consecutive zeros interleaved between each value

```python
Z = np.array([1, 2, 3, 4, 5])
nz = 3
Z0 = np.zeros(len(Z) + (len(Z) - 1) * (nz))
Z0[::nz + 1] = Z
print(Z0)
```

71. consider an array of dimension (5, 5, 3), how to multiply it by an array with dimensions(5, 5)

```python
A = np.ones((5, 5, 3))
B = 2 * np.ones((5, 5))
print(A * B[:, :, None])
```

72. how to swap tow rows of an array 

```python
A = np.arange(25).reshape(5, 5)
A[[0, 1]] = A[[1, 0]]
print(A)
```

73. consider a set of 10 triplets describing 10 triangles(with shared vertices), find the set of unique line segments composing all the triangles

```python
faces = np.random.randint(0, 100, (10, 3))
F = np.roll(faces.repeat(2, axis=1), -1, axis=1)
F = F.reshape(len(F) * 3, 2)
F = np.sort(F, axis=1)
G = F.view(dtype=[('p0', F.dtype), ('p1', F.dtype)])
G = np.unique(G)
print(G)
```

74. given an array c that is a bincount, how to produce an array A such that np.bincount(A) == C

```python
C = np.bincount([1, 1, 2, 3, 4, 4, 6])
A = np.repeat(np.arange(len(C), C))
print(A)
```

75. how to compute averages using a sliding window over an array

```python
def moving_average(a, n=3):
	ret = np.cumsum(a, dtype=float)
	ret[n:] = ret[n:] - ret[:-n]
	return ret[n - 1:] / n
Z = np.arange(20)
print(moving_average(Z, n=3))
```

76. consider a one-dimensional array Z, build a two-dimensional array whose first row is (Z[0], Z[1], Z[2]) and each subsequent row is shifted by 1(last row should be (Z[-3], Z[-2] ,Z[-1]))

```python
from numpy.lib import stride_tricks

def rolling(a, window):
	shape = (a.size - window + 1, window)
	strides = (a.itemsize, a.itemsize)
	return stride_tricks.as_strided(a, shape=shape ,strides=strides)
Z = rolling(np.arange(10), 3)
print(Z)
```

77. how to negate a boolean, or to change the sign of a float in place

```python
Z = np.random.randint(0, 2, 100)
np.logical_not(Z, out=Z)
Z = np.random.uniform(-1.0, 1.0, 100)
np.negative(Z, out=Z)
```

78. consider 2 sets of points P0, P1 describing lines(2d) and a point p, how to compute distance from p to each line i(P0[i], P1[i])

```python
def distance(P0, P1, p):
	T= P1 - P0
	L = (T ** 2).sum(axis=1)
	U = -((P0[:, 0] - p[..., 0]) * T[:, 0] + (P0[:, 1] - p[..., 1]) * T[:, 1]) / L
	U = U.reshape(len(U), 1)
	D = P0 + U * T - p
	return np.sqrt((D * 2).sum(axis=1))

P0 = np.random.uniform(-10, 10, (10, 2))
P1 = np.random.uniform(-10, 10, (10, 2))
p = np.random.uniform(-10, 10, (1, 2))
print(distance(P0, P1, p))
```

79. consider 2 sets of points P0, P1, describing lines(2d) and a set of points P, how to compute distance from each point j(P[j]) to each line i(P0[i], P1[i])

```python
P0 = np.random.uniform(-10, 10, (10, 2))
P1 = np.random.uniform(-10, 10, (10, 2))
p = np.random.uniform(-10, 10, (10, 2))
print(np.array([distance(P0, P1, p_i) for p_i in p]))
```

80. consider an arbitrary array, write a function that extract a subpart with a fixed shape and centered on a given element(pad with a fill value when necessary)

```python
Z = np.random.randint(0, 10, (10, 10))
shape = (5, 5)
fill = 0
position = (1, 1)

R = np.ones(shape, dtype=Z.dtype) * fill
P = np.array(list(position)).astype(int)
Rs = np.array(list(R.shape)).astype(int)
Zs = np.array(list(Z.shape)).astype(int)

R_start = np.zeros((len(shape),)).astype(int)
R_stop = np.array(list(shape)).astype(int)
Z_start = (P - Rs // 2)
Z_stop = (P = Rs // 2) + Rs % 2

R_start = (R_start - np.minimum(Z_start, 0)).tolist()
Z_start = (np.maximum(Z_start, 0)).tolist()
R_stop = np.maximum(R_start, (R_stop - np.maximum(Z_stop - Zs, 0))).tolist()
Z_stop = (np.minimum(Z_stop, Zs)).tolist()

r = [slice(start, stop) for start, stop in zip(R_start, R_stop)]
z = [slice(start, stop) for start, stop in zip(Z_start, Z_stop)]
R[r] = Z[z]
print(Z)
print(R)
```

81. consider an array Z = [1, 2,3, 4,5,6,7,8,9,10,11,12,13,14], how to generate an array R=[[1,2,3,4],[2,3,4,5],[3,4,5,6],...,[11,12,13,14]]

```python
Z = np.arange(1, 15, dtype=np.uint32)
R = stride_tricks.as_strided(Z, (11, 4), (4, 4))
print(R)
```

82. compute a matrix rank

```python
Z = np.random.uniform(0, 1, (10, 10))
U, S, V = np.linalg.svd(Z)
rank = np.sum(S > le-10)
print(rank)
```

83. how to find the most frequent value in an array

```python
Z = np.random.randint(0, 10, 50)
print(np.bincount(Z).argmax())
```

84. extract all the contiguous 3x3 block from a random 10x10 matrix

```python
Z = np.random.randint(0, 5, (10, 10))
n = 3
i = 1 + (Z.shape[0] - 3)
j = 1 + (Z.shape[1] - 3)
C = stride_tricks.as_strided(Z, shape=(i, j, n, n), strides=Z.strides + Z.strides)
print(C)
```

85. create a 2D array subclass such that Z[i,j] == Z[j, i]

```python
class Symetric(np.ndarray):
	def __setitem__(self, index, value):
		i, j = index
		super(Symetric, self).__setitem__((i, j), value)
		super(Symetric, self).__setitem__((j, i), value)
def symetric(Z):
	return np.asarray(Z + Z.T - np.diag(Z.diagonal())).view(Symetric)
S = symetric(np.random.randint(0, 10, (5, 5)))
S[2, 3] = 42
print(S)
```

86. consider a set of p matrices with shape (n, n) and a set of p vectors with shape(n, 1).how to compute the sum of the p matrix products at once

```python
p, n = 10, 20
M = np.ones((p, n, n))
V = np.ones((p, n, 1))
S = np.tensordot(M, V, axes=[[0, 2], [0, 1]])
print(S)
```

87. consider a 16x16 array, how to get the block-sum(block-size is 4x4)

```python
Z = np.ones((16, 16))
k = 4
S = np.add.reduceat(np.add.reduceat(Z, np.arange(0, Z.shape[0], k), axis=0),
									   np.arange(0, Z.shape[1], k), axis=1)
print(S)
```

88. how to implement the game of life using numpy arrays

```python
def iterate(Z):
	N = (Z[0:-2, 0:-2] + Z[0:-2, 1:-1] + Z[0:-2, 2:] +
	     Z[1:-1, 0:-2]                 + Z[1:-1, 2:] + 
	     Z[2:   ,0:-2] + Z[2:  , 1:-1] + Z[2:  , 2:])
	birth = (N==3) & (Z[1:-1, 1:-1] == 0)
    survive = ((N==2) | (N == 3)) & (Z[1:-1, 1:-1] == 1)
    Z[...] = 0
    Z[1:-1, 1:-1][birth | survive] = 1
    return Z
Z = np.random.randint(0, 2, (50, 50))
for i in range(100):
    Z = iterate(Z)
print(Z)
```

89. how to get the n largest values of an array

```python
Z = np.arange(10000)
np.random.shuffle(Z)
n = 5

#slow 
print(Z[np.argsort(Z):[-n:]])

#fast 
print(Z[np.argpartition(-Z, n)[:n]])
```

90. given an arbitrary number of vectors, build the cartesian product (every combinations of every item)

```python
def cartesian(arrays):
	arrays = [np.asarray(a) for a in arrays]
	shape = (len(x) for x in arrays)
	
	ix = np.indices(shape, dtype=int)
	ix = ix.reshape(len(arrays), -1).T
	
	for n, arr in enumerate(arrays):
		ix[:, n] = arrays[n][ix[:, n]]
	return ix
	
print(cartesian(([1, 2, 3],[4, 5], [6, 7])))
```

91. how to create a record array from a regular array

```python
Z = np.array([("hello", 2.5, 3),
              ("world", 3.6, 2)])
R = np.core.records.fromarrays(Z.T,
                               names='col1, col2, col3',
                               formats='S8, f8, i8')
print(R)
```

92. consider a large vector Z, compute Z to the power of 3 using 3 different methods

```python
x = np.random.rand(int(5e7))

%timeit np.power(x, 3)
%timeit x*x*x
%timeit np.einsum('i, i, i->i', x, x, x)
```

93. consider two arrays A and B of shape(8, 3) and (2, 2). how to find rows of A that contain elements of each row of B regardless of the order of the elements in B

```python
A = np.random.randint(0, 5, (8, 3))
B = np.random.randint(0, 5, (2, 2))

C = (A[..., np.newaxis, np.newaxis] == B)
row = np.where(C.any((3, 1)).all(1))[0]
print(rows)
```

94. considering a 10x3 matrix, extract rows with unequal values(e.g. [2, 2, 3])

```python
Z = np.random.randint(0, 5, (10, 3))
print(Z)

E = np.all(Z[:, 1:] == Z[:, :-1], axis=1)
U = Z[~E]
print(U)
U = Z[Z.max(axis=1) != Z.min(axis=1), :]
print(U)
```

95. convert a vector of ints into a matrix binary representation

```python
I = np.array([0, 1, 2, 3, 15, 16, 32, 64, 128])
B = ((I.reshape(-1, 1) & (2 ** np.arange(8))) != 0).astype(int)
print(B[:, ::-1])
#another solution
I = np.array([0, 1, 2, 3, 15, 16, 32, 64, 128], dtype=np.uint8)
print(np.unpackbits(I[:, np.newaxis], axis=1))
```

96. given a two dimensional array, how to extract unique rows

```python
Z = np.random.randint(0, 2, (6, 3))
T = np.ascontiguousarray(Z).view(np.dtype((np.void), Z.dtype.itemsize * Z.shape[1]))
_, idx = np.unique(T, return_index=True)
uZ = Z[idx]
print(uZ)
#another version
uZ = np.unique(Z, axis=0)
print(uZ)
```

97. considering 2 vectors A & B, write the einsum equivalent of inner, outer, sum, and mul function

```python
A = np.random.uniform(0, 1, 10)
B = np.random.uniform(0, 1, 10)

np.einsum('i->', A)			#np.sum(A)
np.einsum('i, i->i', A, B)	#A*B
np.einsum('i, i', A, B)		#np.inner(A, B)
np.einsum('i, j->ij', A, B) #np.outer(A, B)
```

98. considering a path described by two vectors(X,Y), how to sample it using equidistant samples

```python
phi = np.arange(0, 10 * np.pi, 0.1)
a = 1
x = a * phi * np.cos(phi)
y = a * phi * np.sin(phi)

dr = (np.diff(x) ** 2 + np.diff(y) ** 2) ** .5 
r = np.zeros_like(x)
r[1:] = np.cumsum(dr) 					#integrate path
r_int = np.linspace(0, r.max(), 200)	#regular spaced path
x_int = np.interp(r_int ,r, x)			#integrate path
y_int = np.interp(r_int, r, y)
```

99. given an integer n and an 2D array x, select from x the rows which can be interpreted as draws from a multinomial distribution with n degress, i.e. the rows which only contain integers and which sum to n.

```python
X = np.asarray([[1.0, 0.0, 3.0, 8.0],
                [2.0, 0.0, 1.0, 1.0],
                [1.5, 2.5, 1.0, 0.0]])
n = 4
M = np.logical_and.reduce(np.mod(X, 1) == 0, axis=-1)
M &= (X.sum(axis=-1) == n)
print(X[M])
```

100. compute bootstrapped 95% confidence intervals for the mean of a 1D array X(i.e., resample the elements of an array with replacement N times, compute the mean of each sample, and the compute percentiles over the means).

```python
X = np.random.randn(100)
N = 1000
idx = np.random.randint(0, X.size, (N, X.size))
means = X[idx].mean(axis=1)
confint = np.percentile(means, [2.5, 97.5])
print(confint)
```


