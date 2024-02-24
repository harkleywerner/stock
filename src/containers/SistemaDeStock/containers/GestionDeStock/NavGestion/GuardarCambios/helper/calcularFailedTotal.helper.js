export const calcularFailedTotalHelper = (failed_commit = {}) => {
    
    const { f_delete = [], f_patch = {}, f_post = [] } = failed_commit

    const failedTotal = Object.keys(f_patch).length + f_delete.length + f_post.length

    return {failedTotal}

};