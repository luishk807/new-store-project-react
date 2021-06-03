import { DropzoneDialog } from 'material-ui-dropzone'
import { Button } from '@material-ui/core'
import { useState } from 'react'
import { uploadStockImport } from '../../../services/inventarioz/stock'
import { FormControl } from '@material-ui/core'

const acceptedTypes = [
    '.csv',
    'text/csv',
    'application/csv'
];

const StockImport = () => {
    const [openDropzoneDialog, setOpenDropzoneDialog] = useState(false)
    const [files, setFiles] = useState({})
    const showImportDialog = () => {
        setOpenDropzoneDialog(true)
    }
    const onSave = (files) => {
        console.log('onSave', files)
        setFiles(files)
        uploadStockImport(files[0])
    }
    const onClose = (event) => {
        console.log('onClose')
        setOpenDropzoneDialog(false)
    }
    return (<div>
        <FormControl>
            <Button onClick={showImportDialog}>Import</Button>
            <DropzoneDialog
                open={openDropzoneDialog}
                maxFileSize={1000000}
                onSave={onSave}
                onClose={onClose}
                acceptedFiles={acceptedTypes}
                filesLimit={1}
                useChipsForPreview={false}
                files={files}
                >
            </DropzoneDialog>
        </FormControl>
    </div>)
}

export default StockImport
