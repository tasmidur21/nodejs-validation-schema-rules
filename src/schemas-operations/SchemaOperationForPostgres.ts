import { ValidationSchema } from "../contacts/ValidationRule";

export class SchemaOperationForPostgres {
    public integerTypes: any = {
        smallint: { min: '-32768', max: '32767' },
        integer: { min: '-2147483648', max: '2147483647' },
        bigint: { min: '-9223372036854775808', max: '9223372036854775807' },
    };

    public async getTableSchema(database: any, table: string): Promise<any[]> {

        const result = await database.query(`
                    SELECT table_name,column_name, data_type, character_maximum_length, is_nullable, column_default
                    FROM 
                    information_schema.columns
                    WHERE 
                    table_name = '${table}' 
                    ORDER BY ordinal_position ASC;
        `);

        return result.rows ?? []

    }

    public generateColumnRules(tableSchema: any[]): ValidationSchema {
        const rules: ValidationSchema = {};
        const skipColumnValues: any = process.env.SKIP_COLLUMNS ?? "";
        const skipColumns: string[] = skipColumnValues.split(',');

        tableSchema.forEach(({ table_name, column_name, data_type, character_maximum_length, is_nullable, column_default }) => {

            if (skipColumns.includes(column_name)||column_default.includes('nextval')) {
                return;
            }

            let columnRules = [];
            columnRules.push(is_nullable === 'YES' ? 'nullable' : 'required');
            let type = data_type;

            switch (true) {
                case type === 'boolean':
                    columnRules.push('boolean');
                    break;
                case type.includes('char'):
                    columnRules.push('string');
                    columnRules.push('max:' + character_maximum_length ?? '255');
                    break;
                case type === 'text':
                    columnRules.push('string');
                    break;
                case type.includes('int'):
                    columnRules.push('integer');
                    columnRules.push('min:' + this.integerTypes.integer.min.toString());
                    columnRules.push('max:' + this.integerTypes.integer.max.toString());
                    break;
                case type.includes('double') ||
                    type.includes('decimal') ||
                    type.includes('numeric') ||
                    type.includes('real'):
                    columnRules.push('numeric');
                    break;
                case type === 'date' || type.includes('time '):
                    columnRules.push('date');
                    break;
                case type.includes('json'):
                    columnRules.push('json');
                    break;
                default:
                   // Skip for other type
                    break;
            }
            rules[column_name] = columnRules;
        })
        return rules;
    }
}
