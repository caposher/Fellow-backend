const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    // console.log('filterBy', filterBy)
    try {
        const filterCriteria = _buildFilterCriteria(filterBy)
        // const SortCriteria = _buildSortCriteria(filterBy)

        const collection = await dbService.getCollection('board')
        // var boards = await collection.find(filterCriteria).sort(SortCriteria).toArray()
        var boards = await collection.find(filterCriteria).toArray()
        return boards
    } catch (err) {
        logger.error('cannot find boards', err)
        throw err
    }
}
// function _buildSortCriteria(filterBy) {
//     const criteria = {}
//     if (filterBy.sort) {
//         switch (filterBy.sort) {
//             case 'Name':
//                 criteria.name = 1
//                 break;
//             case 'Date':
//                 criteria.createdAt = 1
//                 break;
//             case 'Price Low':
//                 criteria.price = 1
//                 break;
//             case 'Price High':
//                 criteria.price = -1
//                 break;
//         }
//     }
//     return criteria
// }

function _buildFilterCriteria(filterBy) {
    const criteria = {}
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     criteria.title = { $regex: regex }
    // }
    if (filterBy.user) {
        criteria.$or = [{ members: filterBy.user }, { createdBy: filterBy.user }]
    }

    // if (filterBy.status === 'In stock') criteria.inStock = true
    // else if (filterBy.status === 'Out of stock') criteria.inStock = false

    // if (filterBy.labels && filterBy.labels.length) {
    //     criteria.labels = { $all: filterBy.labels }
    // }

    // if (filterBy.labels) {
    //     if (filterBy.labels.length > 1) criteria.labels = filterBy.labels
    //     else criteria.labels = filterBy.labels[0]
    // }
    return criteria
}

async function getById(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        const board = collection.findOne({ '_id': ObjectId(boardId) })
        return board
    } catch (err) {
        logger.error(`while finding board ${boardId}`, err)
        throw err
    }
}

async function remove(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        await collection.deleteOne({ '_id': ObjectId(boardId) })
        return boardId
    } catch (err) {
        logger.error(`cannot remove board ${boardId}`, err)
        throw err
    }
}

async function add(board) {
    try {
        const collection = await dbService.getCollection('board')
        // const addedBoard = await collection.insertOne(board)
        await collection.insertOne(board)
        return board
    } catch (err) {
        logger.error('cannot insert board', err)
        throw err
    }
}
async function update(board) {
    try {
        var id = ObjectId(board._id)
        delete board._id
        const collection = await dbService.getCollection('board')
        await collection.updateOne({ "_id": id }, { $set: { ...board } })
        board._id = id
        return board
    } catch (err) {
        logger.error(`cannot update board ${board._id}`, err)
        throw err
    }
}



module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}