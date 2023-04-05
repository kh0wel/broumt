import hashAlgorithm from '../utils/hashAlgorithm.js';

export type CachedKey = string | number | symbol | bigint;

export type CachedValue = string | number | symbol | bigint | boolean | undefined;

export type CachedPointer = string;

export type CachedContainer = { value: CachedValue, usedBy: number };

export default class {

    pointers:   Map<CachedKey, CachedPointer>       = new Map();
    containers: Map<CachedPointer, CachedContainer> = new Map();

    hasher = hashAlgorithm;

    constructor (options?: { hasher?: typeof hashAlgorithm, cache?: { pointers: any, containers: any } }) {

        this.hasher     = options?.hasher            ?? this.hasher;
        this.pointers   = options?.cache?.pointers   ?? this.pointers;
        this.containers = options?.cache?.containers ?? this.containers;
    };

    set (key: CachedKey, value: CachedValue) {

        if (typeof key !== 'string'
        &&  typeof key !== 'number'
        &&  typeof key !== 'bigint'
        &&  typeof key !== 'symbol') throw new Error('Invalid entry key');

        if (typeof value !== 'string'
        &&  typeof value !== 'number'
        &&  typeof value !== 'bigint'
        &&  typeof value !== 'symbol'
        &&  typeof value !== 'boolean'
        &&  typeof value !== 'undefined') throw new Error('Invalid entry value');

        const currentContainerHash = this.hasher(value);

        const currentContainerData: CachedContainer = this.containers.get(currentContainerHash) ?? { value, usedBy: 0 };

        currentContainerData.usedBy++;

        const previousContainerHash = this.pointers.get(key);

        // Verifica si el contenedor anterior del puntero existente es el mismo
        if (previousContainerHash
        &&  previousContainerHash !== currentContainerHash) {

            // Obtiene el antiguo contenedor utilizado por el puntero
            const previousContainerData = this.containers.get(previousContainerHash) as CachedContainer;

            previousContainerData.usedBy--;

            // Elimina el contenedor si ya no es utilizado
            if (!previousContainerData.usedBy) this.containers.delete(previousContainerHash);
        };

        this.pointers.set(key, currentContainerHash);
        this.containers.set(currentContainerHash, currentContainerData);
    };

    clone (from: CachedKey, to: CachedKey) {

        if (typeof from !== 'string'
        &&  typeof from !== 'number'
        &&  typeof from !== 'bigint'
        &&  typeof from !== 'symbol'

        &&  typeof to   !== 'string'
        &&  typeof to   !== 'number'
        &&  typeof to   !== 'bigint'
        &&  typeof to   !== 'symbol')  throw new Error('Invalid entry key');

        const containerHash = this.pointers.get(from);

        // Verifica si el puntero existe
        if (!containerHash) return;

        const containerData = this.containers.get(containerHash) as CachedContainer;

        containerData.usedBy++;

        this.pointers.set(to, containerHash);
        this.containers.set(containerHash, containerData);
    };

    delete (key: CachedKey) {

        if (typeof key !== 'string'
        &&  typeof key !== 'number'
        &&  typeof key !== 'bigint'
        &&  typeof key !== 'symbol') throw new Error('Invalid entry key');

        const containerHash = this.pointers.get(key);

        // Verifica si el puntero existe
        if (!containerHash) return;

        this.pointers.delete(key);

        const containerData = this.containers.get(containerHash) as CachedContainer;

        containerData.usedBy--;

        // Elimina el contenedor si ya no es utilizado o lo actualiza
        if   (!containerData.usedBy) this.containers.delete(containerHash);
        else                         this.containers.set(containerHash, containerData);
    };

    get (key: CachedKey) {

        if (typeof key !== 'string'
        &&  typeof key !== 'number'
        &&  typeof key !== 'bigint'
        &&  typeof key !== 'symbol') throw new Error('Invalid entry key');

        const containerHash = this.pointers.get(key);

        // Verifica si el puntero existe
        if (!containerHash) return null;

        const containerData = this.containers.get(containerHash) as CachedContainer;

        return containerData.value;
    };

    has (key: CachedKey) {

        if (typeof key !== 'string'
        &&  typeof key !== 'number'
        &&  typeof key !== 'bigint'
        &&  typeof key !== 'symbol') throw new Error('Invalid entry key');

        const containerHash = this.pointers.get(key);

        // Verifica si el puntero existe
        if (!containerHash) return false;

        return this.containers.has(containerHash);
    };

    entries () {

        const data = new Array(this.pointers.size);

        let index = 0;

        for (const [ key, containerHash ] of this.pointers) {

            const containerData = this.containers.get(containerHash) as CachedContainer;

            data[index] = [ key, containerData.value ];

            index++;
        };

        return data;
    };

    keys () {

        const data = new Array(this.pointers.size);

        let index = 0;

        for (const [ key ] of this.pointers) {

            data[index] = key;

            index++;
        };

        return data;
    };

    values () {

        const data = new Array(this.containers.size);

        let index = 0;

        for (const [ , containerData ] of this.containers) {

            data[index] = containerData.value;

            index++;
        };

        return data;
    };

    clear () {

        this.pointers.clear();
        this.containers.clear();
    };

    data () {

        return {

            pointers:   this.pointers,
            containers: this.containers
        };
    };

    size () {

        return this.pointers.size
             + this.containers.size;
    };
};
