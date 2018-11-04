
// import inbuilt modules
import { isEmpty, isString } from 'lodash';
import { GraphQLInt, Kind, GraphQLString, GraphQLScalarType } from 'graphql';

// import custom modules

const ISODateRegex = new RegExp('^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$');

class ISODateType extends GraphQLScalarType {
    constructor(config) {
        super(config)
    }

    serialize(value: string): any {
        if (!ISODateRegex.test(value))
            throw new Error('Invalid ISODate provided.');
        return value;
    }

    deserialize(value: string): any {
        if (!ISODateRegex.test(value))
            throw new Error('Invalid ISODate provided.');
        return value;
    }

    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            return new Date(ast.value);
        }
        return null;
    }

}

const ISODateValidate = (value: string): any => {
    console.log("ISODateValidate : ", value);
    if (!ISODateRegex.test(value))
        throw new Error('Invalid ISODate provided.');
    return value;
};

const DateScalarType = new GraphQLScalarType({
    name: 'Date',
    description: 'ISODate String used for date data type.',
    serialize: ISODateValidate,
    parseValue: ISODateValidate,
    parseLiteral: (ast) => {
        console.log("parseLiteral : ", ast);
        if (ast.kind === Kind.STRING) {
            return new Date(ast.value);
        }
        return "null";
    }
});

export default {
    ISODate: DateScalarType
    // Date: {
    //     __parseValue(value: any) {
    //         console.log('parsevalue : ', value);
    //         return value;
    //     },
    //     __parseLiteral(ast: any) {
    //         console.log('__parseLiteral : ', ast);
    //         return ast.value;
    //     },
    //     __serialize(value: any) {
    //         console.log('__serialize : ', value);
    //         return value;
    //     }
    // }
}