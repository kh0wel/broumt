import hashAlgorithm from '../utils/hashAlgorithm.js';

export type CachedKey = string | number | symbol;

export type CachedValue = string | number | symbol | bigint | boolean | undefined;

export type CachedPointer = string;

export type CachedContainer = { value: CachedValue, usedBy: number };

export default class {

    pointers:   { [pointer:   CachedKey     ]: CachedPointer   } = {};
    containers: { [container: CachedPointer ]: CachedContainer } = {};

    set (key: CachedKey, value: CachedValue) {

        if (typeof key !== 'string'
        &&  typeof key !== 'number'
        &&  typeof key !== 'symbol') throw new Error('Invalid entry key');

        if (typeof value !== 'string'
        &&  typeof value !== 'number'
        &&  typeof value !== 'bigint'
        &&  typeof value !== 'symbol'
        &&  typeof value !== 'boolean'
        &&  typeof value !== 'undefined') throw new Error('Invalid entry value');

        const currentContainerHash = hashAlgorithm(value);

        const currentContainerData: CachedContainer = this.containers[currentContainerHash] ?? { value, usedBy: 0 };

        currentContainerData.usedBy++;

        const previousContainerHash = this.pointers[key];

        // Verifica si el contenedor anterior del puntero existente es el mismo
        if (previousContainerHash
        &&  previousContainerHash !== currentContainerHash) {

            // Obtiene el antiguo contenedor utilizado por el puntero
            const previousContainerData = this.containers[previousContainerHash] as CachedContainer;

            previousContainerData.usedBy--;

            // Elimina el contenedor si ya no es utilizado
            if (!previousContainerData.usedBy) delete this.pointers[key];
        };

        this.pointers[key]                    = currentContainerHash;
        this.containers[currentContainerHash] = currentContainerData;
    };

    clone (from: CachedKey, to: CachedKey) {

        if (typeof from !== 'string'
        &&  typeof from !== 'number'
        &&  typeof from !== 'symbol'

        &&  typeof to   !== 'string'
        &&  typeof to   !== 'number'
        &&  typeof to   !== 'bigint'
        &&  typeof to   !== 'symbol')  throw new Error('Invalid entry key');

        const containerHash = this.pointers[from];

        const containerData = this.containers[containerHash] as CachedContainer;

        containerData.usedBy++;

        this.pointers[to]              = containerHash;
        this.containers[containerHash] = containerData;
    };

    delete (key: CachedKey) {

        if (typeof key !== 'string'
        &&  typeof key !== 'number'
        &&  typeof key !== 'symbol') throw new Error('Invalid entry key');

        const containerHash = this.pointers[key];

        const containerData = this.containers[containerHash] as CachedContainer;

        delete this.pointers[key];

        containerData.usedBy--;

        // Elimina el contenedor si ya no es utilizado o lo actualiza
        if   (!containerData.usedBy) delete this.containers[containerHash];
        else                                this.containers[containerHash] = containerData;
    };

    get (key: CachedKey) {

        if (typeof key !== 'string'
        &&  typeof key !== 'number'
        &&  typeof key !== 'symbol') throw new Error('Invalid entry key');

        const containerHash = this.pointers[key];

        return this.containers[containerHash]?.value as CachedValue ?? null;
    };

    has (key: CachedKey) {

        if (typeof key !== 'string'
        &&  typeof key !== 'number'
        &&  typeof key !== 'symbol') throw new Error('Invalid entry key');

        const containerHash = this.pointers[key];

        return !!containerHash;
    };

    entries () {

        return Object.entries(this.pointers).map(([ key, pointer ]) => [ key, this.containers[pointer] ]);
    };

    keys () {

        return Object.keys(this.pointers);
    };

    values () {

        return Object.values(this.containers);
    };

    clear () {

        this.pointers   = {};
        this.containers = {};
    };
};
