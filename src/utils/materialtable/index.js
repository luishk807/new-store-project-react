/** Converts the given array of objects to { columns, data } used by MaterialTable */
export const convertDataToTableData = (dataArray) => {
    const columns = []
    const data = []
    dataArray.forEach((d, i) => {
        if (i === 0) { // Only once
            for (let prop in d) {
                if (!Array.isArray(d[prop])) { // Add as column if it is not an array
                    columns.push({ title: prop, field: prop })
                }
            }
        }
        data.push({ key: i, ...d})
    })
    return { columns: columns, data: data }
}
