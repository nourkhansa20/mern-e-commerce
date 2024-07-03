import { useQuery } from 'react-query'
import api from '../../../api/api'
import React from 'react'
import Table from '../../../moon-ui/Table'
import { formatString } from '../../helpers/stringHelper'

const CollectionList = ({ collectionName }) => {

    const getCollectionFieldsName = async () => api.get(`fields/${collectionName}`).then((res) => Object.keys(res.data.fields))

    const { data: collectionFields, isLoading } = useQuery([collectionName], getCollectionFieldsName)

    if (isLoading) return <>Loading</>

    const data = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        // Add more sample data as needed
        { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
        { id: 4, name: 'Bob Brown', email: 'bob@example.com' },
        // ... more rows
    ];

    return (
        <div>
            <Table data={data} rowsPerPage={2} headers={collectionFields.map(field => formatString(field))} />
            {collectionFields.map(field => <div>{formatString(field)}</div>)}
        </div>
    )
}

export default CollectionList