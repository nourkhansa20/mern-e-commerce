import { Category } from "../database/models/Category.js";
import { Product } from "../database/models/Product.js";
import { User } from "../database/models/User.js";

const models = {
    'product': Product,
    'category': Category,
    'user': User,
};

export const getFields = (req, res) => {
    const collectionName = req.params.collection_name;

    if (!collectionName) {
        return res.status(400).json({ error: 'Collection name is required' });
    }

    const model = models[collectionName.toLowerCase()];

    if (model) {
        const schemaPaths = model.schema.paths;
        // console.log(schemaPaths)
        const schemaFields = getSchemaFields(schemaPaths);

        res.json({
            collectionName: collectionName.toLowerCase(),
            fields: schemaFields
        });
    } else {
        res.status(404).json({ error: 'Collection not found' });
    }
}

function getSchemaFields(schemaPaths) {
    const schemaFields = {};

    for (let path in schemaPaths) {
        if (schemaPaths.hasOwnProperty(path)) {
            const pathType = schemaPaths[path].instance;
            const subPaths = schemaPaths[path]._presplitPath;
            // console.log(schemaPaths[path])
            if (subPaths.length > 1) {
                console.log(subPaths)
                // schemaFields[path] = getSchemaFields(subPaths);
            } else {
                schemaFields[path] = pathType;
            }
        }
    }

    return schemaFields;
}