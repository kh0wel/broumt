## Acerca de

Un proyecto creado para la utilización de clases `Map` como [**Cache**](https://en.wikipedia.org/wiki/Cache_(computing)), haciendo una gestión más eficiente de los datos.

### Algoritmo

> Entradas utilizadas para esta explicación:
>
> | Llave | Valor     |
> |-------|-----------|
> | `A`   | `"Hola"`  |
> | `B`   | `"Hola"`  |
> | `C`   | `"Hola"`  |
> | `D`   | `"Mundo"` |
> | `E`   | `"Mundo"` |
> | `F`   | `"Adiós"` |

1. Se crea un contenedor que almacenará el valor de la entrada, y su nombre será un [hash](https://en.wikipedia.org/wiki/Hash_function) generado con el valor de la entrada.

2. Se crea un puntero que almacenara el nombre del contenedor previamente creado (o reutilizado si ya existía), y su nombre será la llave de la entrada.

- Punteros:

    | Llave | Referencia            |
    |-------|-----------------------|
    | `A`   | `XXXX-XXXX-XXXX-XXXX` |
    | `B`   | `XXXX-XXXX-XXXX-XXXX` |
    | `C`   | `XXXX-XXXX-XXXX-XXXX` |
    | `D`   | `YYYY-YYYY-YYYY-YYYY` |
    | `E`   | `YYYY-YYYY-YYYY-YYYY` |
    | `F`   | `ZZZZ-ZZZZ-ZZZZ-ZZZZ` |

- Contenedores:

    | Referencia            | Value     |
    |-----------------------|-----------|
    | `XXXX-XXXX-XXXX-XXXX` | `"Hola"`  |
    | `YYYY-YYYY-YYYY-YYYY` | `"Mundo"` |
    | `ZZZZ-ZZZZ-ZZZZ-ZZZZ` | `"Adiós"` |

De esta manera, se evita duplicar datos.
