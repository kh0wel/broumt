export default function (value: any) {

    const hasher = (characters: string) => {

        const base = 13;

        let hash = 0;

        for (let char = 0; char < characters.length; char++) {

            hash = ((hash * base) + characters.charCodeAt(char)) % Number.MAX_SAFE_INTEGER;
        };

        return hash;
    };

    return `${ typeof value }::${

        typeof value === 'string'

            ? hasher(value)

            : typeof value === 'symbol'

                ? value.description

                    ? hasher(value.description)

                    : 'none'

                : typeof value === 'boolean'

                    ? Number(value)

                    : typeof value === 'undefined'

                        ? 'none'

                        : hasher(value.toString())
    }`
        .toUpperCase();
};
