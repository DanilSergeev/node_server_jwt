const { Category } = require("../models/models")
const uuid = require("uuid")
const path = require("path");


class CategoryService {
    async creatCategory(name ) {
      
        const categoryData = await Category.create(
            { name },
        )
        return categoryData
    }

    async getCategorys() {
        const categoryData = await Category.findAll()
        return categoryData
    }
    async getCategory(id) {
        const categoryData = await Category.findOne({ where: { id } })
        return categoryData
    }
 
    async deleteCategory(id) {
        const categoryData = await Category.destroy(
            { where: { id } },
        )
        return categoryData
    }


}



module.exports = new CategoryService()