## About

A project created for the use of `Map` classes as [**Cache**](https://en.wikipedia.org/wiki/Cache_(computing)), making data management more efficient.

### Algorithm

> Inputs used for this explanation:
>
> | Key | Value     |
> |-----|-----------|
> | `A` | `"Hello"` |
> | `B` | `"Hello"` |
> | `C` | `"Hello"` |
> | `D` | `"World"` |
> | `E` | `"World"` |
> | `F` | `"Bye"`   |


1. A container is created that will save the value of the input, and its name will be a [hash](https://en.wikipedia.org/wiki/Hash_function) generated with the value of the input.

2. A pointer is created that will save the name of the container previously created (or reused if it already existed), and its name will be the key of the input.

- Pointers:

    | Key | Reference             |
    |-----|-----------------------|
    | `A` | `XXXX-XXXX-XXXX-XXXX` |
    | `B` | `XXXX-XXXX-XXXX-XXXX` |
    | `C` | `XXXX-XXXX-XXXX-XXXX` |
    | `D` | `YYYY-YYYY-YYYY-YYYY` |
    | `E` | `YYYY-YYYY-YYYY-YYYY` |
    | `F` | `ZZZZ-ZZZZ-ZZZZ-ZZZZ` |

- Containers:

    | Reference             | Value     |
    |-----------------------|-----------|
    | `XXXX-XXXX-XXXX-XXXX` | `"Hello"` |
    | `YYYY-YYYY-YYYY-YYYY` | `"World"` |
    | `ZZZZ-ZZZZ-ZZZZ-ZZZZ` | `"Bye"`   |

In this way, duplication of data is avoided.
