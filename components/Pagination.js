import React from 'react'
import Pagination from "@material-ui/lab/Pagination"
import { Box } from '@material-ui/core'

const StyledPagination = ({total, page, changePage, limit, ...rest}) => {
    return (
        <Box display='flex' justifyContent='center' p={5} {...rest}>
            <Pagination count={Math.ceil(total / limit)} page={parseInt(page)} onChange={changePage}/>
        </Box>
    )
}

export default StyledPagination
